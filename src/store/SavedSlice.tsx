import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CountryType } from "../components/CountryList";

interface SavedType {
    saved:Array<CountryType>
}

const initialState:SavedType ={
    saved:[],
}


export const SavedSlice = createSlice({
    name: "saved",
        initialState,
        reducers: {
           addSaves:(state, action:PayloadAction<CountryType>):void => {
            const index:number = state.saved.findIndex((item:CountryType) => item.name === action.payload.name);
            if(index === -1) {
                state.saved.push(action.payload);
            }else{
                state.saved.splice(index,1);
            }
           }
        }
});

export const {addSaves} = SavedSlice.actions;
