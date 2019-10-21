import json
import os

from django.apps import apps
from django.contrib.auth.decorators import login_required, user_passes_test
from django.db.models.fields.reverse_related import (ForeignObjectRel,
                                                     ManyToManyRel,
                                                     ManyToOneRel, OneToOneRel)
from django.forms import formset_factory
from django.http import JsonResponse, HttpResponseBadRequest
from django.shortcuts import redirect, render
from django.urls import reverse_lazy
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import FormView, TemplateView

from .apps import MigdbConfig
from .dump import DumpGenerator
from .forms import ACTIONS, FieldForm
from .templatetags.model_fields import (check_foriegn_key, check_many_to_many,
                                        check_one_2_one)


@method_decorator([
    login_required,
    user_passes_test(lambda user: user.is_superuser)
], name="dispatch")
class Home(TemplateView):
    template_name = 'migdb/apps.html'


@login_required
@user_passes_test(lambda user: user.is_superuser)
def apps_list(request):
    apps_list = list(apps.get_app_configs())
    apps_list = [
        item for item in apps_list if not isinstance(item, MigdbConfig)
    ]
    data = []
    for app in apps_list:
        data.append({
            "name": app.name,
            "label": app.label,
        })
    return JsonResponse({"apps": data})


@login_required
@user_passes_test(lambda user: user.is_superuser)
def models_list(request, app_name):
    data = {
        "app_name": app_name,
        'models': [],
    }
    for name, model in apps.all_models[app_name].items():
        data['models'].append(name)
    return JsonResponse(data)


@method_decorator([
    csrf_exempt,
    login_required,
    user_passes_test(lambda user: user.is_superuser)
], name="dispatch")
class FieldsList(FormView):
    @staticmethod
    def generate_field_json_res(field):
        return {
            "name": field.name,
            "pk": field.primary_key,
            "fk": check_foriegn_key(field),
            "m2m": check_many_to_many(field),
            "o2o": check_one_2_one(field),
            "action": {},
        }

    def get(self, request, *args, **kwargs):
        app_name = kwargs["app_name"]
        model_name = kwargs["model_name"]

        model = apps.get_model(app_label=app_name, model_name=model_name)

        # ignore the Rel fields because thay are not actual fields.
        ignore_field_types = [
            ManyToManyRel,
            ManyToOneRel,
            OneToOneRel,
            ForeignObjectRel,
        ]
        fields = []
        data = {
            "fields": [
                self.generate_field_json_res(field)
                for field in model._meta.get_fields()
                if type(field) not in ignore_field_types
            ],
            "app_name": app_name,
            "model_name": model_name
        }
        return JsonResponse(data)

    def post(self, request, *args, **kwargs):
        data = request.POST.get("data", None)
        model_name = request.POST.get("model_name", None)
        new_model_name = request.POST.get("new_model_name", None)
        app_name = request.POST.get("app_name", None)
        new_app_name = request.POST.get("new_app_name", None)

        if not data or not model_name or not new_model_name or not app_name or not new_app_name:
            return HttpResponseBadRequest(
                content=json.dumps({"error": "bad request"}),
                content_type="application/json"
            )
        return JsonResponse({"status": "dumping thread is running..."})
