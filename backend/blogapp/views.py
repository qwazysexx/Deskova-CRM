from django.shortcuts import render
from .models import Lead, ActivityLog, InviteCode
from django.contrib.auth import get_user_model
from .serializers import (
    SimpleAuthorSerializer,
    UpdateUserProfileSerializer,
    UserInfoSerializer,
    UserRegistrationSerializer,
    LeadSerializer,
)
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.pagination import PageNumberPagination


class BlogListPagination(PageNumberPagination):
    page_size = 10


# Create your views here.
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def blog_list(request):

    if request.user.is_staff:
        blogs = Lead.objects.all()
    else:
        blogs = Lead.objects.filter(author=request.user)

    paginator = BlogListPagination()
    paginated_blogs = paginator.paginate_queryset(blogs, request)
    serializer = LeadSerializer(paginated_blogs, many=True)

    return paginator.get_paginated_response(serializer.data)


# @api_view(['GET'])
# def blog_list(request):
#     blogs = Blog.objects.all()
#     serializer = LeadSerializer(blogs, many=True)
#     return Response(serializer.data)


@api_view(["GET"])
def get_blog(request, pk):
    blog = Lead.objects.get(id=pk)
    serializer = LeadSerializer(blog)
    return Response(serializer.data)


@api_view(["POST"])
def register_user(request):
    invite_code_value = request.data.get("invite_code")

    if not invite_code_value:
        return Response(
            {"message": "Invite code is required"}, status=status.HTTP_400_BAD_REQUEST
        )

    try:
        invite_code = InviteCode.objects.get(code=invite_code_value, is_used=False)
    except InviteCode.DoesNotExist:
        return Response(
            {"message": "Invalid or already used invite code"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    serializer = UserRegistrationSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

        invite_code.is_used = True
        invite_code.save()

        return Response(serializer.data)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_user_profile(request):
    user = request.user
    serializer = UpdateUserProfileSerializer(user, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_blog(request):
    user = request.user
    serializer = LeadSerializer(data=request.data)

    if serializer.is_valid():
        lead = serializer.save(author=user)

        ActivityLog.objects.create(
            user=user,
            lead=lead,
            action="created",
            description=f"Lead '{lead.lead_name}' was created",
        )

        return Response(serializer.data)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(["POST"])
# def create_blog(request):
#     serializer = LeadSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_blog(request, pk):
    user = request.user
    blog = Lead.objects.get(id=pk)

    if blog.author != user and not user.is_staff:
        return Response(
            {"error": "You are not allowed to update this lead"},
            status=status.HTTP_403_FORBIDDEN,
        )

    old_status = blog.status

    serializer = LeadSerializer(blog, data=request.data)

    if serializer.is_valid():
        updated_lead = serializer.save()

        if old_status != updated_lead.status:
            ActivityLog.objects.create(
                user=user,
                lead=updated_lead,
                action="status_changed",
                description=f"Status changed from '{old_status}' to '{updated_lead.status}'",
            )
        else:
            ActivityLog.objects.create(
                user=user,
                lead=updated_lead,
                action="updated",
                description=f"Lead '{updated_lead.lead_name}' was updated",
            )

        return Response(serializer.data)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(["PUT"])
# def update_blog(request, pk):
#     blog = Blog.objects.get(id=pk)
#     serializer = LeadSerializer(blog, data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def delete_blog(request, pk):
    user = request.user
    blog = Lead.objects.get(id=pk)

    if blog.author != user and not user.is_staff:
        return Response(
            {"error": "You are not allowed to delete this lead"},
            status=status.HTTP_403_FORBIDDEN,
        )

    lead_name = blog.lead_name

    ActivityLog.objects.create(
        user=user,
        lead=blog,
        action="deleted",
        description=f"Lead '{lead_name}' was deleted",
    )

    blog.delete()

    return Response({"message": "Lead deleted successfully"})


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_username(request):
    user = request.user
    username = user.username
    return Response({"username": username})


@api_view(["GET"])
def get_userinfo(request, username):
    User = get_user_model()
    user = User.objects.get(username=username)
    serializer = UserInfoSerializer(user)
    return Response(serializer.data)


@api_view(["GET"])
def get_user(request, email):
    User = get_user_model()
    try:
        existing_user = User.objects.get(email=email)
        serializer = SimpleAuthorSerializer(existing_user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)


# Facebook: https://www.facebook.com/sampleusername
# Instagram: https://www.instagram.com/sampleusername
# YouTube: https://www.youtube.com/user/sampleusername
# Twitter (now X): https://twitter.com/sampleusername
