import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CountryType } from "../components/CountryList";

interface likedType {
    liked:Array<CountryType>
}

const initialState:likedType ={
    liked:[],
}


export const LikeSLice = createSlice({
    name: "likes",
        initialState,
        reducers: {
           addLikes:(state, action:PayloadAction<CountryType>):void => {
            const index:number = state.liked.findIndex((item:CountryType) => item.name === action.payload.name);
            
            if(index === -1) {
                state.liked.push(action.payload);
            }else{
                state.liked.splice(index,1);
            }
           }
        }
});

export const {addLikes} = LikeSLice.actions;
