from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Lead, ActivityLog, InviteCode
from django.utils.translation import gettext_lazy as _

# Register your models here.


class ActivityLogAdmin(admin.ModelAdmin):
    list_display = ["user", "lead", "action", "description", "created_at"]


class CustomUserAdmin(UserAdmin):
    list_display = (
        "username",
        "first_name",
        "last_name",
        "email",
        "job_title",
        "profile_picture",
        "profile_picture_url",
    )

    fieldsets = (
        (None, {"fields": ("username", "password")}),
        (
            _("Personal info"),
            {
                "fields": (
                    "first_name",
                    "last_name",
                    "email",
                    "bio",
                    "profile_picture",
                    "job_title",
                    "facebook",
                    "twitter",
                    "instagram",
                    "linkedin",
                )
            },
        ),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
        (_("Important dates"), {"fields": ("last_login", "date_joined")}),
    )

    add_fieldsets = UserAdmin.add_fieldsets + (
        (
            None,
            {
                "fields": (
                    "bio",
                    "profile_picture",
                    "job_title",
                    "facebook",
                    "twitter",
                    "instagram",
                    "linkedin",
                )
            },
        ),
    )


class InviteCodeAdmin(admin.ModelAdmin):
    list_display = ["code", "is_used", "created_at"]

admin.site.register(InviteCode, InviteCodeAdmin)
admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(ActivityLog, ActivityLogAdmin)


class BlogAdmin(admin.ModelAdmin):
    list_display = [
        "lead_name",
        "email",
        "phone",
        "company",
        "status",
        "author",
        "created_at",
    ]


admin.site.register(Lead, BlogAdmin)
