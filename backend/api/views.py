import uuid
import threading
import time
from datetime import timedelta
from decimal import Decimal
from django.db import connection, transaction, models
from django.db.models import F
from django.utils import timezone
from django.contrib.auth.models import User
from rest_framework import viewsets, status, serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import (
    Shop, Category, Product, ProductVariant, Voucher,
    Order, OrderItem, Wallet, WalletTransaction, Review, AIConversation, AIMessage
)

# ============================================================================
# MÁY TRẠNG THÁI ĐƠN HÀNG (ORDER STATE MACHINE — ĐIỀU KIỆN 3)
# Chỉ cho phép các bước chuyển trạng thái hợp lệ
# ============================================================================
ALLOWED_STATE_TRANSITIONS = {
    'pending': ['paid', 'shipping', 'cancelled'],
    'paid': ['shipping', 'cancelled'],
    'shipping': ['delivered'],
    'delivered': ['completed', 'return_requested'],
    'return_requested': ['refunded', 'completed'],
    'completed': [],
    'cancelled': [],
    'refunded': [],
}

UI_TO_DB_STATUS = {
    'Chờ xác nhận': 'pending',
    'Chờ thanh toán (Giữ chỗ 30p)': 'pending',
    'Đã thanh toán': 'paid',
    'Đang vận chuyển': 'shipping',
    'Đã giao hàng': 'delivered',
    'Hoàn thành': 'completed',
    'Yêu cầu hoàn trả': 'return_requested',
    'Đã hoàn tiền': 'refunded',
    'Đã hủy': 'cancelled',
}

DB_TO_UI_STATUS = {
    'pending': 'Chờ thanh toán (Giữ chỗ 30p)',
    'paid': 'Đã thanh toán',
    'shipping': 'Đang vận chuyển',
    'delivered': 'Đã giao hàng',
    'completed': 'Hoàn thành',
    'return_requested': 'Yêu cầu hoàn trả',
    'refunded': 'Đã hoàn tiền',
    'cancelled': 'Đã hủy',
}

# ============================================================================
# KHỞI TẠO ĐỦ 8 SẢN PHẨM, 17 BIẾN THỂ & 4 VOUCHER TRONG SQL SERVER
# ============================================================================
def ensure_full_8_products_seeded():
    with transaction.atomic():
        admin_user = User.objects.first()
        if not admin_user:
            admin_user = User.objects.create_superuser('lenovo', 'admin@freshmart.vn', '123456')

        shop1, _ = Shop.objects.get_or_create(
            name='Nông Trại Xanh Đà Lạt',
            defaults={'owner': admin_user, 'phone': '0909123456', 'address': 'Đà Lạt, Lâm Đồng'}
        )
        shop2, _ = Shop.objects.get_or_create(
            name='Vườn Trái Cây Miền Tây Ri6',
            defaults={'owner': admin_user, 'phone': '0918888999', 'address': 'Cai Lậy, Tiền Giang'}
        )
        shop3, _ = Shop.objects.get_or_create(
            name='FreshImport — Trái Cây Nhập Khẩu Air',
            defaults={'owner': admin_user, 'phone': '0988777666', 'address': 'Quận 1, TP.HCM'}
        )

        c_noidia, _ = Category.objects.get_or_create(slug='noi-dia', defaults={'name': 'Trái cây Nội địa', 'icon': '🥭'})
        c_nhapkhau, _ = Category.objects.get_or_create(slug='nhap-khau', defaults={'name': 'Trái cây Nhập khẩu', 'icon': '🍒'})
        c_gioqua, _ = Category.objects.get_or_create(slug='gio-qua', defaults={'name': 'Giỏ quà Cao cấp', 'icon': '🧺'})
        c_huuco, _ = Category.objects.get_or_create(slug='huu-co', defaults={'name': 'Trái cây Hữu cơ', 'icon': '🥑'})

        # Khởi tạo 4 Voucher chuẩn (Điều kiện 4: tách Mã giảm giá hàng & Mã vận chuyển)
        vouchers_seed = [
            ('FRESHMART50K', 'Giảm 50.000đ Toàn Sàn', 'discount', 'fixed', 50000, 200000, None),
            ('FREESHIPGHN', 'Trợ giá vận chuyển 25.000đ', 'shipping', 'fixed', 25000, 120000, None),
            ('DALAT30K', 'Voucher Nông Trại Đà Lạt 30K', 'discount', 'fixed', 30000, 150000, None),
            ('MIENTAY10', 'Giảm 10% Vườn Miền Tây (Tối đa 40K)', 'discount', 'percent', 10, 180000, 40000),
        ]
        for v_code, v_title, v_cat, v_dtype, v_val, v_min, v_max in vouchers_seed:
            Voucher.objects.get_or_create(
                code=v_code,
                defaults={
                    'title': v_title,
                    'voucher_category': v_cat,
                    'discount_type': v_dtype,
                    'discount_value': v_val,
                    'min_order_value': v_min,
                    'max_discount': v_max,
                    'usage_limit': 100,
                    'used_count': 0,
                    'is_active': True,
                }
            )

        if Product.objects.count() >= 8:
            return

        catalog = [
            {
                'shop': shop2, 'category': c_noidia,
                'name': 'Sầu Riêng Ri6 Tiền Giang Tách Múi Loại 1',
                'origin': 'Tiền Giang, Việt Nam', 'brand': 'Cai Lậy VietGAP', 'art_type': 'durian',
                'nutrition_tags': 'năng lượng, ăn kiêng, ngọt đậm', 'is_flash_sale': True, 'sold_count': 312,
                'ai_review_summary': 'Cơm vàng hạt lép 95%, dẻo béo đậm đà, bao ăn 1 đổi 1 trong 24h.',
                'variants': [
                    ('Khay 500g tách múi', 'Chín ăn ngay', 500, 149000, 149000, 25),
                    ('Combo 2 Khay (1kg)', 'Chín ăn ngay', 1000, 285000, 285000, 12),
                    ('Nguyên quả 2.5 - 3kg', 'Già 90% (1-2 ngày chín)', 2800, 360000, 360000, 8),
                ]
            },
            {
                'shop': shop1, 'category': c_noidia,
                'name': 'Dâu Tây Nhật Hana Đà Lạt Hái Sáng Sớm',
                'origin': 'Đà Lạt, Lâm Đồng', 'brand': 'Đà Lạt Organic', 'art_type': 'strawberry',
                'nutrition_tags': 'ăn kiêng, ít calo, vitamin c', 'is_flash_sale': True, 'sold_count': 428,
                'ai_review_summary': 'Quả to đều, đỏ mọng, vị ngọt thanh pha chua nhẹ, thơm hương tự nhiên.',
                'variants': [
                    ('Hộp 500g Size VIP', 'Chín đỏ mọng', 500, 129000, 129000, 40),
                    ('Hộp 1kg Quà Biếu', 'Chín đỏ mọng', 1000, 245000, 245000, 20),
                ]
            },
            {
                'shop': shop3, 'category': c_nhapkhau,
                'name': 'Nho Mẫu Đơn Shine Muscat Hàn Quốc / Nhật Bản',
                'origin': 'Okayama / Hàn Quốc', 'brand': 'Shine Muscat Premium', 'art_type': 'grape',
                'nutrition_tags': 'quà biếu, cao cấp', 'is_flash_sale': True, 'sold_count': 195,
                'ai_review_summary': 'Quả to tròn xanh ngọc, không hạt, giòn ngọt đanh và thoang thoảng hương sữa.',
                'variants': [
                    ('Chùm 800g Hộp Quà', 'Tươi giòn', 800, 329000, 329000, 20),
                    ('Thùng 2 Chùm (1.6kg)', 'Tươi giòn', 1600, 620000, 620000, 10),
                ]
            },
            {
                'shop': shop3, 'category': c_nhapkhau,
                'name': 'Cherry Đỏ Mỹ Size Jumbo 9.0 Row Đường Bay',
                'origin': 'Washington, Hoa Kỳ', 'brand': 'Washington Cherry', 'art_type': 'cherry',
                'nutrition_tags': 'ngủ ngon, tim mạch, cao cấp', 'is_flash_sale': False, 'sold_count': 164,
                'ai_review_summary': 'Trái to chắc, vỏ đỏ sẫm bóng, thịt giòn ngọt mọng nước, cuống xanh tươi.',
                'variants': [
                    ('Hộp 500g Size 9.0', 'Chín giòn ngọt', 500, 295000, 295000, 25),
                    ('Hộp 1kg Cao Cấp', 'Chín giòn ngọt', 1000, 560000, 560000, 13),
                ]
            },
            {
                'shop': shop2, 'category': c_noidia,
                'name': 'Xoài Cát Hòa Lộc Chính Gốc Cái Bè',
                'origin': 'Cái Bè, Tiền Giang', 'brand': 'Hòa Lộc Đặc Sản', 'art_type': 'mango',
                'nutrition_tags': 'vitamin a, vitamin c, ngọt đậm', 'is_flash_sale': False, 'sold_count': 510,
                'ai_review_summary': 'Thịt vàng ươm, dẻo mịn không xơ, ngọt lịm và thơm nức mũi.',
                'variants': [
                    ('Túi 1kg (2 quả to)', 'Chín vàng ăn ngay', 1000, 95000, 95000, 50),
                    ('Thùng 3kg Tuyển Chọn', 'Già 85% (để được 3-4 ngày)', 3000, 270000, 270000, 30),
                ]
            },
            {
                'shop': shop1, 'category': c_huuco,
                'name': 'Bơ Sáp 034 Bảo Lộc Dẻo Quánh Hạt Nhỏ',
                'origin': 'Bảo Lộc, Lâm Đồng', 'brand': 'Lâm Đồng Green', 'art_type': 'avocado',
                'nutrition_tags': 'ăn kiêng, eat clean, giảm cân, omega-3', 'is_flash_sale': True, 'sold_count': 640,
                'ai_review_summary': 'Dáng thuôn dài, vỏ mỏng, cơm vàng xanh dẻo béo như bơ sữa, hạt siêu nhỏ.',
                'variants': [
                    ('1kg (3-4 quả)', 'Chín tới ăn ngay', 1000, 59000, 59000, 60),
                    ('Combo 2kg (Già + Chín)', 'Ăn dần cả tuần', 2000, 112000, 112000, 30),
                ]
            },
            {
                'shop': shop3, 'category': c_nhapkhau,
                'name': 'Táo Envy New Zealand Size Lớn Giòn Ngọt',
                'origin': 'Hawke’s Bay, New Zealand', 'brand': 'Envy New Zealand', 'art_type': 'apple',
                'nutrition_tags': 'ăn kiêng, chất xơ, giòn ngọt', 'is_flash_sale': False, 'sold_count': 280,
                'ai_review_summary': 'Vỏ đỏ sọc vàng sang trọng, ruột trắng lâu bị thâm khi gọt, giòn đanh cực ngọt.',
                'variants': [
                    ('Hộp 1kg (3-4 quả)', 'Tươi giòn', 1000, 175000, 175000, 35),
                    ('Hộp Quà 2kg Kèm Túi', 'Tươi giòn', 2000, 340000, 340000, 20),
                ]
            },
            {
                'shop': shop3, 'category': c_gioqua,
                'name': 'Giỏ Quà Trái Cây Phú Quý — Tặng Đối Tác & Gia Đình',
                'origin': 'Kết hợp Nhập khẩu & Đặc sản', 'brand': 'FreshImport Gift', 'art_type': 'giftbox',
                'nutrition_tags': 'quà biếu, sinh nhật, khai trương', 'is_flash_sale': False, 'sold_count': 142,
                'ai_review_summary': 'Giỏ mây đan thủ công sang trọng, bọc màng co cố định chắc chắn kèm thiệp.',
                'variants': [
                    ('Giỏ Tiêu Chuẩn (3.5kg)', 'Tuyển chọn loại 1', 3500, 650000, 650000, 15),
                    ('Giỏ Thượng Hạng VIP (5kg)', 'Tuyển chọn loại 1', 5000, 980000, 980000, 10),
                ]
            },
        ]

        for item in catalog:
            prod = Product.objects.filter(art_type=item['art_type']).first()
            if not prod:
                prod = Product.objects.create(
                    shop=item['shop'],
                    category=item['category'],
                    name=item['name'],
                    origin=item['origin'],
                    brand=item['brand'],
                    art_type=item['art_type'],
                    nutrition_tags=item['nutrition_tags'],
                    is_flash_sale=item['is_flash_sale'],
                    sold_count=item['sold_count'],
                    ai_review_summary=item['ai_review_summary']
                )
            else:
                prod.name = item['name']
                prod.save(update_fields=['name'])

            for v_label, v_ripeness, v_weight, v_price, v_flash, v_stock in item['variants']:
                if not ProductVariant.objects.filter(product=prod, label=v_label).exists():
                    ProductVariant.objects.create(
                        product=prod,
                        label=v_label,
                        ripeness=v_ripeness,
                        weight_gram=v_weight,
                        price=v_price,
                        flash_sale_price=v_flash,
                        stock=v_stock
                    )

# ============================================================================
# ĐIỀU KIỆN 3: HÀM HOÀN TRẢ KHO & NHẢ VOUCHER VỀ RELEASED KHI HỦY / QUÁ 30 PHÚT
# ============================================================================
def release_order_inventory_and_voucher(order):
    """Cộng lại tồn kho cho từng biến thể và đưa Voucher về trạng thái Released."""
    with transaction.atomic():
        for item in order.items.select_related('variant__product').all():
            ProductVariant.objects.filter(id=item.variant_id).update(
                stock=F('stock') + item.quantity
            )
            Product.objects.filter(id=item.variant.product_id).update(
                sold_count=F('sold_count') - item.quantity
            )

        for code in [order.discount_voucher_code, order.shipping_voucher_code]:
            if code:
                Voucher.objects.filter(code=code, used_count__gt=0).update(
                    used_count=F('used_count') - 1
                )

        order.status = 'cancelled'
        if order.voucher_status in ('Reserved', 'Used'):
            order.voucher_status = 'Released'
        order.save(update_fields=['status', 'voucher_status'])

def sweep_expired_orders(force_all_pending_online=False):
    """Quét các đơn chờ thanh toán Online quá 30 phút để tự động hoàn kho và nhả Voucher."""
    now = timezone.now()
    qs = Order.objects.filter(status='pending')
    if not force_all_pending_online:
        qs = qs.filter(expires_at__isnull=False, expires_at__lte=now)

    released_codes = []
    for order in qs:
        release_order_inventory_and_voucher(order)
        released_codes.append(order.order_code)
    return released_codes

# Khởi chạy dịch vụ nền quét tự động mỗi 5 phút (300 giây) theo đúng 1.docx
_sweeper_started = False
def start_background_sweeper_once():
    global _sweeper_started
    if _sweeper_started:
        return
    _sweeper_started = True

    def _worker():
        while True:
            time.sleep(300)  # Quét định kỳ mỗi 5 phút
            try:
                sweep_expired_orders(force_all_pending_online=False)
            except Exception:
                pass

    t = threading.Thread(target=_worker, daemon=True)
    t.start()

# ============================================================================
# 1. SERIALIZERS & VIEWSETS
# ============================================================================
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

class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all().prefetch_related('variants').order_by('id')
    serializer_class = ProductSerializer

    def list(self, request, *args, **kwargs):
        ensure_full_8_products_seeded()
        start_background_sweeper_once()
        sweep_expired_orders(force_all_pending_online=False)
        return super().list(request, *args, **kwargs)

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.filter(is_active=True)
    serializer_class = CategorySerializer

# ============================================================================
# 2. API LẤY DANH SÁCH ĐƠN HÀNG TỪ SQL SERVER
# ============================================================================
@api_view(['GET'])
def list_orders(request):
    sweep_expired_orders(force_all_pending_online=False)
    db_orders = Order.objects.prefetch_related('items__variant__product').order_by('-created_at')
    result = []
    for o in db_orders:
        items_data = []
        for it in o.items.all():
            items_data.append({
                'productId': f"prd-{it.variant.product.id}",
                'name': it.product_name or it.variant.product.name,
                'variantLabel': it.variant_label or it.variant.label,
                'price': float(it.unit_price),
                'quantity': it.quantity,
                'shopId': 'shop-1',
                'artType': it.variant.product.art_type,
            })
        ui_status = DB_TO_UI_STATUS.get(o.status, 'Đã thanh toán')
        if o.status == 'pending' and o.payment_method == 'cod':
            ui_status = 'Chờ xác nhận'
        result.append({
            'id': o.order_code,
            'requestKey': o.request_key or '',
            'createdAt': o.created_at.strftime('%d/%m/%Y %H:%M'),
            'buyerName': o.buyer.username,
            'address': o.shipping_address,
            'paymentMethod': o.payment_method.upper(),
            'status': ui_status,
            'voucherStatus': o.voucher_status,
            'items': items_data,
            'shippingFee': float(o.shipping_fee),
            'discountAmount': float(o.discount_amount),
            'totalAmount': float(o.total_amount),
            'returnReason': '',
            'returnDetail': '',
            'reviewed': False,
        })
    return Response({'orders': result})

# ============================================================================
# 3. API ĐẶT HÀNG TÍCH HỢP ĐỦ 4 ĐIỀU KIỆN TRONG 1.DOCX
# ============================================================================
class InsufficientStockError(Exception):
    pass

@api_view(['POST'])
def checkout_order(request):
    ensure_full_8_products_seeded()
    items = request.data.get('items', [])
    shipping_address = request.data.get('shipping_address', 'TP. Hồ Chí Minh')
    payment_method = request.data.get('payment_method', 'vnpay')
    request_key = (request.data.get('request_key') or '').strip() or None
    reserve_only = bool(request.data.get('reserve_only', False))
    discount_voucher_code = (request.data.get('discount_voucher_code') or '').strip()
    shipping_voucher_code = (request.data.get('shipping_voucher_code') or '').strip()

    if not items:
        return Response({'error': 'Giỏ hàng trống!'}, status=status.HTTP_400_BAD_REQUEST)

    buyer = User.objects.first()

    # --- ĐIỀU KIỆN 2: CHỐNG ĐẶT TRÙNG ĐƠN QUA REQUESTKEY (GUID) ---
    if request_key:
        existing_order = Order.objects.filter(buyer=buyer, request_key=request_key).first()
        if existing_order:
            return Response({
                'message': f'Phát hiện RequestKey trùng ({request_key}) -> Trả về đơn cũ #{existing_order.order_code}, không tạo đơn mới!',
                'order_code': existing_order.order_code,
                'total_amount': float(existing_order.total_amount),
                'status': existing_order.status,
                'is_duplicate': True,
                'voucher_warnings': []
            }, status=status.HTTP_200_OK)

    # --- ĐIỀU KIỆN 1: GỘP & SẮP XẾP VARIANT_ID TĂNG DẦN ĐỂ CHỐNG DEADLOCK ---
    merged_items = {}
    for item in items:
        vid = int(item['variant_id'])
        qty = int(item['quantity'])
        if qty <= 0:
            return Response({'error': 'Số lượng mua phải lớn hơn 0.'}, status=status.HTTP_400_BAD_REQUEST)
        merged_items[vid] = merged_items.get(vid, 0) + qty

    sorted_variant_ids = sorted(merged_items.keys())
    voucher_warnings = []

    try:
        with transaction.atomic():
            with connection.cursor() as cursor:
                # 1. Giao dịch SERIALIZABLE trên SQL Server
                cursor.execute("SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;")

                locked_variants = {}
                total_weight_gram = 0
                subtotal = Decimal('0')

                # 2. Khóa dòng WITH (UPDLOCK, HOLDLOCK) theo đúng thứ tự ID tăng dần
                for vid in sorted_variant_ids:
                    qty = merged_items[vid]
                    cursor.execute(
                        """
                        SELECT v.id, v.stock, v.price, v.flash_sale_price, v.weight_gram,
                               v.label, p.id, p.name, p.is_flash_sale
                        FROM api_productvariant AS v WITH (UPDLOCK, HOLDLOCK)
                        INNER JOIN api_product AS p ON v.product_id = p.id
                        WHERE v.id = %s
                        """,
                        [vid]
                    )
                    row = cursor.fetchone()
                    if not row:
                        raise InsufficientStockError(f"Sản phẩm biến thể #{vid} không tồn tại.")

                    v_id, current_stock, price, flash_price, weight_gram, v_label, p_id, p_name, is_flash = row

                    # 3. Trừ kho bằng 1 lệnh UPDATE có điều kiện Stock >= số lượng
                    cursor.execute(
                        """
                        UPDATE api_productvariant
                        SET stock = stock - %s
                        WHERE id = %s AND stock >= %s
                        """,
                        [qty, vid, qty]
                    )

                    if cursor.rowcount == 0:
                        raise InsufficientStockError(
                            f"Sản phẩm '{p_name} ({v_label})' không đủ tồn kho! "
                            f"Khách đặt {qty} nhưng kho chỉ còn {current_stock}."
                        )

                    cursor.execute(
                        "UPDATE api_product SET sold_count = sold_count + %s WHERE id = %s",
                        [qty, p_id]
                    )

                    # ĐIỀU KIỆN 4: Giá lấy trực tiếp từ CSDL tại thời điểm đặt, bỏ qua giá trình duyệt gửi lên
                    unit_price = Decimal(str(flash_price)) if (is_flash and flash_price) else Decimal(str(price))
                    line_total = unit_price * qty
                    subtotal += line_total
                    total_weight_gram += (weight_gram or 500) * qty

                    locked_variants[vid] = {
                        'variant_id': vid,
                        'product_name': p_name,
                        'variant_label': v_label,
                        'quantity': qty,
                        'unit_price': unit_price,
                        'line_total': line_total,
                    }

                # Tính phí vận chuyển GHN tại Server
                base_ghn = Decimal('20000') if ('Hồ Chí Minh' in shipping_address or 'Hà Nội' in shipping_address) else Decimal('32000')
                extra_weight_fee = Decimal('0')
                if total_weight_gram > 1000:
                    extra_kg = (total_weight_gram - 1000 + 999) // 1000
                    extra_weight_fee = Decimal(str(extra_kg * 6000))
                shipping_fee = base_ghn + extra_weight_fee

                # ĐIỀU KIỆN 4: Kiểm tra lại tối đa 1 Mã giảm giá hàng & 1 Mã vận chuyển tại Server
                discount_amount = Decimal('0')
                valid_discount_code = ''
                if discount_voucher_code:
                    vc = Voucher.objects.select_for_update().filter(code=discount_voucher_code, is_active=True).first()
                    if not vc or vc.used_count >= vc.usage_limit:
                        voucher_warnings.append(f"Mã {discount_voucher_code} đã hết lượt hoặc không hợp lệ nên đã được gỡ.")
                    elif subtotal < vc.min_order_value:
                        voucher_warnings.append(f"Mã {discount_voucher_code} yêu cầu đơn từ {int(vc.min_order_value):,}đ nên đã được gỡ.")
                    else:
                        if vc.discount_type == 'fixed':
                            discount_amount += vc.discount_value
                        else:
                            pct_disc = (subtotal * vc.discount_value) / Decimal('100')
                            if vc.max_discount:
                                pct_disc = min(pct_disc, vc.max_discount)
                            discount_amount += pct_disc
                        vc.used_count += 1
                        vc.save(update_fields=['used_count'])
                        valid_discount_code = vc.code

                valid_shipping_code = ''
                if shipping_voucher_code:
                    svc = Voucher.objects.select_for_update().filter(code=shipping_voucher_code, is_active=True).first()
                    if not svc or svc.used_count >= svc.usage_limit:
                        voucher_warnings.append(f"Mã vận chuyển {shipping_voucher_code} đã hết lượt nên đã được gỡ.")
                    elif subtotal < svc.min_order_value:
                        voucher_warnings.append(f"Mã vận chuyển {shipping_voucher_code} yêu cầu đơn từ {int(svc.min_order_value):,}đ nên đã được gỡ.")
                    else:
                        ship_disc = min(shipping_fee, svc.discount_value)
                        discount_amount += ship_disc
                        svc.used_count += 1
                        svc.save(update_fields=['used_count'])
                        valid_shipping_code = svc.code

                total_amount = max(Decimal('0'), subtotal + shipping_fee - discount_amount)

                # ĐIỀU KIỆN 3: Giữ chỗ ngay khi đặt đơn (Voucher = Reserved nếu chờ thanh toán Online, hạn 30 phút)
                has_voucher = bool(valid_discount_code or valid_shipping_code)
                if reserve_only or payment_method == 'cod':
                    order_status = 'pending'
                    v_status = 'Reserved' if has_voucher else 'None'
                    expires_at = timezone.now() + timedelta(minutes=30)
                else:
                    order_status = 'paid'
                    v_status = 'Used' if has_voucher else 'None'
                    expires_at = None

                order = Order.objects.create(
                    buyer=buyer,
                    order_code=f"FM-{uuid.uuid4().hex[:6].upper()}",
                    request_key=request_key,
                    shipping_address=shipping_address,
                    total_weight_gram=total_weight_gram,
                    shipping_fee=shipping_fee,
                    discount_voucher_code=valid_discount_code,
                    shipping_voucher_code=valid_shipping_code,
                    discount_amount=discount_amount,
                    total_amount=total_amount,
                    payment_method=payment_method,
                    status=order_status,
                    voucher_status=v_status,
                    expires_at=expires_at,
                )

                # ĐIỀU KIỆN 4: Lưu sẵn tên sản phẩm, quy cách và đơn giá vào OrderItem
                for vid in sorted_variant_ids:
                    info = locked_variants[vid]
                    OrderItem.objects.create(
                        order=order,
                        variant_id=info['variant_id'],
                        product_name=info['product_name'],
                        variant_label=info['variant_label'],
                        quantity=info['quantity'],
                        unit_price=info['unit_price'],
                        line_total=info['line_total']
                    )

        return Response({
            'message': 'Đã giữ chỗ kho & tạo đơn thành công!',
            'order_code': order.order_code,
            'total_amount': float(order.total_amount),
            'status': order.status,
            'is_duplicate': False,
            'voucher_warnings': voucher_warnings
        }, status=status.HTTP_201_CREATED)

    except InsufficientStockError as e:
        return Response({'error': str(e)}, status=status.HTTP_409_CONFLICT)
    except Exception as e:
        return Response({'error': f'Lỗi xử lý giao dịch: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    finally:
        with connection.cursor() as cursor:
            cursor.execute("SET TRANSACTION ISOLATION LEVEL READ COMMITTED;")

# ============================================================================
# 4. CÁC API ĐIỀU KIỆN 3: XÁC NHẬN THANH TOÁN, HỦY ĐƠN, QUÉT 30 PHÚT, STATE MACHINE
# ============================================================================
@api_view(['POST'])
def confirm_online_payment(request):
    order_code = request.data.get('order_code')
    order = Order.objects.filter(order_code=order_code).first()
    if not order:
        return Response({'error': 'Không tìm thấy đơn hàng.'}, status=status.HTTP_404_NOT_FOUND)

    if 'paid' not in ALLOWED_STATE_TRANSITIONS.get(order.status, []):
        return Response({'error': f'Không thể chuyển từ {order.status} sang Đã thanh toán.'}, status=status.HTTP_400_BAD_REQUEST)

    order.status = 'paid'
    if order.voucher_status == 'Reserved':
        order.voucher_status = 'Used'
    order.expires_at = None
    order.save(update_fields=['status', 'voucher_status', 'expires_at'])
    return Response({'message': f'Đơn #{order.order_code} đã thanh toán thành công!'})

@api_view(['POST'])
def cancel_order_api(request):
    order_code = request.data.get('order_code')
    order = Order.objects.filter(order_code=order_code).first()
    if not order:
        return Response({'error': 'Không tìm thấy đơn hàng.'}, status=status.HTTP_404_NOT_FOUND)

    if 'cancelled' not in ALLOWED_STATE_TRANSITIONS.get(order.status, []):
        return Response({
            'error': f'Trạng thái hiện tại ({DB_TO_UI_STATUS.get(order.status)}) không cho phép hủy đơn!'
        }, status=status.HTTP_400_BAD_REQUEST)

    release_order_inventory_and_voucher(order)
    return Response({
        'message': f'Đã hủy đơn #{order.order_code}: Đã cộng lại tồn kho vào SQL Server và trả Voucher về Released!'
    })

@api_view(['POST'])
def release_expired_orders_api(request):
    force_all = bool(request.data.get('force_all_pending_online', False))
    released = sweep_expired_orders(force_all_pending_online=force_all)
    if not released:
        return Response({'message': 'Hiện không có đơn giữ chỗ nào quá hạn cần thu hồi.'})
    return Response({
        'message': f'Đã thu hồi {len(released)} đơn quá hạn 30 phút ({", ".join(released)}): Đã cộng lại kho & nhả Voucher về Released!'
    })

@api_view(['POST'])
def transition_order_state_api(request):
    order_code = request.data.get('order_code')
    next_ui_status = request.data.get('next_status')
    next_db_status = UI_TO_DB_STATUS.get(next_ui_status)

    order = Order.objects.filter(order_code=order_code).first()
    if not order or not next_db_status:
        return Response({'error': 'Đơn hàng hoặc trạng thái đích không hợp lệ.'}, status=status.HTTP_400_BAD_REQUEST)

    allowed = ALLOWED_STATE_TRANSITIONS.get(order.status, [])
    if next_db_status not in allowed:
        cur_label = DB_TO_UI_STATUS.get(order.status, order.status)
        return Response({
            'error': f'Bước chuyển không hợp lệ: Không thể chuyển từ "{cur_label}" sang "{next_ui_status}"!'
        }, status=status.HTTP_400_BAD_REQUEST)

    order.status = next_db_status
    if next_db_status == 'paid' and order.voucher_status == 'Reserved':
        order.voucher_status = 'Used'
    order.save(update_fields=['status', 'voucher_status'])
    return Response({'message': f'Đã chuyển trạng thái đơn #{order.order_code} sang "{next_ui_status}".'})

@api_view(['POST'])
def ai_fruit_advisor(request):
    user_query = request.data.get('message', '').lower()
    if any(k in user_query for k in ['thuốc', 'chữa bệnh', 'ung thư', 'bác sĩ']):
        return Response({
            'reply': 'Trái cây cung cấp vitamin tự nhiên tốt cho sức khỏe nhưng không thay thế thuốc chữa bệnh. Bạn vui lòng tham khảo bác sĩ chuyên khoa nhé!',
            'products': []
        })
    qs = Product.objects.filter(variants__stock__gt=0).distinct()
    if any(k in user_query for k in ['giảm cân', 'ăn kiêng', 'eat clean', 'calo']):
        products = qs.filter(nutrition_tags__icontains='ăn kiêng')[:2]
        reply = "Với chế độ Eat Clean / Giảm cân, AI gợi ý bạn Dâu Tây Hana Đà Lạt và Bơ Sáp 034 Bảo Lộc."
    elif any(k in user_query for k in ['biếu', 'tặng', 'giỏ quà']):
        products = qs.filter(category__slug='gio-qua')[:2]
        reply = "Đối với quà biếu tặng sang trọng, mình đề xuất Giỏ Quà Trái Cây Phú Quý."
    else:
        products = qs[:3]
        reply = "FreshMart AI gợi ý các loại trái cây tươi ngon đang còn hàng trong SQL Server:"
    return Response({'reply': reply, 'products': ProductSerializer(products, many=True).data})

@api_view(['POST', 'GET'])
def seed_data(request):
    ensure_full_8_products_seeded()
    return Response({'message': 'Đã đồng bộ đầy đủ 8 sản phẩm, 17 biến thể và 4 Voucher vào SQL Server!'})

@api_view(['POST'])
def set_variant_stock(request):
    variant_id = int(request.data.get('variant_id', 1))
    new_stock = int(request.data.get('stock', 30))
    ProductVariant.objects.filter(id=variant_id).update(stock=new_stock)
    return Response({'message': f'Đã cập nhật tồn kho variant #{variant_id} = {new_stock}'})