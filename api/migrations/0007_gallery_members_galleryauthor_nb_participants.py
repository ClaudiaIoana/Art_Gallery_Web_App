# Generated by Django 4.1.7 on 2023-03-21 21:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_galleryauthor'),
    ]

    operations = [
        migrations.AddField(
            model_name='gallery',
            name='members',
            field=models.ManyToManyField(through='api.GalleryAuthor', to='api.author'),
        ),
        migrations.AddField(
            model_name='galleryauthor',
            name='nb_participants',
            field=models.IntegerField(default=0),
        ),
    ]
