String.prototype.format = function() {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{'+i+'\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};

var input_schema = "<div class='row'><div class='col-md-{1} px-3'><div class='md-form my-0'>{0}</div></div></div>";

function generate_fields_select_options(){
    contact_select_options_text = '<option value="" disabled selected>Choose the field that append to this field</option>';
    arrayLength = fields_list.length;
    for (var i = 0; i < arrayLength; i++) {
        value = fields_list[i];
        contact_select_options_text = contact_select_options_text + "<option value='" + value + "'>" + value + "</option>";
    }
    return contact_select_options_text
}

function generate_select_tag(class_name, forloop_coun){
    return '<select editable="true" class="{0}" name="form-{1}-concat_field" required>'.format(class_name, forloop_coun)+ generate_fields_select_options() +'</select> ';
}
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
    }else if(user_action == 'nochange' || user_action == "delete"){
        $("#" + div_id).html('')
    }else if(user_action == 'concat'){
        var input_name_id = "form-" + forloop_coun + "-concat_delimiter";
        var select_class_name = "mdb-select-concat-" + forloop_coun;
        $("#" + div_id).html(
            input_schema.format(generate_select_tag(select_class_name, forloop_coun), 6) +
            input_schema.format(
                generate_input_tag(input_name_id, input_name_id) +
                generate_label_tag(input_name_id, forloop_coun, "Concat Delimiter. default is space"),
                6
            )
        )
        $('.' + select_class_name).materialSelect();
    }else if(user_action == 'concat_rename'){
        var new_field_name = "form-" + forloop_coun + "-new_field_name";
        var new_field_input_id = "form-" + forloop_coun + "-new_field_name_id";
        var input_name_id = "form-" + forloop_coun + "-concat_delimiter";
        var select_class_name = "mdb-select-concat-rename-" + forloop_coun;
        $("#" + div_id).html(
            input_schema.format(
                generate_input_tag(new_field_input_id, new_field_name)+
                generate_label_tag(new_field_input_id, forloop_coun, "New Name"),
                6
            )+
            input_schema.format(generate_select_tag(select_class_name, forloop_coun), 6) +
            input_schema.format(
                generate_input_tag(input_name_id, input_name_id) +
                generate_label_tag(input_name_id, forloop_coun, "Concat Delimiter. default is space"),
                6
            )
        )
        $('.' + select_class_name).materialSelect();
    }
}