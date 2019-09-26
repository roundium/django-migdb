from django.urls import path

from .views import FieldsList, Home, ModelsList, apps_list

app_name = 'migdb'
urlpatterns = [
    path("", Home.as_view(), name="home"),
    path("apps/", apps_list, name="apps_list"),
    path("app/models/<str:app_name>", ModelsList.as_view(), name="models_list"),
    path("models/fields/", FieldsList.as_view(), name="fields_list"),
]
