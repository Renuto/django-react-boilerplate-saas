from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class CustomUser(AbstractUser):
    name = models.CharField('name',null=True ,blank=True, max_length=100)
