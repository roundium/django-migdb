from django import forms



ACTIONS = (
    ("nochange", "No Change"),
    ("rename", "Rename"),
    ("format", "Format"),
    ("format_rename", "Format And Rename"),
    ("delete", "Delete"),
)

class FieldForm(forms.Form):
    current_field_name = forms.CharField(max_length=255)
    action = forms.ChoiceField(choices=ACTIONS)
    fk = forms.BooleanField(required=False)
    m2m = forms.BooleanField(required=False)
    o2o = forms.BooleanField(required=False)

    new_field_name = forms.CharField(max_length=255, required=False)
    format_value = forms.CharField(max_length=255, required=False)
    primary_key = forms.BooleanField(required=False)
