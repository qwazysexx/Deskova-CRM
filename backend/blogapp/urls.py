from django.urls import path
from . import views 


urlpatterns = [
    path("register_user/", views.register_user, name="register_user"),
    path("create_lead/", views.create_lead, name="create_lead"),
    path("lead_list", views.lead_list, name="lead_list"),
    path("leads/<int:pk>/", views.get_lead, name="get_lead"),
    path("update_lead/<int:pk>/", views.update_lead, name="update_lead"),
    path("delete_lead/<int:pk>/", views.delete_lead, name="delete_lead"),
    path("update_user/", views.update_user_profile, name="update_user"),
    path("get_username", views.get_username, name="get_username"),
    path("get_userinfo/<str:username>", views.get_userinfo, name="get_userinfo"),
    path("get_user/<str:email>", views.get_user, name="get_user"),  
    path("activity_logs/", views.activity_logs, name="activity_logs")
]
