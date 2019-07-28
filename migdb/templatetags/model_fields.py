from django import template
from django.db.models.fields.related import ForeignKey, ManyToManyField, OneToOneField, ManyToOneRel

register = template.Library()


@register.filter(name="model_fields")
def model_fields(model):
    return model._meta.get_fields()


@register.filter(name="check_fk")
def check_foriegn_key(field):
    if isinstance(field, ForeignKey):
        return True
    return False


@register.filter(name="check_m2m")
def check_many_to_many_field(field):
    if isinstance(field, ManyToManyField):
        return True
    return False
