# Generated by Django 4.1.7 on 2023-04-24 16:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_alter_galleryauthor_ending_exposition_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='location',
            name='to_visit',
            field=models.CharField(default='No locations to visit yet.', max_length=100000),
        ),
    ]
