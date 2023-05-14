from django.contrib import admin
from .models import Art
from .models import Author
from .models import Gallery
from .models import Location

# so that when we start the application we will see both of our models there
admin.site.register(Art)
admin.site.register(Author)
admin.site.register(Gallery)
admin.site.register(Location)
