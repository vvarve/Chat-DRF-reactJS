from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Username(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, unique=True, related_query_name='app.Username.user')
    username_id = models.CharField(max_length=10, unique=True)
    active = models.BooleanField(null=True, blank=True)
    date = models.DateField(auto_now=True)


class chat(models.Model):
    user_one = models.ForeignKey(Username, on_delete=models.CASCADE, related_name="user_one")
    text = models.CharField(max_length=300, null=True, blank=True)
    files = models.FileField(upload_to="files/", null=True, blank=True)
    images = models.FileField(upload_to="images/", null=True, blank=True)
    date = models.DateTimeField(auto_now=True, null=True, blank=True)
    user_two = models.ForeignKey(Username, on_delete=models.CASCADE,  related_name="user_two")
