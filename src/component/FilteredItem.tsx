import * as React from 'react';
import { IContactDetails } from '../data/dataDefinitions';
import './FilteredItem.scss';

export interface IFilteredItemProps{
    contact: IContactDetails,
    onSelectContact: ()=>void
}
export default class FilteredItem extends React.Component<IFilteredItemProps>{
    public static defaultProps: Partial<IFilteredItemProps> ={
        onSelectContact : ()=>{}
    }
    constructor(props: IFilteredItemProps){
        super(props);
        this.onClickItemSelect = this.onClickItemSelect.bind(this);
    }

    render(){

        return(<div className="filter-item" onClick={this.onClickItemSelect}>
             <img src={this.props.contact.imageUrl} alt={this.props.contact.name} />
                <div className="long-details">
                    <span className="name">{this.props.contact.name}</span>
                    <span className="email">{this.props.contact.email}</span>
                </div> 
        </div>)
    }

    onClickItemSelect(){
        console.log("Select Contact");
        if(this.props.onSelectContact){
            this.props.onSelectContact();
        }
    }
}