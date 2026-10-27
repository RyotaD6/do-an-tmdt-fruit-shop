from django.db import models
from django.contrib.auth.models import User

# 1. BẢNG GIAN HÀNG / NHÀ VƯỜN
class Shop(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='shops')
    name = models.CharField(max_length=150, verbose_name="Tên nhà vườn")
    phone = models.CharField(max_length=20)
    address = models.CharField(max_length=255)
    ghn_district_id = models.IntegerField(null=True, blank=True, verbose_name="Mã quận huyện GHN")
    status = models.CharField(max_length=20, default='approved', choices=[
        ('pending', 'Chờ duyệt'),
        ('approved', 'Đang hoạt động'),
        ('locked', 'Đã khóa')
    ])
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=5.0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

# 2. BẢNG DANH MỤC TRÁI CÂY
class Category(models.Model):
    name = models.CharField(max_length=100, verbose_name="Tên danh mục")
    slug = models.SlugField(max_length=120, unique=True)
    icon = models.CharField(max_length=30, default='🍎')
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

# 3. BẢNG SẢN PHẨM TRÁI CÂY
class Product(models.Model):
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE, related_name='products')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    name = models.CharField(max_length=200, verbose_name="Tên trái cây")
    origin = models.CharField(max_length=100, verbose_name="Xuất xứ (Tiền Giang, Đà Lạt...)")
    brand = models.CharField(max_length=100, default='VietGAP')
    art_type = models.CharField(max_length=50, default='durian')
    nutrition_tags = models.CharField(max_length=255, blank=True, help_text="Từ khóa dinh dưỡng cho AI")
    is_flash_sale = models.BooleanField(default=False)
    ai_review_summary = models.TextField(blank=True, null=True, help_text="Tóm tắt đánh giá lưu trong cache")
    sold_count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

# 4. BẢNG BIẾN THỂ TRÁI CÂY (QUY CÁCH ĐÓNG GÓI, ĐỘ CHÍN, TRỌNG LƯỢNG)
class ProductVariant(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='variants')
    label = models.CharField(max_length=100, verbose_name="Quy cách (Hộp 500g, Thùng 2kg)")
    ripeness = models.CharField(max_length=100, default='Chín ăn ngay', verbose_name="Độ chín")
    weight_gram = models.IntegerField(default=500, verbose_name="Trọng lượng (gram) tính phí GHN")
    price = models.DecimalField(max_digits=18, decimal_places=2, verbose_name="Giá bán")
    flash_sale_price = models.DecimalField(max_digits=18, decimal_places=2, null=True, blank=True)
    stock = models.IntegerField(default=50, verbose_name="Tồn kho")

    def __str__(self):
        return f"{self.product.name} - {self.label}"

# 5. BẢNG VOUCHER / MÃ GIẢM GIÁ
class Voucher(models.Model):
    code = models.CharField(max_length=30, unique=True)
    title = models.CharField(max_length=150)
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE, null=True, blank=True)
    discount_type = models.CharField(max_length=10, choices=[('fixed', 'Cố định'), ('percent', 'Phần trăm')])
    discount_value = models.DecimalField(max_digits=18, decimal_places=2)
    min_order_value = models.DecimalField(max_digits=18, decimal_places=2, default=0)
    max_discount = models.DecimalField(max_digits=18, decimal_places=2, null=True, blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.code

# 6. BẢNG ĐƠN HÀNG
class Order(models.Model):
    buyer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    order_code = models.CharField(max_length=30, unique=True)
    shipping_address = models.CharField(max_length=300)
    total_weight_gram = models.IntegerField(default=500)
    shipping_fee = models.DecimalField(max_digits=18, decimal_places=2, default=0)
    discount_amount = models.DecimalField(max_digits=18, decimal_places=2, default=0)
    total_amount = models.DecimalField(max_digits=18, decimal_places=2)
    payment_method = models.CharField(max_length=50, choices=[
        ('vnpay', 'VNPay Sandbox'),
        ('momo', 'Ví MoMo'),
        ('wallet', 'Ví Nội Bộ'),
        ('cod', 'Thanh toán khi nhận hàng')
    ])
    status = models.CharField(max_length=30, default='pending', choices=[
        ('pending', 'Chờ xác nhận'),
        ('paid', 'Đã thanh toán'),
        ('shipping', 'Đang vận chuyển'),
        ('delivered', 'Đã giao hàng'),
        ('completed', 'Hoàn thành'),
        ('return_requested', 'Yêu cầu hoàn trả'),
        ('refunded', 'Đã hoàn tiền'),
        ('cancelled', 'Đã hủy')
    ])
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"#{self.order_code} - {self.total_amount}"

# 7. CHI TIẾT ĐƠN HÀNG
class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    variant = models.ForeignKey(ProductVariant, on_delete=models.PROTECT)
    quantity = models.IntegerField(default=1)
    unit_price = models.DecimalField(max_digits=18, decimal_places=2)
    line_total = models.DecimalField(max_digits=18, decimal_places=2)

# 8. YÊU CẦU HOÀN TRẢ HÀNG
class ReturnRequest(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE, related_name='return_request')
    reason = models.CharField(max_length=200, verbose_name="Lý do đổi trả (dập nát, sượng)")
    description = models.TextField(blank=True)
    evidence_image_url = models.CharField(max_length=500, blank=True)
    status = models.CharField(max_length=20, default='pending', choices=[
        ('pending', 'Chờ duyệt'),
        ('approved', 'Đã chấp nhận hoàn tiền'),
        ('rejected', 'Từ chối')
    ])
    refund_amount = models.DecimalField(max_digits=18, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

# 9. VÍ NỘI BỘ VÀ LỊCH SỬ GIAO DỊCH
class Wallet(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='wallet')
    balance = models.DecimalField(max_digits=18, decimal_places=2, default=0)
    updated_at = models.DateTimeField(auto_now=True)

class WalletTransaction(models.Model):
    wallet = models.ForeignKey(Wallet, on_delete=models.CASCADE, related_name='transactions')
    amount = models.DecimalField(max_digits=18, decimal_places=2)
    tx_type = models.CharField(max_length=30, choices=[
        ('refund', 'Hoàn tiền đơn hàng'),
        ('affiliate', 'Hoa hồng Affiliate 15%'),
        ('payment', 'Thanh toán đơn hàng'),
        ('withdraw', 'Rút tiền về ngân hàng')
    ])
    description = models.CharField(max_length=255)
    bank_name = models.CharField(max_length=100, blank=True)
    bank_account = models.CharField(max_length=50, blank=True)
    status = models.CharField(max_length=20, default='success')
    created_at = models.DateTimeField(auto_now_add=True)

# 10. ĐÁNH GIÁ SẢN PHẨM
class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.IntegerField(default=5)
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

# 11. HỘI THOẠI TRỢ LÝ AI & CHUYỂN TIẾP HỖ TRỢ VIÊN
class AIConversation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    session_key = models.CharField(max_length=64, blank=True)
    handoff_status = models.CharField(max_length=20, default='bot_active', choices=[
        ('bot_active', 'AI đang trả lời'),
        ('transferred', 'Đã chuyển sang chủ shop')
    ])
    created_at = models.DateTimeField(auto_now_add=True)

class AIMessage(models.Model):
    conversation = models.ForeignKey(AIConversation, on_delete=models.CASCADE, related_name='messages')
    sender = models.CharField(max_length=10, choices=[('user', 'Khách hàng'), ('bot', 'Trợ lý AI')])
    content = models.TextField()
    suggested_variant_ids = models.CharField(max_length=200, blank=True)
    is_out_of_scope = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)