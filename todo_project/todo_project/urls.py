from django.urls import path, include
from django.contrib import admin
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('', include('tasks.urls')),  # Frontend and API are both handled here
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls')),
    path('accounts/', include('django.contrib.auth.urls')),  # Authentication URLs
    path('login/', auth_views.LoginView.as_view(), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
]
