import * as React from 'react';
import { IContactDetails } from '../data/dataDefinitions';
import './FilteredItem.scss';

export interface IFilteredItemProps{
    contact: IContactDetails,
    onSelectContact: (contactId:string)=>void
}
export default class FilteredItem extends React.Component<IFilteredItemProps>{
    public static defaultProps: Partial<IFilteredItemProps> ={
        onSelectContact : (contactId:string)=>{}
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

    onClickItemSelect(event: any){
        console.log("Select Contact", this.props.contact.contactId);
        if(this.props.onSelectContact){
            this.props.onSelectContact(this.props.contact.contactId);
        }
    }
}