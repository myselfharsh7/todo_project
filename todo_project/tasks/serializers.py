from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'
        
def get_queryset(self):
    return Task.objects.filter(user=self.request.user)
