import * as React from 'react';
import { connect } from 'react-redux';
import { IStoreState, IContactCollection } from '../data/dataDefinitions';
import { initialState } from '../data/Reducers';
import SelectedItem from './SelectedItem';
import './SelectedList.scss';
import { removeFromSelectedList, IAction } from '../data/Actions';
import { Dispatch } from 'redux';

export interface ISelectedListProps {
    contactList?: IContactCollection,
    selectedContacts?: string[],
    onRemoveSelectedContact?: (contactId:string)=>void
}

class SelectedList extends React.Component<ISelectedListProps>{
    public static defaultProps = {
        contactList: {},
        selectedContacts: [],
    }
    constructor(props: ISelectedListProps){
        super(props);
        this.onRemoveContact = this.onRemoveContact.bind(this);
    }
    render() {
        const SelectedContactListItem = this.props.selectedContacts!
            .map((contactId: string) => {
                return <SelectedItem
                    contact={this.props.contactList![contactId]}
                    key={contactId}
                    onRemoveSelectedContact={this.onRemoveContact} />
            });
        return <>
            {SelectedContactListItem}
        </>
    }

    onRemoveContact(contactId: string) {
        console.log("Remove contact with ID: ", contactId);
        if(this.props.onRemoveSelectedContact){
            this.props.onRemoveSelectedContact(contactId);
        }
    }
}


//TODO: Move to separate file
function mapStateToProps(state: IStoreState = initialState, ownProps: ISelectedListProps) {
    return {
        contactList: state.contactList,
        selectedContacts: state.selectedContacts
    }
}


function mapDispatchToProps(dispatch: Dispatch<IAction>, ownProps: ISelectedListProps) {
    return {
        onRemoveSelectedContact: function (contactId: string) {
            dispatch(removeFromSelectedList(contactId));
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SelectedList);