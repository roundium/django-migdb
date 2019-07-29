from django.shortcuts import render, redirect
from django.views.generic import TemplateView, FormView
from django.apps import apps
from django.contrib.auth.models import Permission, User
from django.forms import formset_factory
import json
import os


from .forms import FieldForm, ACTIONS


class AppsList(TemplateView):
    template_name = 'migdb/apps.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["apps"] = apps.get_app_configs()
        return context

class ModelsList(TemplateView):
    template_name = 'migdb/models.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        app_name = self.request.GET.get("app_name", None)
        context['app_name'] = app_name
        context["models"] = apps.all_models[app_name].items()
        return context


class FieldsList(FormView):
    template_name = 'migdb/fields.html'
    form = formset_factory(FieldForm)

    def get(self, request, *args, **kwargs):
        app_name = request.GET.get("app_name", None)
        model_name = request.GET.get("model_name", None)
        new_app_name = request.GET.get("new_app_name", app_name)

        model = apps.get_model(app_label=app_name, model_name=model_name)

        context = {}
        context['app_name'] = app_name
        context['model_name'] = model_name
        context['new_app_name'] = new_app_name
        context["fields"] = model._meta.get_fields()
        context['actions'] = ACTIONS

        return render(request, self.template_name, context)

    def post(self, request, *args, **kwargs):
        formset = self.form(request.POST)
        if not formset.is_valid():
            print(formset.errors)
            return
        app_name = request.GET.get("app_name", None)
        model_name = request.GET.get("model_name", None)
        new_app_name = request.GET.get("new_app_name", app_name)

        new_model_name = request.POST.get("new_model_name", model_name)

        data = {}
        data['app_name'] = app_name
        data['new_app_name'] = new_app_name
        model_structure = {
            'current_name': model_name,
            'new_name': new_model_name,
            'fields': []
        }
        for form in formset:
            field_data = {k: v for k, v in form.cleaned_data.items() if v}
            model_structure['fields'].append(field_data)
        data['models'] = []
        data['models'].append(model_structure)

        if os.path.isfile('app_name_structure.json'):
            with open('app_name_structure.json', 'r') as the_file:
                content = the_file.read()
                try:
                    content = json.loads(content)
                    data = content
                    if 'models' not in data:
                        data['models'] = []
                    for index in range(len(data['models'])):
                        if data['models'][index]['current_name'] == model_name:
                            del data['models'][index]
                    data['models'].append(model_structure)
                    data['app_name'] = app_name
                    data['new_app_name'] = new_app_name
                except ValueError:
                    pass
        with open('app_name_structure.json', 'w') as the_file:
            the_file.write(json.dumps(data))

        return redirect("migdb:apps_list")
