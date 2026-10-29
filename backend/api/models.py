from django.db import models
from django.contrib.auth.models import User

class Shop(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='shops')
    name = models.CharField(max_length=150, verbose_name="Tên nhà vườn")
    phone = models.CharField(max_length=20)
    address = models.CharField(max_length=255)
    ghn_district_id = models.IntegerField(null=True, blank=True)
    status = models.CharField(max_length=20, default='approved')
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=5.0)
    created_at = models.DateTimeField(auto_now_add=True)

class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=120, unique=True)
    icon = models.CharField(max_length=30, default='🍎')
    is_active = models.BooleanField(default=True)

class Product(models.Model):
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE, related_name='products')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    name = models.CharField(max_length=200)
    origin = models.CharField(max_length=100)
    brand = models.CharField(max_length=100, default='VietGAP')
    art_type = models.CharField(max_length=50, default='durian')
    nutrition_tags = models.CharField(max_length=255, blank=True)
    is_flash_sale = models.BooleanField(default=False)
    ai_review_summary = models.TextField(blank=True, null=True)
    sold_count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

class ProductVariant(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='variants')
    label = models.CharField(max_length=100)
    ripeness = models.CharField(max_length=100, default='Chín ăn ngay')
    weight_gram = models.IntegerField(default=500)
    price = models.DecimalField(max_digits=18, decimal_places=2)
    flash_sale_price = models.DecimalField(max_digits=18, decimal_places=2, null=True, blank=True)
    stock = models.IntegerField(default=50)

class Voucher(models.Model):
    code = models.CharField(max_length=30, unique=True)
    title = models.CharField(max_length=150)
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE, null=True, blank=True)
    voucher_category = models.CharField(
        max_length=20,
        default='discount',
        choices=[('discount', 'Mã giảm giá hàng'), ('shipping', 'Mã vận chuyển')]
    )
    discount_type = models.CharField(max_length=10, choices=[('fixed', 'Cố định'), ('percent', 'Phần trăm')])
    discount_value = models.DecimalField(max_digits=18, decimal_places=2)
    min_order_value = models.DecimalField(max_digits=18, decimal_places=2, default=0)
    max_discount = models.DecimalField(max_digits=18, decimal_places=2, null=True, blank=True)
    usage_limit = models.IntegerField(default=100)
    used_count = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

class Order(models.Model):
    buyer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    order_code = models.CharField(max_length=30, unique=True)
    # ĐIỀU KIỆN 2: RequestKey chống đặt trùng đơn + Unique Index (buyer, request_key)
    request_key = models.CharField(max_length=64, null=True, blank=True)
    shipping_address = models.CharField(max_length=300)
    total_weight_gram = models.IntegerField(default=500)
    shipping_fee = models.DecimalField(max_digits=18, decimal_places=2, default=0)
    # ĐIỀU KIỆN 4: Tối đa 1 mã giảm giá + 1 mã vận chuyển
    discount_voucher_code = models.CharField(max_length=30, blank=True, default='')
    shipping_voucher_code = models.CharField(max_length=30, blank=True, default='')
    discount_amount = models.DecimalField(max_digits=18, decimal_places=2, default=0)
    total_amount = models.DecimalField(max_digits=18, decimal_places=2)
    payment_method = models.CharField(max_length=50)
    status = models.CharField(max_length=30, default='pending')
    # ĐIỀU KIỆN 3: Giữ chỗ Voucher (Reserved / Used / Released) & Thời hạn giữ chỗ 30 phút
    voucher_status = models.CharField(max_length=20, default='None')
    expires_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['buyer', 'request_key'], name='unique_buyer_order_request_key')
        ]

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    variant = models.ForeignKey(ProductVariant, on_delete=models.PROTECT)
    # ĐIỀU KIỆN 4: Đơn lưu sẵn tên sản phẩm, quy cách và đơn giá tại thời điểm đặt
    product_name = models.CharField(max_length=200, default='')
    variant_label = models.CharField(max_length=100, default='')
    quantity = models.IntegerField(default=1)
    unit_price = models.DecimalField(max_digits=18, decimal_places=2)
    line_total = models.DecimalField(max_digits=18, decimal_places=2)

class ReturnRequest(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE, related_name='return_request')
    reason = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    evidence_image_url = models.CharField(max_length=500, blank=True)
    status = models.CharField(max_length=20, default='pending')
    refund_amount = models.DecimalField(max_digits=18, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

class Wallet(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='wallet')
    balance = models.DecimalField(max_digits=18, decimal_places=2, default=0)
    updated_at = models.DateTimeField(auto_now=True)

class WalletTransaction(models.Model):
    wallet = models.ForeignKey(Wallet, on_delete=models.CASCADE, related_name='transactions')
    amount = models.DecimalField(max_digits=18, decimal_places=2)
    tx_type = models.CharField(max_length=30)
    description = models.CharField(max_length=255)
    bank_name = models.CharField(max_length=100, blank=True)
    bank_account = models.CharField(max_length=50, blank=True)
    status = models.CharField(max_length=20, default='success')
    created_at = models.DateTimeField(auto_now_add=True)

class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.IntegerField(default=5)
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class AIConversation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    session_key = models.CharField(max_length=64, blank=True)
    handoff_status = models.CharField(max_length=20, default='bot_active')
    created_at = models.DateTimeField(auto_now_add=True)

class AIMessage(models.Model):
    conversation = models.ForeignKey(AIConversation, on_delete=models.CASCADE, related_name='messages')
    sender = models.CharField(max_length=10)
    content = models.TextField()
    suggested_variant_ids = models.CharField(max_length=200, blank=True)
    is_out_of_scope = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)