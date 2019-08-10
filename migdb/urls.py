from django.urls import path


from .views import AppsList, ModelsList, FieldsList


app_name = 'migdb'
urlpatterns = [
    path("", AppsList.as_view(), name="apps_list"),
    path("models/", ModelsList.as_view(), name="models_list"),
    path("models/fields/", FieldsList.as_view(), name="fields_list"),
]
