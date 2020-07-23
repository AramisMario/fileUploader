from django.urls import path
from apps.authRegister.views import * 
urlpatterns = [
    path('signIn/',SignIn.as_view()),
    path('signUp/',SignUp.as_view())    
]