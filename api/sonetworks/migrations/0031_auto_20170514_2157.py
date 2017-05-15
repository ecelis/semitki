# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-05-14 21:57
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sonetworks', '0030_merge_20170511_1957'),
    ]

    operations = [
        migrations.AlterField(
            model_name='socialaccount',
            name='email',
            field=models.CharField(max_length=3000),
        ),
        migrations.AlterField(
            model_name='socialaccount',
            name='token_expiration',
            field=models.DateTimeField(blank=True),
        ),
    ]