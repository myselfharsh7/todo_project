from rest_framework import viewsets
from .models import Task
from .serializers import TaskSerializer
from django.shortcuts import render
from django.contrib.auth.decorators import login_required



class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    
@login_required
def task_list(request):
    return render(request, 'tasks/task_list.html')