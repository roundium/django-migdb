from django import forms



ACTIONS = (
    ("nochange", "No Change"),
    ("rename", "Rename"),
    ("format", "Format"),
    ("delete", "Delete"),
    ("concat", "Concat"),
    ("concat_rename", "Concat and rename"),
)

class FieldForm(forms.Form):
    current_field_name = forms.CharField(max_length=255)
    action = forms.ChoiceField(choices=ACTIONS)
    fk = forms.BooleanField(required=False)
    m2m = forms.BooleanField(required=False)

    new_field_name = forms.CharField(max_length=255, required=False)
    format_value = forms.CharField(max_length=255, required=False)
    concat_field = forms.CharField(max_length=255, required=False)
    concat_delimiter = forms.CharField(max_length=255, required=False)
