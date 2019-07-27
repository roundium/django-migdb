from django.shortcuts import render, redirect
from django.views.generic import TemplateView
from django.apps import apps
from django.contrib.auth.models import Permission, User


class AppsList(TemplateView):
    template_name = 'migdb/apps.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        for app in apps.get_app_configs():
            print(dir(app))
        context["apps"] = apps.get_app_configs()
        return context

class ModelsList(TemplateView):
    template_name = 'migdb/models.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        app_name = self.request.GET.get("app_name", None)
        # for name, model  in apps.all_models[app_name].items():
        #     if model is User:
        #         print(True)
        context['app_name'] = app_name
        context["models"] = apps.all_models[app_name].items()
        return context


class FieldsList(TemplateView):
    template_name = 'migdb/fields.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        app_name = self.request.GET.get("app_name", None)
        model_name = self.request.GET.get("model_name", None)

        model = apps.get_model(app_label=app_name, model_name=model_name)

        context['app_name'] = app_name
        context['model_name'] = model_name
        context["fields"] = model._meta.get_fields()
        return context
