from django.urls import path

from .views import (
    FieldsList, Home, models_list, apps_list,
)

app_name = 'migdb'
urlpatterns = [
    path("", Home.as_view(), name="home"),
    path("apps/", apps_list, name="apps_list"),
    path("<str:app_name>/models/", models_list, name="models_list"),
    path("<str:app_name>/<str:model_name>/fields/", FieldsList.as_view(), name="fields_list"),
]
