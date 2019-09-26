import React from 'react';

export default class Item extends React.Component{
    render(){
        let item = this.props.item;
        return (
            <a href="" title={ item.name } className="list-group-item d-flex justify-content-between dark-grey-text">
                { item.label }
                <i className="fas fa-wrench ml-auto" data-toggle="tooltip" data-placement="top" title="Click to show models"></i>
            </a>
        )
    }
}
