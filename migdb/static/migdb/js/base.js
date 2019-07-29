function generate_fields_select_options(){
    contact_select_options_text = "";
    arrayLength = fields_list.length;
    for (var i = 0; i < arrayLength; i++) {
        value = fields_list[i];
        contact_select_options_text = contact_select_options_text + "<option value='" + value + "'>" + value + "</option>";
    }
    return contact_select_options_text
}

function action_changes(obj, div_id, forloop_coun){
    user_action = obj.value
    if(user_action == "rename"){
        $("#" + div_id).html(
            'new field name: <input type="text" name="form-' + forloop_coun + '-new_field_name" required/>'
        )
    }else if(user_action == 'format'){
        $("#" + div_id).html(
            'format value: <input type="text" name="form-' + forloop_coun + '-format_value" required/> -> {current_value} for field default value'
        )
    }else if(user_action == 'nochange' || user_action == "delete"){
        $("#" + div_id).html('')
    }else if(user_action == 'concat'){
        $("#" + div_id).html(
            'concat field: <select name="form-' + forloop_coun + '-concat_field" required>'+ generate_fields_select_options() +'</select> '+
            'concat delimiter: <input type="text" value=" " name="form-' + forloop_coun + '-concat_delimiter" required/> --> default is space'
        )
    }else if(user_action == 'concat_rename'){
        $("#" + div_id).html(
            'new field name: <input type="text" name="form-' + forloop_coun + '-new_field_name" required/> ' +
            'concat field: <select name="form-' + forloop_coun + '-concat_field" required>'+ generate_fields_select_options() +'</select> '+
            'concat delimiter: <input type="text" value=" " name="form-' + forloop_coun + '-concat_delimiter" required/> --> default is space'
        )
    }
}