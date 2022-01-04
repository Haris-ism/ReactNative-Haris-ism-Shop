import {createSlice} from '@reduxjs/toolkit'

export const slice = createSlice({
    name:"balance",
    initialState:{
        user:true,
        firstName:"",
        lastName:"",
        balance:"",
        image:"",
        refresh:true
    },
    reducers:{
        userAct:(state,action)=>{
            state.user=action.payload;
        },
        firstNameAct:(state,action)=>{
            state.firstName=action.payload;
        },
        lastNameAct:(state,action)=>{
            state.lastName=action.payload;
        },
        balanceAct:(state,action)=>{
            state.balance=action.payload;
        },
        imageAct:(state,action)=>{
            state.image=action.payload;
        },
        refreshAct:(state,action)=>{
            state.refresh=action.payload;
        }

    }
})
export const {userAct,firstNameAct,lastNameAct,balanceAct,imageAct,refreshAct} = slice.actions;
export const selectuser =(state)=> state.balance.user;
export const selectfirstName =(state)=> state.balance.firstName;
export const selectlastName =(state)=> state.balance.lastName;
export const selectbalance =(state)=> state.balance.balance;
export const selectimage =(state)=> state.balance.image;
export const selectrefresh =(state)=> state.balance.refresh;
export default slice.reducer;