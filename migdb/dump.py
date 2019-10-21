import os
import json

from threading import Thread
from django.apps import apps
from django.core.serializers.json import DjangoJSONEncoder


def get_structure_file_content(file_name):
    """
    chech the structure file exists or not
    """
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



def generate_dump_file(file_content, app_name):
    dump_data = []
    for model_item in file_content['models']:
        model = apps.get_model(app_label=app_name, model_name=model_item['current_name'])
        all_data = model.objects.all()
        for data_item in all_data:
            temp_data = {}
            temp_data['model'] = "%s.%s" % (file_content['new_app_name'], model_item['new_name'])
            pk_value = data_item.pk
            temp_data['fields'] = {}
            for field in model_item['fields']:
                action = field['action']
                current_field_name = field['current_field_name']
                m2m_check = field.get('m2m', None)
                fk_check = field.get('fk', None)
                o2o_check = field.get('o2o', None)
                primary_check = field.get('primary_key', False)

                if action.startswith("set_"):
                    if action == "set_null":
                        temp_data['fields'][current_field_name] = None
                    if action == "set_true":
                        temp_data['fields'][current_field_name] = True
                    if action == "set_false":
                        temp_data['fields'][current_field_name] = False
                    if action == "set_empty_string":
                        temp_data['fields'][current_field_name] = ""
                    if action == "set_empty_array":
                        temp_data['fields'][current_field_name] = []
                    # we will continue throgth the loop because those actions are forced.
                    continue

                # replace pk value if the primary key has changed
                if primary_check:
                    pk_value = getattr(data_item, current_field_name)

                # get the many 2 many value if the field is many 2 many
                if m2m_check:
                    values = getattr(data_item, current_field_name)
                    if action == 'nochange':
                        temp_data['fields'][current_field_name] = [item.id for item in values.all()]
                    elif action == 'rename':
                        temp_data['fields'][field['new_field_name']] = [item.id for item in values.all()]
                    continue

                # get the foriegn key or one 2 one field value. we append the _id to the field name
                # because the foriegn key and one 2 one field has the _id at the end in django.
                # remember one 2 one field is the foriegn key that have primary=True attribute
                if fk_check or o2o_check:
                    values = getattr(data_item, current_field_name + "_id")
                    if action == 'nochange':
                        temp_data['fields'][current_field_name + "_id"] = values
                    elif action == 'rename':
                        temp_data['fields'][field['new_field_name']] = values
                    elif action == 'format':
                        format_value = field['format_value']
                        current_value = getattr(data_item, current_field_name)
                        try:
                            final_value = format_value.format(current_value=current_value, **data_item.__dict__)
                        except KeyError:
                            final_value = format_value
                        temp_data['fields'][current_field_name] = final_value
                    continue

                # field has no changes
                if action == 'nochange':
                    temp_data['fields'][current_field_name] = getattr(data_item, current_field_name)
                # if the field has the delete flag we will ignore the field
                elif action == 'delete':
                    continue
                # handle the rename case. only rename not the format_rename
                elif action == 'rename':
                    field_new_name = field['new_field_name']
                    temp_data['fields'][field_new_name] = getattr(data_item, current_field_name)
                # handle all format cases. format and format_rename
                elif action.startswith('format'):
                    format_value = field['format_value']
                    current_value = getattr(data_item, current_field_name)
                    try:
                        final_value = format_value.format(current_value=current_value, **data_item.__dict__)
                    except KeyError:
                        final_value = format_value
                    if action == "format":
                        temp_data['fields'][current_field_name] = final_value
                    elif action == "format_rename":
                        field_new_name = field['new_field_name']
                        temp_data['fields'][field_new_name] = final_value
                    # if the field has formated and have the primary flag we have to replace the primary value with it.
                    if primary_check:
                        pk_value = final_value
                elif action.startswith("conditional_replacement"):
                    conditions = field['conditions']
                    final_value = getattr(data_item, current_field_name)
                    for condition in conditions:
                        if final_value == condition["current_value"]:
                            final_value = condition["new_value"]
                            break
                    if action == "conditional_replacement":
                        temp_data['fields'][current_field_name] = final_value
                    elif action == "conditional_replacement_rename":
                        field_new_name = field['new_field_name']
                        temp_data['fields'][field_new_name] = final_value
                else:
                    continue
            temp_data['pk'] = pk_value
            dump_data.append(temp_data)
        with open("%s_data.json" % app_name, 'w') as file:
            file.write(json.dumps(dump_data, cls=DjangoJSONEncoder))


class DumpGenerator(Thread):
    def __init__(self, app_name):
        super(DumpGenerator, self).__init__()
        self.app_name = app_name
        self.file_name = "%s_structure.json" % app_name

    def run(self):
        file_content = get_structure_file_content(self.file_name)
        generate_dump_file(file_content, self.app_name)
