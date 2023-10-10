# Generated by Django 4.2.6 on 2023-10-10 01:09

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Recipe',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('ingredients', models.TextField()),
                ('ingredients_set', models.TextField()),
                ('instructions', models.TextField()),
                ('image_name', models.CharField(max_length=255)),
            ],
        ),
    ]
