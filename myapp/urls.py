from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('play/', views.play, name='play'),
    path('win/', views.win, name='win'),
    path('register_to_db/', views.register_to_db, name='register_to_db'),
    path('check_user/', views.check_user, name='check_user'),
    path('compare_flag/', views.compare_flag, name='compare_flag'),
]
