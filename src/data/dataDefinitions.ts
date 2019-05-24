export interface IContactDetails{
    imageUrl: string,
    name: string,
    email: string,
    contactId: string
}
export interface IContactCollection{
    [key:string]: IContactDetails
}
export interface IStoreState  {
    contactList: IContactCollection,
    selectedContacts:string[] //IDs of selected contacts
}
