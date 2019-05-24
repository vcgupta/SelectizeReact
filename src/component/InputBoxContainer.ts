import { IStoreState } from "../data/dataDefinitions";
import InputBox, { IInputBoxProps } from "./InputBox";
import {initialState} from '../data/Reducers';
import { connect } from "react-redux";
 


function mapStateToProps(state: IStoreState = initialState, ownProps: IInputBoxProps) 
{
    const {selectedContacts} =  state  ;
    return  {selectedContacts};
}

//function mapDispatchToProps(dispatch: Dispatch<IAction>, ownProps: IHomePageProps){
    // return {
    //     setCategories: function(categories: ICategories[]) {
    //         dispatch(setCategories(categories));
    //     },
    //     setRecipes: function (recipes: IRecipes[]) {
    //         dispatch(setRecipes(recipes));
    //     },
    // }
//}

export default connect(mapStateToProps, null)(InputBox);