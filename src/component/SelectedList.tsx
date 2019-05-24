import * as React from 'react';
import { connect } from 'react-redux';
import { IStoreState, IContactCollection } from '../data/dataDefinitions';
import { initialState } from '../data/Reducers';
import SelectedItem from './SelectedItem';

export interface ISelectedListProps {
    contactList?: IContactCollection,
    selectedContacts?: string[],
}

class SelectedList extends React.Component<ISelectedListProps>{
    public static defaultProps = {

        contactList: {},
        selectedContacts: [],
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
    }
}


//TODO: Move to separate file
function mapStateToProps(state: IStoreState = initialState, ownProps: ISelectedListProps) {
    return {
        contactList: state.contactList,
        selectedContacts: state.selectedContacts
    }
}

export default connect(mapStateToProps, null)(SelectedList);