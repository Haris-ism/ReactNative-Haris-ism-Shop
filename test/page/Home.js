import React, { useEffect,useContext,useState } from 'react'
import {AccountContext} from '../context/Context'
import axios from 'axios';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableOpacityComponent, Button } from 'react-native'
export default function Home({route, navigation}) {
const [refresh,setrefresh]=useState(true);
const currencyFormat=(num)=> {
    return 'Rp ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  };
const [user,setuser,firstName,setfirstName,lastName,setlastName,profile,setprofile,balance,setbalance]=useContext(AccountContext);

const baseURL ="https://616a426c16e7120017fa0ef1.mockapi.io";
const client = axios.create({
    baseURL:baseURL,
});
const GetDataAccount=()=>{
    client
        .get(`/Account/1`)
        .then((res)=>{
            const data2=res.data;
            // console.log("res Account: ",data2);
            setuser(data2);
            setfirstName(data2.firstName);
            setlastName(data2.lastName);
            setbalance(data2.balance);
            setprofile(data2.image);
        })
        .catch((err)=>{
            handleError(err)
        });
};

useEffect(()=>{
    GetDataAccount()
    setrefresh(false)
},[refresh])
return (
    <View style={styles.container}>
        <View style={styles.header}>
            <View>
                <Image
                    source={profile ? {uri: profile } : null}
                    style={styles.profilePic}
                />
            </View>
            <View style={styles.profileInfo}>
                    <Text style={{fontSize:25,color:"white"}}>{firstName}</Text>
                    <Text style={{fontSize:25,color:"white"}}>{lastName}</Text>
                    <Text style={{color:"white"}}>Balance: {currencyFormat(Number(balance))}</Text>
            </View>
        </View>
        <View style={styles.content}> 
            <View style={{flexDirection:'row', justifyContent:"space-around"}}>
                <TouchableOpacity onPress={()=>{
                    navigation.navigate("Buy")
                }}>
                    <View style={styles.items} >
                        <MaterialCommunityIcons name="cart-arrow-down" size={50} color="white" />
                        <Text style={{color:"white"}}>BUY</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    navigation.navigate("Sell")
                }}>
                    <View style={styles.items}>
                    <MaterialCommunityIcons name="cart-arrow-up" size={50} color="white" />
                        <Text style={{color:"white"}}>SELL</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row', justifyContent:"space-around",marginTop:25}}>
                <TouchableOpacity onPress={()=>{
                    navigation.navigate("Account")
                }}>
                    <View style={styles.items}>
                    <MaterialCommunityIcons name="account-circle" size={50} color="white" />
                    <Text style={{color:"white"}}>ACCOUNT</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    navigation.popToTop()
                }}>
                    <View style={styles.items}>
                    <MaterialCommunityIcons name="logout" size={50} color="white" />
                        <Text style={{color:"white"}}>LOGOUT</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
        
    </View>
)
}

const styles = StyleSheet.create({
container:{
    flex: 1
},  
content:{
    backgroundColor:"#0685c7",
    paddingVertical:40,
    paddingHorizontal:15,
    marginHorizontal:25,
    marginTop:29,
    borderRadius:20,
},
images:{
    flex:1,
    width:"100%"
},
profilePic:{
    borderRadius:75,
    width:110,
    height:110,
    marginLeft:25
},
profileInfo:{
    marginRight:25
},
items:{
    width:130,
    height:130,
    backgroundColor:"#007499",
    borderRadius:20,
    justifyContent:"center",
    alignItems:"center"
},
title:{
    alignItems:"center"
},
header:{
    flexDirection:'row',
    justifyContent:"space-between",
    marginBottom:20,
    marginTop:25,
    backgroundColor:"#0685c7",
    marginHorizontal:25,
    borderRadius:20,
    paddingTop:15,
    paddingBottom:15
}
    
})