import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "./store";


const initialState={
    
        theme: window?.localStorage.getItem("theme") || "dark",
    
    
}

const themeSlice = createSlice({
    name :"theme",
    initialState,
    reducers:{
        setTheme(state,action){
            localStorage.setItem("theme", JSON.stringify(action.payload));

        },
    },
})

export default themeSlice.reducer;

export function setTheme(value){
    return (dispatch)=>{
        dispatch(themeSlice.actions.setTheme(value))
    }
}