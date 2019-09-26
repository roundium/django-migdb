import json
import os

from django.apps import apps
from django.db.models.fields.reverse_related import ManyToOneRel, ManyToManyRel, OneToOneRel, ForeignObjectRel
from django.forms import formset_factory
from django.shortcuts import redirect, render
from django.views.generic import FormView, TemplateView
from django.http import JsonResponse

from django.urls import reverse_lazy

from .dump import DumpGenerator
from .forms import ACTIONS, FieldForm
from .apps import MigdbConfig


class Home(TemplateView):
    template_name = 'migdb/apps.html'

def apps_list(request):
    apps_list = list(apps.get_app_configs())
    apps_list = [item for item in apps_list if not isinstance(item, MigdbConfig)]
    data = []
    for app in apps_list:
        data.append(
            {
                "name": app.name,
                "label": app.label,
            }
        )
    return JsonResponse({"apps": data})

class ModelsList(FormView):
    template_name = 'migdb/models.html'

    def get(self, request, *args, **kwargs):
        app_name = kwargs.get("app_name", None)
        file_name = "%s_structure.json" % app_name
        new_app_name = ""
        if os.path.isfile(file_name):
            with open(file_name, 'r') as file:
                try:
                    file_structure = json.loads(file.read())
                    new_app_name = file_structure['new_app_name']
                except ValueError:
                    pass
        data = {
            "app_name": app_name,
            "new_app_name": new_app_name,
            'models': [],
        }
        for name, model in apps.all_models[app_name].items():
            data['models'].append(name)
        return JsonResponse(data)

    def post(self, request, *args, **kwargs):
        app_name = request.GET.get("app_name", None)
        file_name = "%s_structure.json" % app_name
        action_type = request.POST.get("action_type", None)
        new_app_name = ""
        if os.path.isfile(file_name):
            with open(file_name, 'r') as file:
                try:
                    file_structure = json.loads(file.read())
                    new_app_name = file_structure['new_app_name']
                except ValueError:
                    pass
        if not action_type:
            return render(request, self.template_name, {
                "app_name": app_name,
                'models': apps.all_models[app_name].items(),
                "start_dumping": "Dumping is started.",
                "new_app_name": new_app_name
            })
        if action_type == "save_new_name":
            new_app_name = request.POST.get('app_name', None)
            if new_app_name:
                file_structure = {
                    "app_name": app_name,
                    "new_app_name": new_app_name,
                    "models": []
                }
                if os.path.isfile(file_name):
                    with open(file_name, 'r') as file:
                        try:
                            file_structure = json.loads(file.read())
                            file_structure['new_app_name'] = new_app_name
                        except ValueError:
                            pass
                dumped_data = json.dumps(file_structure)
                with open(file_name, 'w') as file:
                    file.write(dumped_data)
        elif action_type == "dump":
            dump_thread = DumpGenerator(app_name)
            dump_thread.start()
        return render(request, self.template_name, {
            "app_name": app_name,
            'models': apps.all_models[app_name].items(),
            "start_dumping": "Dumping is started.",
            "new_app_name": new_app_name
        })


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
        # ignore the Rel fields because thay are not actual fields.
        ignore_field_types = [
            ManyToManyRel,
            ManyToOneRel,
            OneToOneRel,
            ForeignObjectRel,
        ]
        context["fields"] = [field for field in model._meta.get_fields() if type(field) not in ignore_field_types]
        context['actions'] = ACTIONS

        return render(request, self.template_name, context)

    def post(self, request, *args, **kwargs):
        app_name = request.GET.get("app_name", None)
        model_name = request.GET.get("model_name", None)
        new_app_name = request.GET.get("new_app_name", app_name)

        formset = self.form(request.POST)
        if not formset.is_valid():
            model = apps.get_model(app_label=app_name, model_name=model_name)
            context = {}
            context['app_name'] = app_name
            context['model_name'] = model_name
            context['new_app_name'] = new_app_name
            context["fields"] = [field for field in model._meta.get_fields() if not isinstance(field, ManyToOneRel)]
            context['actions'] = ACTIONS
            context['message'] = 'Please Fill all fields and then submit the form.'
            return render(request, self.template_name, context)

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

        file_name = "%s_structure.json" % app_name

        if os.path.isfile(file_name):
            with open(file_name, 'r') as the_file:
                content = the_file.read()
                try:
                    content = json.loads(content)
                    data = content
                    if 'models' not in data:
                        data['models'] = []
                    for index in range(0, len(data['models'])):
                        if data['models'][index]['current_name'] == model_name:
                            del data['models'][index]
                    data['models'].append(model_structure)
                    data['app_name'] = app_name
                    data['new_app_name'] = new_app_name
                except ValueError:
                    pass
        with open(file_name, 'w') as the_file:
            the_file.write(json.dumps(data))

        return redirect(reverse_lazy("migdb:models_list") + "?app_name=" + app_name)
