function action_changes(obj, div_id, forloop_coun){
    user_action = obj.value
    if(user_action == "rename"){
        $("#" + div_id).html(
            'new field name: <input type="text" name="form-' + forloop_coun + '-new_field_name" required/>'
        )
    }else if(user_action == 'replace'){
        $("#" + div_id).html(
            'replace value: <input type="text" name="form-' + forloop_coun + '-replace_value" required/>'
        )
    }else if(user_action == 'prefix'){
        $("#" + div_id).html(
            'prefix value: <input type="text" name="form-' + forloop_coun + '-prefix_value" required/>'
        )
    }else if(user_action == 'postfix'){
        $("#" + div_id).html(
            'postfix value: <input type="text" name="form-' + forloop_coun + '-postfix_value" required/>'
        )
    }else if(user_action == 'format'){
        $("#" + div_id).html(
            'format value: <input type="text" name="form-' + forloop_coun + '-format_value" required/> -> {current_value} for field default value'
        )
    }else if(user_action == 'nochange'){
        $("#" + div_id).html('')
    }
}