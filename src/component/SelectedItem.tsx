import * as React from 'react';
import { IContactDetails } from '../data/dataDefinitions';

export interface ISelectedItemProps {
    contact: IContactDetails,
    onRemoveSelectedContact: (contactid: string) => void
}

export default class SelectedItem extends React.Component<ISelectedItemProps>{

    render() {
        const onRemoveButtonClick = () => {
            this.props.onRemoveSelectedContact(this.props.contact.contactId);
        }

        return (
            <div className="selected-items" >
                <img src={this.props.contact.imageUrl} alt={this.props.contact.name} />
                <div className="short-details">
                    <span>{this.props.contact.name}</span>
                </div>
                <span className="remove" onClick={onRemoveButtonClick}>x</span>
            </div>
        )
    }
}