# Generated by Django 4.1.7 on 2023-03-13 10:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Author',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('date_birth', models.DateField(auto_now_add=True)),
                ('date_death', models.DateField(auto_now_add=True)),
                ('period', models.CharField(max_length=100)),
                ('originated', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Gallery',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('location', models.CharField(max_length=100)),
                ('theme', models.CharField(max_length=100)),
                ('street', models.CharField(max_length=100)),
                ('capacity', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Art',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('year', models.IntegerField()),
                ('type', models.CharField(max_length=100)),
                ('material', models.CharField(max_length=200)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.author')),
                ('gallery', models.ForeignKey(default='unknown', on_delete=django.db.models.deletion.CASCADE, to='api.gallery')),
            ],
        ),
    ]
