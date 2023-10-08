from django.db import models


class Recipe(models.Model):
    title = models.CharField(max_length=255)
    ingredients = models.TextField()
    instructions = models.TextField()
    image_name = models.CharField(max_length=255)
    ingredients_set = models.TextField()
