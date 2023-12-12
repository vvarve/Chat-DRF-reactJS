from django.shortcuts import render
from rest_framework import viewsets, filters
from .serializer import Username_s, Chat_s, User_s, MyTokenObtainPairSerializer
from .models import Username, chat, User
from rest_framework_simplejwt.views import TokenObtainPairView
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q

# Create your views here.
class my_token(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer 

class User_view(viewsets.ModelViewSet):
    serializer_class = User_s
    queryset = User.objects.all()

class Username_view(viewsets.ModelViewSet):
    serializer_class = Username_s
    queryset = Username.objects.all()

class Chat_view(viewsets.ModelViewSet):
    serializer_class = Chat_s
    queryset = chat.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {"user_one": ["exact"], "user_two": ["exact"]}
    
    