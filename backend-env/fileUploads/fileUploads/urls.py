
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('file/',include('apps.service.urls')),
    path('auth/',include('apps.authRegister.urls'))
]
