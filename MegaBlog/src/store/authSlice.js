import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData : null ,
    status : false  ,        // status true if logged in otherwise false 
}

const authSlice = createSlice({
    initialState ,
    name : 'auth' ,

    reducers : {
        login : (state , action) => {
                 state.status = true ;
                 state.userData = action.payload
                } ,

        logout : (state) => {
                 state.status=  false ; 
                 state.userData = null
                 }
    }
})

export const {login , logout} = authSlice.actions ;
export default authSlice.reducer
