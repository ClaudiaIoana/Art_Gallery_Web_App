from django.contrib import admin
from .models import Art

# so that when we start the application we will see both of our models there
admin.site.register(Art)
