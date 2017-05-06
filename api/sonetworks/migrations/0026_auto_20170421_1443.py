# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-04-21 14:43
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('sonetworks', '0025_auto_20170419_2200'),
    ]

    operations = [
        migrations.AlterField(
            model_name='socialaccountgroup',
            name='social_account',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='accounts', to='sonetworks.SocialAccount'),
        ),
    ]