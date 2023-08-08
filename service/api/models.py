from django.conf import settings
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class Artist(models.Model):
    name = models.CharField(max_length=100, null=False)

    def __str__(self):
        return f"{self.name}"


class Genre(models.Model):
    name = models.CharField(max_length=100, null=False)

    def __str__(self):
        return f"{self.name}"


class Mood(models.Model):
    name = models.CharField(max_length=100, null=False)

    def __str__(self):
        return f"{self.name}"


class Track(models.Model):
    id = models.CharField(primary_key=True, max_length=10)
    title = models.CharField(max_length=200, null=False)
    genres = models.ManyToManyField(Genre, related_name="genre")
    moods = models.ManyToManyField(Mood, related_name="mood")
    main_artists = models.ManyToManyField(Artist, related_name="main_artist")
    featured_artists = models.ManyToManyField(Artist, related_name="featured_artist")
    length = models.IntegerField(default=0)
    bpm = models.IntegerField(default=0)

    @property
    def audio(self):
        return "{}{}.{}".format(settings.ASSETS_BASE, self.id, "mp3")

    @property
    def cover_art(self):
        return "{}{}.{}".format(settings.ASSETS_BASE, self.id, "jpg")

    @property
    def waveform(self):
        return "{}{}.{}".format(settings.ASSETS_BASE, self.id, "json")

    @property
    def spotify(self):
        return "{}{}/{}".format(settings.DSP_BASE, self.id, "spotify")


class UserManager(BaseUserManager):

    def create_user(self, username, email, password=None, **kwargs):
        if username is None:
            raise TypeError('Users must have a username.')
        if email is None:
            raise TypeError('Users must have an email.')
        user = self.model(username=username, email=self.normalize_email(email))
        user.set_password(password)
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(db_index=True, max_length=255, unique=True)
    email = models.EmailField(db_index=True, unique=True,  null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = UserManager()

    def __str__(self):
        return f"{self.email}"


class Playlist(models.Model):
    name = models.CharField(max_length=100, null=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True)
    saved_tracks = models.ManyToManyField(Track, related_name='playlists', blank=True)

    def __str__(self):
        return f"{self.name}"