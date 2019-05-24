import * as React from 'react';
import { IContactCollection } from '../data/dataDefinitions';
import FilteredItem from './FilteredItem';
import { initialState } from '../data/Reducers';
import { IStoreState } from '../data/dataDefinitions';
import { connect } from 'react-redux';
import { IAction, addToSelectedList } from '../data/Actions';
import { Dispatch } from 'redux';
import './FilteredList.scss';

export interface IFilteredListProps {
    filterText: string,
    contactList?: IContactCollection,
    selectedContacts?: string[],
    onSelectContact?: (contactId: string) => void,
    onCloseFilterList: () => void
}

class FilteredList extends React.PureComponent<IFilteredListProps>{
    private filteredDivRef: any;
    private hideHandler :any;
    public static defaultProps = {
        selectedContacts: [],
        contactList: {},
        onSelectContact: (contactId: string) => { }
    }

    constructor(props: IFilteredListProps) {
        super(props);
        this.addDocumentClickHandler();
        this.onSelectSuccess = this.onSelectSuccess.bind(this);
        this.filteredDivRef = React.createRef();
        this.hideMenuOnClickOutside =  this.hideMenuOnClickOutside.bind(this);
        const hideClickHandler = this.hideMenuOnClickOutside;
        this.hideHandler = (ev:any)=>{
            hideClickHandler(ev);
        } 
    }
    render() {

        const items = [];
        for (const contactIdKey in this.props.contactList) {
            if (this.props.selectedContacts!.indexOf(contactIdKey) === -1) {
                //TOOD: Filter here
                items.push(
                    <FilteredItem
                        contact={this.props.contactList[contactIdKey]}
                        key={contactIdKey}
                        onSelectContact={this.onSelectSuccess} />
                )
            }
        }
        return (
            <div className="filtered-items" ref={this.filteredDivRef}>
                {items}
            </div>);
    }

    onSelectSuccess(contactId: string) {
        this.props.onSelectContact!(contactId);
        //console.log("Close the list here");
        
    }
    addDocumentClickHandler() {
       
        document.addEventListener('click', this.hideHandler);
    }

    hideMenuOnClickOutside(ev: MouseEvent) {
        if (this.filteredDivRef && !this.filteredDivRef.contains(ev.target)) {
            console.log("Close menu", ev);
            this.props.onCloseFilterList();
        }
    }
    componentWillUnmount(){
        document.removeEventListener('click', this.hideHandler);
    }
}

//TODO: Move to separate file
function mapStateToProps(state: IStoreState = initialState, ownProps: IFilteredListProps) {
    return {
        contactList: state.contactList,
        selectedContacts: state.selectedContacts
    }
}

function mapDispatchToProps(dispatch: Dispatch<IAction>, ownProps: IFilteredListProps) {
    return {
        onSelectContact: function (contactId: string) {
            dispatch(addToSelectedList(contactId));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilteredList);