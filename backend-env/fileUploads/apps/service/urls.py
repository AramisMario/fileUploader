from django.urls import path
from apps.service.views import *
urlpatterns = [
    path('withDrop/',WithDropView.as_view()),
    path('showInfo/',ShowFileInfo.as_view()),
    path('showFile/<int:pk>/',ShowFile.as_view())
]
