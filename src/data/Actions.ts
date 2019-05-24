import { IContactCollection } from "./dataDefinitions";
import { ADD_TO_SELECTED_LIST, REMOVE_FROM_SELECTED_LIST } from "./Constants";



export interface IAddToSelectedContactsAction {
    contactId: string,
    type: string
}

export interface IRemoveFromSelectedContactsAction {
    contactId: string,
    type: string
}


export type IAction = IAddToSelectedContactsAction | IRemoveFromSelectedContactsAction;

export function addToSelectedList(contactId: string): IAddToSelectedContactsAction {
    return {
        contactId,
        type: ADD_TO_SELECTED_LIST
    }
}

export function removeFromSelectedList(contactId: string): IRemoveFromSelectedContactsAction {
    return {
        contactId,
        type: REMOVE_FROM_SELECTED_LIST
    }
}
