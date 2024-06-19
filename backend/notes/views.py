from rest_framework import generics, permissions #type: ignore
# from .models import Note
# from .serializers import NoteSerializer
from .models import Todo
from .serializers import TodoSerializer
import logging

#フロントのロギング用
# from django.http import JsonResponse    #type: ignore
# from django.views.decorators.csrf import csrf_exempt    #type: ignore
# import json 

logger = logging.getLogger(__name__)

# フロントから受け取ったログ情報をファイルに書き込む
# def log_to_file(request):
#     if request.method == 'POST':
#         try:
#             data = json.loads(request.body)
#             log_message = data.get('message', '')
            
#             # ログをファイルに書き込む
#             with open('logs/front.log', 'a') as f:
#                 f.write(log_message + '\n')
                
#             return JsonResponse({'status': 'success', 'message': 'Log recorded successfully'})
#         except json.JSONDecodeError:
#             return JsonResponse({'status': 'error', 'message': 'Invalid JSON format'}, status=400)
#     else:
#         return JsonResponse({'status': 'error', 'message': 'Only POST requests are allowed'}, status=405)


class TodoListCreateAPI(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = TodoSerializer
    logger.info("TodoListCreateAPIを呼び出しました")

    def get_queryset(self):
        # logger.info("get_querysetを呼び出しました")
        return Todo.objects.filter(user=self.request.user, deleted=False)

    def perform_create(self, serializer):
        # logger.info("perform_createを呼び出しました")
        serializer.save(user=self.request.user)

class TodoUpdateDeleteAPI(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()
    logger.info("TodoUpdateDeleteAPIを呼び出しました")

    def get_queryset(self):
        # logger.info("get_querysetを呼び出しました")
        return Todo.objects.filter(user=self.request.user)





# class NoteListCreate(generics.ListCreateAPIView):
#     queryset = Note.objects.all()
#     serializer_class = NoteSerializer
