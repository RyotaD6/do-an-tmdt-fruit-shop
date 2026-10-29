from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProductViewSet, CategoryViewSet, ai_fruit_advisor, seed_data,
    checkout_order, list_orders, confirm_online_payment,
    cancel_order_api, release_expired_orders_api, transition_order_state_api, set_variant_stock
)

router = DefaultRouter()
router.register('products', ProductViewSet)
router.register('categories', CategoryViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('orders/checkout/', checkout_order, name='checkout-order'),
    path('orders/list/', list_orders, name='list-orders'),
    path('orders/confirm-payment/', confirm_online_payment, name='confirm-online-payment'),
    path('orders/cancel/', cancel_order_api, name='cancel-order'),
    path('orders/release-expired/', release_expired_orders_api, name='release-expired-orders'),
    path('orders/transition/', transition_order_state_api, name='transition-order-state'),
    path('variants/set-stock/', set_variant_stock, name='set-variant-stock'),
    path('ai/advisor/', ai_fruit_advisor, name='ai-advisor'),
    path('seed-data/', seed_data, name='seed-data'),
]