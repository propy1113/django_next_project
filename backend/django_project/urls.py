from django.contrib import admin    #type: ignore
from django.urls import path, include   #type: ignore
from notes.views import NoteListCreate
from knox import views as knox_views    #type: ignore
from accounts.views import LoginView, RegisterView, UserDetailAPI

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/login/', LoginView.as_view(), name='knox_login'),
    path('api/logout/', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('api/logoutall/', knox_views.LogoutAllView.as_view(), name='knox_logoutall'),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/user/', UserDetailAPI.as_view(), name='user-detail'),
    path('api/notes/', NoteListCreate.as_view(), name='note-list-create'),
]
