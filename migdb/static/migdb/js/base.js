String.prototype.format = function() {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{'+i+'\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};

var input_schema = "<div class='row'><div class='col-md-{1} px-3'><div class='md-form my-0'>{0}</div></div></div>";

function generate_label_tag(for_id, forloop_coun, text){
    return '<label for="{0}" name="{1}">{2}</label>'.format(for_id, forloop_coun, text)
}
function generate_input_tag(input_id, name){
    return '<input autocomplete="off" class="form-control" id="{0}" type="text" name="{1}" required/>'.format(
        input_id, name)
}

function action_changes(obj, div_id, forloop_coun){
    user_action = obj.value
    if(user_action == "rename"){
        var input_name_id = "form-" + forloop_coun + "-new_field_name";
        $("#" + div_id).html(
            input_schema.format(
                generate_input_tag(input_name_id, input_name_id)+
                generate_label_tag(input_name_id, forloop_coun, "New Name"),
                12
            )
        )
    }else if(user_action == 'format'){
        var input_name_id = "form-" + forloop_coun + "-format_value";
        $("#" + div_id).html(
            input_schema.format(
                generate_input_tag(input_name_id, input_name_id)+
                generate_label_tag(input_name_id, forloop_coun, "Format Value"),
                12
            )
        )
    }else if(user_action == 'format_rename'){
        var input_name_id_format_value = "form-" + forloop_coun + "-format_value";
        var input_name_id = "form-" + forloop_coun + "-new_field_name";
        $("#" + div_id).html(
            input_schema.format(
                generate_input_tag(input_name_id, input_name_id)+
                generate_label_tag(input_name_id, forloop_coun, "New Name"),
                12
            ) +
            input_schema.format(
                generate_input_tag(input_name_id_format_value, input_name_id_format_value)+
                generate_label_tag(input_name_id_format_value, forloop_coun, "Format Value"),
                12
            )
        )
    }else if(user_action == 'nochange' || user_action == "delete"){
        $("#" + div_id).html('')
    }
}