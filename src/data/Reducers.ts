import { IStoreState } from "./dataDefinitions";
import { IAction, IAddToSelectedContactsAction, IRemoveFromSelectedContactsAction } from "./Actions";
import { ADD_TO_SELECTED_LIST, REMOVE_FROM_SELECTED_LIST } from "./Constants";
import ContactService from '../services/ContactService';

export const initialState: IStoreState = {
    contactList: {},
    selectedContacts:[]
}
//Temporarily get static data from COntactService. This should be fetched in App.tsx
ContactService.GetContacts().forEach(val =>{
    initialState.contactList[val.contactId] = val;
});

export function rootReducer(state = initialState, action:IAction) {
    if(action.type === ADD_TO_SELECTED_LIST){
        const myAction = action as IAddToSelectedContactsAction
        return {
            ...state,
            selectedContacts : [
                ...state.selectedContacts,
                myAction.contactId
            ]
        }
    }
    else if(action.type === REMOVE_FROM_SELECTED_LIST){
        const myAction = action as IRemoveFromSelectedContactsAction
        
        return {
            ...state,
            selectedContacts :
                state.selectedContacts.filter((val)=> val !== myAction.contactId)
            
        }
    }
    else{
        return state;
    }
}