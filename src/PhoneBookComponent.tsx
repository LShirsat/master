import * as React from 'react';
import {
    Stack, StackItem, IStackTokens, SearchBox, ISearchBoxStyles, DetailsListLayoutMode,
    IColumn, DetailsList, Selection, SelectionMode, Icon, Label, CheckboxVisibility, IIconStyles, FontWeights, TextField, PrimaryButton, Modal, Dialog, DialogFooter, DialogType, DefaultButton
} from '@fluentui/react';
import ContactDetails from './models/ContactDetail'

interface IState {
    items: ContactDetails[];
    selectionDetails: any;
    selectedContact: any;
    searchText: string;
    hideDialog: boolean;
    isLoadSearchData: boolean;
}

const StackTokens: Partial<IStackTokens> = { childrenGap: 10 };
const iconStyles: IIconStyles = {
    root: {
        color: '#0078D4',
        fontWeight: FontWeights.bold,
        cursor: "pointer",
        fontSize: "15px",
        padding: '5px 0px',
        float: 'right',
        marginRight: '20px'
    },
};

const dialogContentProps = {
    type: DialogType.normal,
    title: 'Do you really want to call?',
    closeButtonAriaLabel: 'Close',
    subText: '',
};

export class PhoneBookComponent extends React.Component<{}, IState> {
    private _selection: Selection;
    private _allItems: ContactDetails[];
    private _columns: IColumn[];
    private _filteredItems: ContactDetails[];

    constructor(props: {}) {
        super(props);

        this._selection = new Selection({
            onSelectionChanged: () => this.setState({ selectionDetails: this._selection.getSelection() }),
        });

        this._allItems = this.bindData();
        this._filteredItems = [];

        this._columns = [
            {
                key: 'column1',
                name: 'Contact Name',
                fieldName: 'name',
                minWidth: 100,
                maxWidth: 285,
                isResizable: true,
                onRender: (item) => (
                    <div>
                        <Label className="contactName">{item.FirstName + ' ' + item.LastName}</Label>
                        <Label className="phoneNumber">{item.PhoneNumber}</Label>
                        <Label className="storeNumber">Store: #{item.StoreNumber}</Label>
                    </div>
                )
            },
            {
                key: 'column2',
                name: '',
                fieldName: '',
                minWidth: 40,
                maxWidth: 40,
                isResizable: false,
                isIconOnly: true,
                onRender: (item) => (
                    <Icon iconName="Phone" onClick={this.makeCall} styles={iconStyles} />
                )
            }
        ];

        this.state = {
            items: this._allItems,
            selectionDetails: this._selection.getSelection(),
            selectedContact: {},
            searchText: '',
            hideDialog: true,
            isLoadSearchData: false
        };
    }

    bindData() {
        var items: ContactDetails[] = [];
        items.push({
            FirstName: "Laxman",
            LastName: "Shirsat",
            PhoneNumber: "+1-424-333-7474",
            StoreNumber: '2313'
        });
        items.push({
            FirstName: "Larry",
            LastName: "Thomas",
            PhoneNumber: "+1-424-333-2701",
            StoreNumber: '2313'
        });
        items.push({
            FirstName: "Prashant",
            LastName: "Soni",
            PhoneNumber: "+1-424-333-9229",
            StoreNumber: '2314'
        });
        return items;
    }

    _onChangeSearchText = (text: any): void => {
        this.setState({
            searchText: text,
        });
    };

    _onSearchButonClick = () => {
        let searchText = this.state.searchText;
        let filteredItems = this.getSearchData(searchText, this._allItems);
        this.setState({ items: filteredItems , isLoadSearchData: true });
        this._filteredItems = filteredItems;
    }

    _onChangeFilterText = (text: any): void => {
        let filteredData = this.getSearchData(text, this._filteredItems);
        this.setState({
            items: filteredData,
        });
    };

    getSearchData = (searchText: string, filteredData: ContactDetails[]) => {
        searchText = searchText.toLowerCase();
        return searchText ? filteredData.filter(i => (i.FirstName + i.LastName + i.PhoneNumber + i.StoreNumber).toLowerCase().indexOf(searchText) > -1) : filteredData
    }

    makeCall = () => {
        if (this.state.selectionDetails !== undefined && this.state.selectionDetails.length > 0) {
            this.setState({ hideDialog: false });
            dialogContentProps.subText = this.state.selectionDetails[0].PhoneNumber;
        }
    }

    _dialogYesClick = () => {
        console.log('_dialogYesClick');
        this.setState({ selectedContact: this.state.selectionDetails[0] });
        console.log(this.state.selectedContact);
    }

    _dialogNoClick = () => {
        this.setState({ hideDialog: true });
    }

    public render() {
        const items = this.state.items;
        return (
            <div>
                <div className="ms-Grid">
                    <Stack horizontal tokens={StackTokens} className="ms-Grid-row">
                        <StackItem className="ms-Grid-col ms-sm3 ms-md3 ms-lg3">
                            <Label>Search Users</Label>
                        </StackItem>
                    </Stack>
                    <Stack horizontal tokens={StackTokens} className="ms-Grid-row bottomMargin">
                        <StackItem className="ms-Grid-col ms-sm3 ms-md3 ms-lg3">
                            <Stack horizontal tokens={StackTokens}>
                                <div style={{ width: '80%' }} >
                                    <TextField value={this.state.searchText ?? ''} onChange={(_, newValue) => this._onChangeSearchText(newValue)}
                                        placeholder="Enter search text here" />
                                </div>
                                <div>
                                    <PrimaryButton onClick={this._onSearchButonClick} text="Search" />
                                </div>
                            </Stack>
                        </StackItem>
                    </Stack>
                </div>

                {(this.state.isLoadSearchData &&
                    <div className="ms-Grid">
                        <Stack tokens={StackTokens} className="ms-Grid-row bottomMargin">
                            <StackItem className="ms-Grid-col ms-sm3 ms-md3 ms-lg3">
                                <Label>Filter</Label>
                                <SearchBox
                                    // styles={searchBoxStyles}
                                    placeholder="Search"
                                    onEscape={ev => {
                                        console.log('Custom onEscape Called');
                                    }}
                                    onClear={ev => {
                                        console.log('Custom onClear Called');
                                    }}
                                    onChange={(_, newValue) => this._onChangeFilterText(newValue)}
                                    onSearch={newValue => console.log('SearchBox onSearch fired: ' + newValue)}
                                />
                            </StackItem>
                        </Stack>
                        <Stack tokens={StackTokens} className="ms-Grid-row">
                            <StackItem className="ms-Grid-col ms-sm3 ms-md3 ms-lg3">
                                <DetailsList
                                    items={items}
                                    columns={this._columns}
                                    setKey="set"
                                    layoutMode={DetailsListLayoutMode.fixedColumns}
                                    selection={this._selection}
                                    selectionPreservedOnEmptyClick={true}
                                    checkboxVisibility={CheckboxVisibility.hidden}
                                    selectionMode={SelectionMode.single}
                                    isHeaderVisible={false}
                                    className="detailsList"
                                />
                            </StackItem>
                        </Stack>
                    </div>
                )}
                <Dialog
                    hidden={this.state.hideDialog}
                    onDismiss={this._dialogNoClick}
                    dialogContentProps={dialogContentProps}
                >
                    <DialogFooter>
                        <DefaultButton onClick={this._dialogNoClick} text="No" />
                        <PrimaryButton onClick={this._dialogYesClick} text="Yes" />
                    </DialogFooter>
                </Dialog>

            </div>
        )
    }
}

export default PhoneBookComponent;