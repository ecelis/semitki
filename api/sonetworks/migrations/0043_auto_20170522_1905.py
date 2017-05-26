# -*- coding: utf-8 -*-
# Generated by Django 1.11.1 on 2017-05-22 19:05
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('sonetworks', '0042_auto_20170522_1858'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pagestoken',
            name='account',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='accounts', to='socialaccount.SocialAccount'),
        ),
    ]
