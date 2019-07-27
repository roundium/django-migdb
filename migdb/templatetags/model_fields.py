from django import template

register = template.Library()


@register.filter(name="model_fields")
def model_fields(model):
    return model._meta.get_fields()
