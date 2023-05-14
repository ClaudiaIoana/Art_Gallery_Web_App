# Generated by Django 4.1.7 on 2023-03-28 12:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_alter_art_author'),
    ]

    operations = [
        migrations.AlterField(
            model_name='art',
            name='author',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='arts', to='api.author'),
        ),
        migrations.AlterField(
            model_name='art',
            name='gallery',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='arts', to='api.gallery'),
        ),
    ]