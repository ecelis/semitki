# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-05-10 23:46
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sonetworks', '0028_auto_20170509_0231'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='published',
            field=models.BooleanField(default=0),
        ),
    ]
