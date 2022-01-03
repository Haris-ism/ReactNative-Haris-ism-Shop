import React, {useState,createContext,useEffect} from 'react';
import axios from 'axios';
export const AccountContext = createContext();

export const AccountProvider =({children})=>{
    const [user,setuser]=useState("");
    const [firstName,setfirstName]=useState("");
    const [lastName,setlastName]=useState("");
    const [balance,setbalance]=useState("");
    const [profile,setprofile]=useState("");
    const [refresh,setrefresh]=useState(true);
    const baseURL ="https://616ac5af16e7120017fa10ab.mockapi.io";
    const client = axios.create({
        baseURL:baseURL,
    });
    
    return (
        <AccountContext.Provider value={[user,setuser,firstName,setfirstName,lastName,setlastName,profile,setprofile,balance,setbalance,refresh,setrefresh]}>
            {children}
        </AccountContext.Provider>
    )
}
