# -*- coding: utf-8 -*-
# Generated by Django 1.11.1 on 2017-07-21 18:50
from __future__ import unicode_literals

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('sonetworks', '0047_knownsharingservice'),
    ]

    operations = [
        migrations.CreateModel(
            name='PostError',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('date', models.DateField(auto_now_add=True)),
                ('time', models.TimeField(auto_now_add=True)),
                ('cause', models.CharField(max_length=255)),
            ],
        ),
    ]