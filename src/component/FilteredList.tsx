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
    onCloseFilterList: () => void,
    inputboxRef: any,
    positionLeft:number,
    positionTop:number
}

class FilteredList extends React.PureComponent<IFilteredListProps>{
    private filteredDivRef: any;
    private hideHandler: any;
    public static defaultProps = {
        selectedContacts: [],
        contactList: {},
        onSelectContact: (contactId: string) => { }
    }

    constructor(props: IFilteredListProps) {
        super(props);
        this.onSelectSuccess = this.onSelectSuccess.bind(this);
        this.filteredDivRef = React.createRef();
        this.hideMenuOnClickOutside = this.hideMenuOnClickOutside.bind(this);
        const hideClickHandler = this.hideMenuOnClickOutside;
        this.hideHandler = (ev: any) => {
            hideClickHandler(ev);
        }
        this.addDocumentClickHandler();
    }
    render() {

        const items = [];
        for (const contactIdKey in this.props.contactList) {
            if (this.props.selectedContacts!.indexOf(contactIdKey) === -1
                && (this.props.contactList[contactIdKey].name.indexOf(this.props.filterText) > -1)) {
                //TOOD: Filter here
                items.push(
                    <FilteredItem
                        contact={this.props.contactList[contactIdKey]}
                        key={contactIdKey}
                        onSelectContact={this.onSelectSuccess} />
                )
            }
        }
        if(items.length == 0){
            return "";
        }
        return (
            <div className="filtered-items"
            style={{left: this.props.positionLeft, top: this.props.positionTop}}
            ref={this.filteredDivRef}>
                {items}
            </div>);
    }

    onSelectSuccess(contactId: string) {
        this.props.onSelectContact!(contactId); 

    }
    addDocumentClickHandler() {
        document.addEventListener('click', this.hideHandler);
    }

    hideMenuOnClickOutside(ev: MouseEvent) { 
            if (!((this.filteredDivRef.current
                && this.isChildOf(ev.target,  this.filteredDivRef.current))
                || (this.props.inputboxRef
                    && this.props.inputboxRef.current
                    && this.isChildOf(ev.target,  this.props.inputboxRef.current)))) {
            console.log("Close menu", ev);
            this.props.onCloseFilterList();
        }
    }

    isChildOf(childObject:any, containerObject:any) {
        var returnValue = false;
        var currentObject;
      
        if (typeof containerObject === 'string') {
          containerObject = document.getElementById(containerObject);
        }
        if (typeof childObject === 'string') {
          childObject = document.getElementById(childObject);
        }
      
        currentObject = childObject.parentNode;
      
        while (currentObject) {
          if (currentObject === document.body) {
            break;
          }
      
          if (currentObject.id == containerObject.id) {
            returnValue = true;
            break;
          }
      
          // Move up the hierarchy
          currentObject = currentObject.parentNode;
        }
      
        return returnValue;
      }
    componentWillUnmount() {
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