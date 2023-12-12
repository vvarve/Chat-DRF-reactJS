from rest_framework import serializers
from .models import Username, chat, User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class User_s(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"

class Username_s(serializers.ModelSerializer):
    class Meta:
        model = Username
        fields = "__all__"
        
class Chat_s(serializers.ModelSerializer):
    class Meta:
        model = chat
        fields = "__all__"


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        user_id = Username.objects.filter(user = user.id).first()
        user_conver = str(user_id).split()[2].removeprefix("(").removesuffix(")")
        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        token["id"] = int(user_conver)
        # ...

        return token