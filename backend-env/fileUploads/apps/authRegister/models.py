from django.db import models, connection
from datetime import datetime, timedelta
import jwt, os
# Create your models here.

class Users(models.Model):

    username = models.CharField(max_length=100)
    email = models.CharField(max_length=100, unique=True)
    password = models.TextField(max_length=100)
    is_authenticated = models.BooleanField(default=True)

    class Meta:
        db_table = 'users'

    def generate_jwt_token(self):
        dt = datetime.now() + timedelta(minutes = 30)
        token = jwt.encode({
            'id':self.pk,
            'email':self.email,
            'exp':dt
        },os.environ['SECRETKEY'])
        return token

    @property
    def token(self):
        return self.generate_jwt_token()
        
    def getFiles(self):
        cursor = connection.cursor()
        cursor.execute("select data, path from files where files.users_id = %s",[self.pk])

        files = []
        for row in cursor:
            files.append({"data":row[0],"path":row[1]})

        return files
    
    def getFilesInfo(self):
        cursor = connection.cursor()
        cursor.execute("select data, path, name, id from files where files.users_id = %s",[self.pk])

        files = []

        for row in cursor:
            files.append({"data":row[0],"path":row[1],"name":row[2],"fId":row[3]})

        return files

class Files(models.Model):
    path = models.TextField()
    data = models.CharField(max_length=150)
    users = models.ForeignKey('Users',models.DO_NOTHING)
    name = models.CharField(max_length=255)
    class Meta:
        db_table = 'files'

