from django import forms



ACTIONS = (
    ("nochange", "No Change"),
    ("rename", "Rename"),
    ("replace", "Replace"),
    ("prefix", "Add Prefix"),
    ("postfix", "Add Postfix"),
)

class FieldForm(forms.Form):
    current_field_name = forms.CharField(max_length=255)
    action = forms.ChoiceField(choices=ACTIONS)
    fk = forms.BooleanField(required=False)
    m2m = forms.BooleanField(required=False)

    new_field_name = forms.CharField(max_length=255, required=False)
    replace_value = forms.CharField(max_length=255, required=False)
    prefix_value = forms.CharField(max_length=255, required=False)
    postfix_value = forms.CharField(max_length=255, required=False)

    # def clean(self):
    #     if self.cleaned_data['action'] == 'rename':
    #         self.cleaned_data['new_field_name'] = self.data['new_field_name']
    #     elif self.cleaned_data['action'] == 'replace':
    #         self.cleaned_data['replace_value'] = self.data['replace_value']
    #     elif self.cleaned_data['action'] == 'prefix':
    #         self.cleaned_data['prefix_value'] = self.data['prefix_value']
    #     elif self.cleaned_data['action'] == 'postfix':
    #         self.cleaned_data['postfix_value'] = self.data['postfix_value']
