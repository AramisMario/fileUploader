from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework import status
from rest_framework.exceptions import ParseError
from apps.authRegister.jwtbackend import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import get_authorization_header
from apps.authRegister.models import *
from io import BytesIO
import os
import base64
import jwt

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def getUserEmailFromToken(request):
    token = get_authorization_header(request).split()[1]
    try:
        payload = jwt.decode(token,os.environ["SECRETKEY"])
        return payload["email"]
    except:
        return None

def getUserIdFromToken(request):
    token = get_authorization_header(request).split()[1]
    try:
        payload = jwt.decode(token,os.environ["SECRETKEY"])
        return payload["id"]
    except:
        return None


class WithDropView(APIView):
    parser_classes = (JSONParser,)
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)
    def post(self, request, format=None):


        email = getUserEmailFromToken(request)
        file = request.data["file"]
        ruta = ""

        user = Users.objects.get(email=email)
        ruta = os.path.abspath(os.path.join(os.path.dirname( __file__ ), '../../userDirectories'+'/'+email))
        
        splitedFile = file.split(",")
        fileName = request.data["name"]
        path = ruta+"/"+fileName

        fileSaved = open(path,"wb")
        fileSaved.write(BytesIO(base64.b64decode(splitedFile[1])).read())
        
        Files.objects.create(users=user,path=path,data=splitedFile[0],name=fileName)
            
        filesInfo = user.getFilesInfo()

        return Response({"filesInfo":filesInfo})   

class ShowFile(APIView):
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)
    def get(self,request ,pk ,format = None):

        file = Files.objects.get(pk=pk)
        readed = base64.b64encode(open(file.path,"rb").read())
        return Response({"file":readed,"data":file.data})

class ShowFileInfo(APIView):

    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request, format = None):


        userId = getUserIdFromToken(request)
        user = Users.objects.get(pk=userId)

        filesInfo = user.getFilesInfo()

        return Response({"filesInfo":filesInfo})