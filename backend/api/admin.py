from django.contrib import admin
from .models import Shop, Category, Product, ProductVariant, Voucher, Order, OrderItem, ReturnRequest, Wallet, WalletTransaction, Review, AIConversation, AIMessage

admin.site.register([Shop, Category, Product, ProductVariant, Voucher, Order, OrderItem, ReturnRequest, Wallet, WalletTransaction, Review, AIConversation, AIMessage])