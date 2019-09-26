import React from 'react';
import { Link } from "react-router-dom";

export default class Item extends React.Component{
    render(){
        let item = this.props.item;
        let itemUrl, itemName, itemLabel;
        if(this.props.itemType == "app"){
            itemUrl = "/migdb/app/"+item.label;
            itemName = item.name;
            itemLabel = item.label;
        }else{
            itemUrl = "/migdb/app/fields/"+item;
            itemName = item;
            itemLabel = item;
        }
        return (
            <Link to={itemUrl} title={ itemName } className="list-group-item d-flex justify-content-between dark-grey-text">
                { itemLabel }
                <i className="fas fa-wrench ml-auto" data-toggle="tooltip" data-placement="top" title="Click to show models"></i>
            </Link>
        )
    }
}
