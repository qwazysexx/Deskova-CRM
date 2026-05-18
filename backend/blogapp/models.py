from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.utils.text import slugify
import secrets

# Create your models here.


class CustomUser(AbstractUser):
    bio = models.TextField(blank=True, null=True)
    profile_picture = models.ImageField(upload_to="profile_img", blank=True, null=True)
    profile_picture_url = models.URLField(blank=True, null=True)
    job_title = models.CharField(max_length=50, blank=True, null=True)

    facebook = models.URLField(max_length=255, blank=True, null=True)
    youtube = models.URLField(max_length=255, blank=True, null=True)
    instagram = models.URLField(max_length=255, blank=True, null=True)
    twitter = models.URLField(max_length=255, blank=True, null=True)
    linkedin = models.URLField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.username


class Lead(models.Model):
    STATUS = (
        ("New", "New"),
        ("Contacted", "Contacted"),
        ("Qualified", "Qualified"),
        ("In Progress", "In Progress"),
        ("Closed", "Closed"),
    )

    lead_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=30)
    company = models.CharField(max_length=255, blank=True, null=True)
    status = models.CharField(max_length=255, choices=STATUS, default="New")
    notes = models.TextField(blank=True, null=True)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        related_name="blogs",
        null=True,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        base_slug = slugify(self.lead_name)
        slug = base_slug

        num = 1

        while Lead.objects.filter(slug=slug).exists():
            slug = f"{base_slug}-{num}"
            num += 1
        self.slug = slug

        super().save(*args, **kwargs)

    def __str__(self):
        return self.lead_name

    def save(self, *args, **kwargs):
        base_slug = slugify(self.lead_name)
        slug = base_slug
        num = 1

        while Lead.objects.filter(slug=slug).exists():
            slug = f"{base_slug}-{num}"
            num += 1

        self.slug = slug
        super().save(*args, **kwargs)


class ActivityLog(models.Model):
    ACTION_TYPES = (
        ("created", "Created"),
        ("updated", "Updated"),
        ("deleted", "Deleted"),
        ("status_changed", "Status Changed"),
    )

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )

    lead = models.ForeignKey(
        Lead,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="activity_logs",
    )

    action = models.CharField(max_length=50, choices=ACTION_TYPES)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.action} - {self.created_at}"

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.action} - {self.created_at}"


class InviteCode(models.Model):
    code = models.CharField(max_length=100, unique=True)
    is_used = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.code:
            self.code = secrets.token_hex(4).upper()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.code
