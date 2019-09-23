from django import template
from django.db.models.fields.related import ForeignKey, ManyToManyField, OneToOneField, ManyToOneRel

register = template.Library()


@register.filter(name="model_fields")
def model_fields(model):
    """
    will return the model fields list
    """
    return model._meta.get_fields()


@register.filter(name="check_fk")
def check_foriegn_key(field):
    """
    will return true if the field type is foriegn key
    """
    if isinstance(field, ForeignKey):
        return True
    return False


@register.filter(name="check_m2m")
def check_many_to_many(field):
    """
    will return true if the field type is many to many
    """
    if isinstance(field, ManyToManyField):
        return True
    return False


@register.filter(name="check_o2o")
def check_one_2_one(field):
    """
    will return true if the field type is one 2 one
    """
    if isinstance(field, OneToOneField):
        return True
    return False
