import React, { useEffect,useContext,useState } from 'react'
import {AccountContext} from '../context/Context'
import { StyleSheet, Text, View, Image,TouchableOpacity, FlatList, ScrollView} from 'react-native'
import axios from 'axios';
export default function Home({route, navigation}) {
    const baseURL ="https://616a426c16e7120017fa0ef1.mockapi.io";
    const client = axios.create({
        baseURL:baseURL,
    });
    const [product,setproduct]=useState([]);
    const [user,setuser,firstName,setfirstName,lastName,setlastName,profile,setprofile,balance,setbalance,refresh,setrefresh]=useContext(AccountContext);
    const handleError=(err)=>{
        console.log("error status: ",err.message);
        console.log("error message: ",err.response.data);
    };
    const onSelectItem=(item)=>{
        
        navigation.navigate("Detail",{
            productName:item.productName,
            price:item.price,
            description:item.description,
            image:item.image
          })
    }
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

    const GetDataProduct=()=>{
        client
            .get(`/Account/1/product`)
            .then((res)=>{
                const data2=res.data;
                // console.log("res: ",data2);
                setproduct(data2);
            })
            .catch((err)=>{
                handleError(err)
            });
    };
    useEffect(()=>{
        GetDataAccount()
        GetDataProduct()
        setrefresh(false)
    },[refresh])
    // const { username } = route.params;
    const currencyFormat=(num)=> {
        return 'Rp ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      };

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
                <Text style={styles.label}>First Name</Text>
                <Text style={styles.textBar}>{firstName}</Text>
                <Text style={styles.label}>Last Name</Text>
                <Text style={styles.textBar}>{lastName}</Text>
                <Text style={styles.label}>Items On Your Store</Text>
                <View style={styles.onSale}>
                    <FlatList
                        data={product}
                        numColumns={2}
                        keyExtractor={(item,index)=>`${item.id}-${index}`}
                        renderItem={({item})=>(
                            <>
                                <TouchableOpacity onPress={()=>{
                                    onSelectItem(item)
                                }}>
                                    
                                    <View style={styles.items}>
                                        <Image
                                            style={styles.images}
                                            source={{uri:item.image}}
                                            resizeMode='contain'
                                        />   
                                        <Text style={{color:"black"}}>{item.productName}</Text>
                                        <Text style={{color:"black"}}>{currencyFormat(Number(item.price))}</Text>    
                                                            
                                    </View>
                                </TouchableOpacity>
                            </>
                        )}
                    />
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
        flex:1,
        backgroundColor:"#0685c7",
        paddingTop:20,
        paddingBottom:30,
        paddingHorizontal:25,
        marginHorizontal:25,
        marginTop:29,
        borderRadius:20,
    },
    images:{
        flex:1,
        width:110,
        height:110
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
    title:{
        alignItems:"center",
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
    },
    items:{
        width: 120,
        height: 120,
        borderWidth:1,
        margin:12,
        alignItems:'center',
        borderRadius: 5,
        borderColor:'grey',
        backgroundColor:"#ffffff",
    },
    textBar:{
        borderWidth: 1,
        borderColor:"#c9bfb5",
        paddingVertical: 10,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
        color:"white"
    },
    onSale:{
        borderWidth: 1,
        borderColor:"#c9bfb5",
        paddingVertical: 10,
        borderRadius: 5,
        paddingHorizontal: 10,
        flex:1,
    },
    label:{
        color:"white"
    }
        
})

