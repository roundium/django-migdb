import os
import json

from threading import Thread
from django.apps import apps
from django.core.serializers.json import DjangoJSONEncoder


def get_structure_file_content(file_name):
    if os.path.isfile(file_name):
        with open(file_name, "r") as file:
            content = file.read()
            try:
                content = json.loads(content)
                return content
            except ValueError:
                return False
    print("file %s does not exists. generate structure file first." % file_name)
    exit()


class DumpGenerator(Thread):
    def __init__(self, app_name):
        super(DumpGenerator, self).__init__()
        self.app_name = app_name
        self.file_name = "%s_structure.json" % app_name

    def run(self):
        file_content = get_structure_file_content(self.file_name)
        dump_data = []

        for model_item in file_content['models']:
            model = apps.get_model(app_label=self.app_name, model_name=model_item['current_name'])
            all_data = model.objects.all()
            for data_item in all_data:
                temp_data = {}
                temp_data['model'] = "%s.%s" % (file_content['new_app_name'], model_item['new_name'])
                temp_data['pk'] = data_item.pk
                temp_data['fields'] = {}
                for field in model_item['fields']:
                    action = field['action']
                    current_field_name = field['current_field_name']
                    m2m_check = field.get('m2m', None)

                    if m2m_check:
                        values = getattr(data_item, current_field_name)
                        temp_data['fields'][current_field_name] = [item.id for item in values.all()]
                        continue
                    if action == 'nochange':
                        temp_data['fields'][current_field_name] = getattr(data_item, current_field_name)
                    elif action == 'delete':
                        continue
                    elif action == 'rename':
                        temp_data['fields'][field['new_field_name']] = getattr(data_item, current_field_name)
                    elif action == 'format':
                        format_value = field['format_value']
                        current_value = getattr(data_item, current_field_name)
                        try:
                            final_value = format_value.format(current_value=current_value)
                        except KeyError:
                            final_value = format_value
                        temp_data['fields'][current_field_name] = final_value
                    elif action.startswith('concat'):
                        concat_field = field['concat_field']
                        concat_field_value = getattr(data_item, concat_field)
                        concat_delimiter = field.get('concat_delimiter', ' ')
                        current_value = getattr(data_item, current_field_name)
                        if action == 'concat':
                            temp_data['fields'][current_field_name] = "%s%s%s" % (current_value, concat_delimiter, concat_field_value)
                        elif action == 'concat_rename':
                            new_field_name = field.get('new_field_name', current_field_name)
                            temp_data['fields'][new_field_name] = "%s%s%s" % (current_value, concat_delimiter, concat_field_value)
                dump_data.append(temp_data)
        with open("%s_data.json" % self.app_name, 'w') as file:
            file.write(json.dumps(dump_data, cls=DjangoJSONEncoder))
