from django.conf import settings
from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import *


if 'allauth.socialaccount' in settings.INSTALLED_APPS:
    from allauth.socialaccount.helpers import complete_social_login
    from allauth.socialaccount.models import SocialToken
    from allauth.socialaccount.providers.oauth.client import OAuthError


class TwitterLoginSerializer(serializers.Serializer):
    access_token = serializers.CharField()
    token_secret = serializers.CharField()

    def _get_request(self):
        request = self.context.get('request')


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'posts')


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('__all__')


class PostSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Post
        fields = ('__all__')


class TopicSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Topic
        fields = ('id', 'name', 'description')


class CampaignSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Campaign
        fields = ('__all__')


class ProjectSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = ('id', 'name', 'description', 'campaing_id')


class SocialAccountsGroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = SocialAccountsGroup
        fields = ('__all__')


class SocialAccountSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = SocialAccount
        fields = ('__all__')


class BucketSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Bucket
        fields = ('id', 'name')

class AboutSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = StaticPages
        fields = ('__all__')