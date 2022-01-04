import { configureStore } from "@reduxjs/toolkit";
import balanceReducer from './Slicer'

export default configureStore({
    reducer:{
        balance:balanceReducer
    }
})