from django.db import models

class Art(models.Model):
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    year = models.IntegerField()
    type = models.CharField(max_length=100)
    material = models.CharField(max_length=200)

    def __str__(self):
        return self.title
