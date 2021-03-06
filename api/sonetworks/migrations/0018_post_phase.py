# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-04-10 23:02
from __future__ import unicode_literals

import datetime
from django.db import migrations, models
import django.db.models.deletion
from django.utils.timezone import utc

# def update_tables():
#     from sonetworks.settings import PROJECT_DIR
#     import os
#     sql_statements = open(os.path.join(PROJECT_DIR,'sql/posts.sql'), 'r').read()
#     return sql_statements

# def get_uuid(apps, schema_editor):
#     modelRef = apps.get_model('sonetworks', 'Phase')
#     return modelRef.objects.all()[0].id

class Migration(migrations.Migration):

    dependencies = [
        ('sonetworks', '0017_auto_20170410_2254'),
    ]

    # operations = [
    #     migrations.RunSQL(update_tables()),
    # ], 
    
    # operations = [
    #         migrations.RunPython(get_uuid),
    # ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='phase',
            field=models.ForeignKey(to='sonetworks.Phase'),#, default=get_uuid),
            preserve_default=False,
        ),
    ]
