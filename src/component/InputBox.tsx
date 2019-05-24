import * as React from 'react';
import './InputBox.scss';
import { IContactDetails } from '../data/dataDefinitions';
import FilteredList from './FilteredList';
import SelectedList from './SelectedList';

export interface IInputBoxState {
    filterText: string,
    isFilterListVisible: boolean
}

export interface IInputBoxProps {
    selectedContacts: string[]
}

export default class InputBox extends React.Component<IInputBoxProps, IInputBoxState> {
    private inputRef: any; private filterListRef: any;
    public static defaultProps: IInputBoxProps = {
        selectedContacts: []
    }
    constructor(props: IInputBoxProps) {
        super(props);
        this.handleClickOnSelectionDiv = this.handleClickOnSelectionDiv.bind(this);
        this.closeFilterList = this.closeFilterList.bind(this);
        this.inputRef = React.createRef();
        this.filterListRef = React.createRef();
        this.state = {
            filterText: "",
            isFilterListVisible: false
        }
        this.onChangeSearchText = this.onChangeSearchText.bind(this);
        this.onFocusInSearchText = this.onFocusInSearchText.bind(this);
        this.onFocusOutSearchText = this.onFocusOutSearchText.bind(this);
    }

    render() {
        return (
            <div className="input-box" onClick={this.handleClickOnSelectionDiv}>
                {/* {contactDetailsList} */}
                <SelectedList />

                <input type="text" ref={this.inputRef}
                    onChange={this.onChangeSearchText}
                    onFocus={this.onFocusInSearchText}
                    onBlur={this.onFocusOutSearchText} />
                {
                    this.state.isFilterListVisible &&
                    <FilteredList ref={this.filterListRef}
                        filterText={this.state.filterText}
                        onCloseFilterList={this.closeFilterList} />
                }
            </div>
        )
    }

    closeFilterList() {
        console.log("Close the filter list now");
        this.setState({ isFilterListVisible: false });
    }

    onChangeSearchText(ev: React.ChangeEvent<HTMLInputElement>) {
        const val = (ev.currentTarget as HTMLInputElement).value;
        console.log("Filtering by: ", val);
        this.setState({ filterText: val });
        (ev.currentTarget as HTMLInputElement).width = (val.length * 15);
    }

    onFocusInSearchText(ev: any) {
        console.log("Focus in");
        this.setState({ isFilterListVisible: true });
    }
    onFocusOutSearchText(ev: any) {
        console.log("Focus out");
        //this.setState({ isFilterListVisible: false });
    }

    handleClickOnSelectionDiv() {
        this.inputRef.current.focus();
    }
}