from django.contrib import admin

from .models import *
# Register your models here.

admin.site.register(Quiz)
admin.site.register(Result)
admin.site.register(Question)
admin.site.register(Answer)
