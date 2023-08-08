from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r"tracks", views.TrackViewSet)
router.register(r"playlist", views.PlaylistViewSet)

router.register(r'login', views.LoginViewSet, basename='login')
router.register(r'register', views.RegistrationViewSet, basename='register')
router.register(r'refresh', views.RefreshViewSet, basename='refresh')

urlpatterns = [
    path("", include(router.urls)),
]
