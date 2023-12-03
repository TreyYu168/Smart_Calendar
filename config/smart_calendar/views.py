from django.shortcuts import render
from rest_framework import viewsets
from .serializers import RemindersSerializer
from .models import Reminders


class RemindersView(viewsets.ModelViewSet):
    serializer_class = RemindersSerializer
    queryset = Reminders.objects.all()
