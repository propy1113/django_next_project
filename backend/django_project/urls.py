from django.contrib import admin
from django.urls import path, include
from notes.views import NoteListCreate

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/notes/', NoteListCreate.as_view(), name='note-list-create'),
]
