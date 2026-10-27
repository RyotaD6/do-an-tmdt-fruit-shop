from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Shop, Category, Product, ProductVariant, Voucher, Order, OrderItem, Wallet, WalletTransaction, Review, AIConversation, AIMessage
from rest_framework import serializers
from django.db import transaction

# --- SERIALIZERS ---
class VariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVariant
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    variants = VariantSerializer(many=True, read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    shop_name = serializers.CharField(source='shop.name', read_only=True)

    class Meta:
        model = Product
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

# --- API VIEWSETS ---
class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all().prefetch_related('variants')
    serializer_class = ProductSerializer

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.filter(is_active=True)
    serializer_class = CategorySerializer

# --- API CHATBOT AI TƯ VẤN TRÁI CÂY (GROUNDING TỪ SQL SERVER) ---
@api_view(['POST'])
def ai_fruit_advisor(request):
    user_query = request.data.get('message', '').lower()
    
    # 1. Kiểm tra phạm vi
    if any(k in user_query for k in ['thuốc', 'chữa bệnh', 'ung thư', 'bác sĩ']):
        return Response({
            'reply': 'Trái cây cung cấp vitamin và chất chống oxy hóa tự nhiên tốt cho sức khỏe, nhưng không thể thay thế phác đồ điều trị y khoa. Bạn vui lòng tham khảo ý kiến bác sĩ chuyên khoa nhé!',
            'products': []
        })

    # 2. Truy vấn dữ liệu thực tế từ SQL Server
    qs = Product.objects.filter(variants__stock__gt=0).distinct()
    
    if any(k in user_query for k in ['giảm cân', 'ăn kiêng', 'eat clean', 'calo']):
        products = qs.filter(nutrition_tags__icontains='ăn kiêng')[:2]
        reply = "Với chế độ Eat Clean / Giảm cân, AI gợi ý bạn Dâu Tây Hana Đà Lạt (chỉ 32 kcal/100g) và Bơ Sáp 034 (chất béo thực vật lành mạnh giúp no lâu)."
    elif any(k in user_query for k in ['biếu', 'tặng', 'giỏ quà']):
        products = qs.filter(category__slug='gio-qua')[:2]
        reply = "Đối với quà biếu tặng sang trọng, mình đề xuất Giỏ Quà Trái Cây Phú Quý hoặc Nho Mẫu Đơn Shine Muscat nhập khẩu đường bay."
    else:
        products = qs[:3]
        reply = "FreshMart AI gợi ý các loại trái cây tươi ngon đang bán chạy nhất hôm nay tại sàn:"

    serializer = ProductSerializer(products, many=True)
    return Response({
        'reply': reply,
        'products': serializer.data
    })

# --- API NẠP DỮ LIỆU MẪU BAN ĐẦU ---
@api_view(['POST', 'GET'])
def seed_data(request):
    if Product.objects.exists():
        return Response({'message': 'Dữ liệu đã có sẵn trong SQL Server, không cần nạp lại!'})

    with transaction.atomic():
        from django.contrib.auth.models import User
        admin_user = User.objects.first()
        
        # Tạo Shop
        shop1 = Shop.objects.create(owner=admin_user, name='Nông Trại Xanh Đà Lạt', phone='0909123456', address='Đà Lạt, Lâm Đồng')
        shop2 = Shop.objects.create(owner=admin_user, name='Vườn Trái Cây Miền Tây Ri6', phone='0918888999', address='Cai Lậy, Tiền Giang')

        # Tạo Danh mục
        c_noidia = Category.objects.create(name='Trái cây Nội địa', slug='noi-dia', icon='🥭')
        c_nhapkhau = Category.objects.create(name='Trái cây Nhập khẩu', slug='nhap-khau', icon='🍒')
        c_gioqua = Category.objects.create(name='Giỏ quà Cao cấp', slug='gio-qua', icon='🧺')
        c_huuco = Category.objects.create(name='Trái cây Hữu cơ', slug='huu-co', icon='🥑')

        # 1. Sầu Riêng Ri6
        p1 = Product.objects.create(
            shop=shop2, category=c_noidia, name='Sầu Riêng Ri6 Tiền Giang Tách Múi Loại 1',
            origin='Tiền Giang', brand='VietGAP Cai Lậy', art_type='durian',
            nutrition_tags='năng lượng, ăn kiêng, ngọt đậm', is_flash_sale=True, sold_count=312,
            ai_review_summary='Cơm vàng hạt lép 95%, dẻo béo đậm đà, bao ăn 1 đổi 1 trong 24h.'
        )
        ProductVariant.objects.create(product=p1, label='Khay 500g tách múi', ripeness='Chín ăn ngay', weight_gram=500, price=149000, flash_sale_price=149000, stock=30)
        ProductVariant.objects.create(product=p1, label='Combo 2 Khay (1kg)', ripeness='Chín ăn ngay', weight_gram=1000, price=285000, flash_sale_price=285000, stock=20)

        # 2. Dâu Tây Đà Lạt
        p2 = Product.objects.create(
            shop=shop1, category=c_noidia, name='Dâu Tây Nhật Hana Đà Lạt Hái Sáng Sớm',
            origin='Đà Lạt', brand='Đà Lạt Organic', art_type='strawberry',
            nutrition_tags='ăn kiêng, ít calo, vitamin c', is_flash_sale=True, sold_count=428,
            ai_review_summary='Quả to đều, đỏ mọng, vị ngọt thanh pha chua nhẹ, thơm hương tự nhiên.'
        )
        ProductVariant.objects.create(product=p2, label='Hộp 500g Size VIP', ripeness='Chín đỏ mọng', weight_gram=500, price=129000, flash_sale_price=129000, stock=45)

        # 3. Nho Mẫu Đơn
        p3 = Product.objects.create(
            shop=shop1, category=c_nhapkhau, name='Nho Mẫu Đơn Shine Muscat Nhật Bản',
            origin='Okayama', brand='Shine Muscat Premium', art_type='grape',
            nutrition_tags='quà biếu, cao cấp', is_flash_sale=True, sold_count=195,
            ai_review_summary='Quả to tròn xanh ngọc, không hạt, giòn ngọt đanh và thoang thoảng hương sữa.'
        )
        ProductVariant.objects.create(product=p3, label='Chùm 800g Hộp Quà', ripeness='Tươi giòn', weight_gram=800, price=329000, flash_sale_price=329000, stock=25)

        # 4. Giỏ Quà Phú Quý
        p4 = Product.objects.create(
            shop=shop1, category=c_gioqua, name='Giỏ Quà Trái Cây Phú Quý 6 Loại Thượng Hạng',
            origin='Nhập khẩu & Đặc sản', brand='FreshMart Luxury', art_type='giftbox',
            nutrition_tags='quà biếu, sinh nhật, khai trương', is_flash_sale=False, sold_count=142,
            ai_review_summary='Giỏ mây thủ công trang trọng, đóng màng co chắc chắn kèm nơ và thiệp miễn phí.'
        )
        ProductVariant.objects.create(product=p4, label='Giỏ Tiêu Chuẩn (3.5kg)', ripeness='Tuyển chọn loại 1', weight_gram=3500, price=650000, stock=15)

    return Response({'message': 'Đã nạp thành công dữ liệu trái cây mẫu vào SQL Server!'})