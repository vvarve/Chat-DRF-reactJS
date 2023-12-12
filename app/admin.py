from django.contrib import admin
from .models import Username, chat
# Register your models here.

@admin.register(Username)
class Username(admin.ModelAdmin):
    list_filter = ["user", "user_id", "active", "date"]

@admin.register(chat)
class Username(admin.ModelAdmin):
    list_filter = ["user_one", "text", "files", "images", "user_two"]