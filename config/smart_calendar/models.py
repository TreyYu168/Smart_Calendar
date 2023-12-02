from django.db import models


class Reminders(models.Model):
    title = models.CharField(max_length=255)
    is_complete = models.BooleanField(default=False)
    created_date = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)
