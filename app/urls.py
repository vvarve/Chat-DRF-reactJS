from django.urls import path, include
from .views import Username_view, Chat_view, User_view, TokenObtainPairView
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from rest_framework_simplejwt.views import TokenRefreshView

route = routers.DefaultRouter()
route.register("users", Username_view, "username_url")
route.register("chats", Chat_view, "chat_url")
route.register("user", User_view, "user_url")

urlpatterns = [
    path("api/", include(route.urls)),
    path("docs_api/", include_docs_urls(title="chat API")),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("api-auth/", include("rest_framework.urls"))
]
