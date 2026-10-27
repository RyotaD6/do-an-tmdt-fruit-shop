from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, CategoryViewSet, ai_fruit_advisor, seed_data

router = DefaultRouter()
router.register('products', ProductViewSet)
router.register('categories', CategoryViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('ai/advisor/', ai_fruit_advisor, name='ai-advisor'),
    path('seed-data/', seed_data, name='seed-data'),
]