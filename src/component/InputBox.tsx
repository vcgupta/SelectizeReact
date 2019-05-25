import * as React from 'react';
import './InputBox.scss';
import FilteredList from './FilteredList';
import SelectedList from './SelectedList';

export interface IInputBoxState {
    filterText: string,
    isFilterListVisible: boolean,
    filterListLeftPosition: number,
    filterListTopPosition: number,
}

export interface IInputBoxProps {
    selectedContacts: string[]
}

export default class InputBox extends React.Component<IInputBoxProps, IInputBoxState> {
    private inputRef: any; private inputBoxRef: any;
    private filterListRef: any;
    public static defaultProps: IInputBoxProps = {
        selectedContacts: []
    }
    constructor(props: IInputBoxProps) {
        super(props);
        this.handleClickOnSelectionDiv = this.handleClickOnSelectionDiv.bind(this);
        this.closeFilterList = this.closeFilterList.bind(this);
        this.inputRef = React.createRef();
        this.inputBoxRef = React.createRef();
        this.filterListRef = React.createRef();
        this.state = {
            filterText: "",
            isFilterListVisible: false,
            filterListLeftPosition: 0,
            filterListTopPosition: 0
        }
        this.onChangeSearchText = this.onChangeSearchText.bind(this);
        this.onFocusInSearchText = this.onFocusInSearchText.bind(this);
        this.onFocusOutSearchText = this.onFocusOutSearchText.bind(this);

    }

    render() {
        return (
            <div ref={this.inputBoxRef}
                className="input-box"
                onClick={this.handleClickOnSelectionDiv}>

                <SelectedList />

                <input type="text" ref={this.inputRef}
                    style={{ width: this.getWidth() }}
                    onChange={this.onChangeSearchText}
                    onFocus={this.onFocusInSearchText}
                    onBlur={this.onFocusOutSearchText} />
                {
                    this.state.isFilterListVisible &&
                    <FilteredList ref={this.filterListRef}
                        positionLeft={this.state.filterListLeftPosition}
                        positionTop={this.state.filterListTopPosition}
                        filterText={this.state.filterText}
                        onCloseFilterList={this.closeFilterList}
                        inputboxRef={this.inputBoxRef} />
                }
            </div>
        )
    }

    closeFilterList() {
        this.setState({ isFilterListVisible: false });
    }

    getWidth() {
        return this.state.filterText.length * 30 + 4;
    }

    onChangeSearchText(ev: React.ChangeEvent<HTMLInputElement>) {
        const val = (ev.currentTarget as HTMLInputElement).value;
        this.setState({ filterText: val });
    }

    onFocusInSearchText(ev: any) {
        //const { left, top } = ev.currentTarget.getBoundingClientRect();
        //TODO: Currectly set the position
        const left = 0, top=this.inputBoxRef.current.getBoundingClientRect().height;
        this.setState({
            isFilterListVisible: true,
            filterListLeftPosition: left,
            filterListTopPosition: top+40
        });
    }
    onFocusOutSearchText(ev: any) {
        console.log("Focus out");
    }

    handleClickOnSelectionDiv() {
        this.inputRef.current.focus();
    }
}