from django.db import models
import django.utils.timezone as timezone


class STUDB(models.Model):
    userid = models.TextField(max_length=11)
    username = models.TextField(max_length=10)
    passwd = models.TextField(max_length=200)
    firstflag = models.DateTimeField(default=timezone.now)
    lastflag = models.DateTimeField(default=timezone.now)
    superflag = models.DateTimeField(default=timezone.now)
    specialflag = models.DateTimeField(default=timezone.now)
    rank = models.IntegerField(default=1)
    timesubtract = models.IntegerField(default=0)
    timesubtract_last = models.IntegerField(default=0)
    timesubtract_suprise = models.IntegerField(default=0)

    def __str__(self):
        return self.userid
