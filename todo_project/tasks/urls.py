from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, task_list

# Router for API
router = DefaultRouter()
router.register(r'tasks', TaskViewSet)

# Combine API and frontend routes
urlpatterns = [
    # Frontend route
    path('', task_list, name='task-list'),
    # API routes
    path('api/', include(router.urls)),
]
