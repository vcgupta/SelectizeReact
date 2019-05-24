import * as React from 'react';
import './InputBox.scss';
import { IContactDetails } from '../data/dataDefinitions';
import FilteredList from './FilteredList';
import SelectedList from './SelectedList';

export interface IInputBoxState {
    filterText: string
}

export interface IInputBoxProps {
    selectedContacts: string[]
}

export default class InputBox extends React.Component<IInputBoxProps, IInputBoxState> {
    private inputRef: any;
    public static defaultProps: IInputBoxProps = {
        selectedContacts: []
    }
    constructor(props: IInputBoxProps) {
        super(props);
        this.handleClickOnSelectionDiv = this.handleClickOnSelectionDiv.bind(this);
        this.closeFilterList = this.closeFilterList.bind(this);
        this.inputRef = React.createRef();
        this.state = {
            filterText:""
        }
        this.onChangeSearchText = this.onChangeSearchText.bind(this);
    }

    render() {
        // const contactDetailsList = [this.selectedContact({
        //     contactId: "2dssd",
        //     email: "something@emails",
        //     imageUrl: "https://via.placeholder.com/50",
        //     name: "Your name here"
        // }), this.selectedContact({
        //     contactId: "2dssd",
        //     email: "something@emails",
        //     imageUrl: "https://via.placeholder.com/50",
        //     name: "Your name here 3"
        // })];
        return (
            <div className="input-box" onClick={this.handleClickOnSelectionDiv}>
                {/* {contactDetailsList} */}
                <SelectedList />
                <input type="text" ref={this.inputRef} onChange={this.onChangeSearchText} />
                <FilteredList filterText={this.state.filterText} onCloseFilterList={this.closeFilterList} />
            </div>
        )
    }

    // selectedContact(contact: IContactDetails) {
    //     return (

    //     )
    // }

    closeFilterList() {
        console.log("Close the filter list now");
    }

    onChangeSearchText(ev: React.ChangeEvent<HTMLInputElement>) {
        const val = (ev.currentTarget as HTMLInputElement).value;
        console.log("Filtering by: ", val);
        this.setState({ filterText:  val});
    }

    handleClickOnSelectionDiv() {
        this.inputRef.current.focus();
    }
}