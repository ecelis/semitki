# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-03-30 20:01
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sonetworks', '0014_auto_20170330_1932'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='StaticPages',
            new_name='StaticPage',
        ),
    ]