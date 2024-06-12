from rest_framework import generics, permissions #type: ignore
# from .models import Note
# from .serializers import NoteSerializer
from .models import Todo
from .serializers import TodoSerializer

class TodoListCreateAPI(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = TodoSerializer

    def get_queryset(self):
        return Todo.objects.filter(user=self.request.user, deleted=False)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class TodoUpdateDeleteAPI(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()

    def get_queryset(self):
        return Todo.objects.filter(user=self.request.user)





# class NoteListCreate(generics.ListCreateAPIView):
#     queryset = Note.objects.all()
#     serializer_class = NoteSerializer
