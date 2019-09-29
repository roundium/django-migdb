from django.urls import path

from .views import FieldsList, Home, ModelsList, apps_list

app_name = 'migdb'
urlpatterns = [
    path("", Home.as_view(), name="home"),
    path("apps/", apps_list, name="apps_list"),
    path("<str:app_name>/models/", ModelsList.as_view(), name="models_list"),
    path("<str:app_name>/<str:model_name>/fields/", FieldsList.as_view(), name="fields_list"),
]
