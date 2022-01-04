import React, { useEffect,useContext,useState } from 'react'
import {AccountContext} from '../context/Context'
import { useSelector, useDispatch } from 'react-redux';
import {userAct,firstNameAct,lastNameAct,balanceAct,imageAct,refreshAct,selectuser,selectfirstName,selectlastName,selectbalance,selectimage,selectrefresh} from '../Redux/Slicer'
import { StyleSheet,TouchableOpacity, Text, View, Image, TextInput} from 'react-native'
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
export default function Home({route, navigation}) {
    const baseURL ="https://616a426c16e7120017fa0ef1.mockapi.io";
    const client = axios.create({
        baseURL:baseURL,
    });
    const stateuser = useSelector(selectuser);
    const statefirstName = useSelector(selectfirstName);
    const statelastName = useSelector(selectlastName);
    const statebalance = useSelector(selectbalance);
    const stateimage = useSelector(selectimage);
    const staterefresh = useSelector(selectrefresh);
    const dispatch = useDispatch();
    // const [user,setuser,firstName,setfirstName,lastName,setlastName,profile,setprofile,balance,setbalance,refresh,setrefresh]=useContext(AccountContext);
    const [productName,setproductName]=useState("");
    const [price,setprice]=useState("");
    const [image,setimage]=useState("");
    const [description,setdescription]=useState("");
    const handleError=(err)=>{
        console.log("error status: ",err.message);
        console.log("error message: ",err.response.data);
    };
    const GetDataAccount=()=>{
        client
            .get(`/Account/1`)
            .then((res)=>{
                const data2=res.data;
                // console.log("res Account: ",data2);
                // dispatch(userAct(data2));
                dispatch(firstNameAct(data2.firstName));
                dispatch(lastNameAct(data2.lastName));
                dispatch(balanceAct(data2.balance));
                dispatch(imageAct(data2.image));
            })
            .catch((err)=>{
                handleError(err)
            });
    };
    const addProduct=(productName,price,image,description)=>{
        client
            .post(`/Account/1/product`,{productName,price,image,description})
            .then(
                client
                    .post(`/buy`,{productName,price,image,description})
                    .then(
                        setproductName(""),
                        setprice(""),
                        setimage(""),
                        setdescription("")
                    ).catch((err)=>{
                        handleError(err)
                    }),
            dispatch(userAct(true)),
            navigation.navigate("Account") 
            ).catch((err)=>{
                handleError(err)
            })
             
    }
    
    const submit=()=>{
        addProduct(productName,price,image,description);
        
    }
    useEffect(()=>{
        GetDataAccount()
    },[])
    // const { username } = route.params;
    const currencyFormat=(num)=> {
        return 'Rp ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      };
    return (
        <KeyboardAwareScrollView>
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Image
                        source={stateimage ? {uri: stateimage } : null}
                        style={styles.profilePic}
                    />
                </View>
                <View style={styles.profileInfo}>
                    <Text style={{fontSize:25,color:"white"}}>{statefirstName}</Text>
                    <Text style={{fontSize:25,color:"white"}}>{statelastName}</Text>
                    <Text style={{color:"white"}}>Balance: {currencyFormat(Number(statebalance))}</Text>
                </View>
            </View>
            <View style={styles.content}>
                <TextInput
                    style={styles.sell}
                    placeholder="Input Product"
                    value={productName}
                    onChangeText={(value)=>setproductName(value)}
                />
                <TextInput
                    style={styles.sell}
                    placeholder="Input Price"
                    value={price}
                    keyboardType="numeric"
                    onChangeText={(value)=>setprice(value)}
                />
                <TextInput
                    style={styles.sell}
                    placeholder="Input Image Link"
                    value={image}
                    onChangeText={(value)=>setimage(value)}
                />
                <TextInput
                    style={styles.sell}
                    placeholder="Input Description"
                    value={description}
                    onChangeText={(value)=>setdescription(value)}
                />
                

            </View>
            <TouchableOpacity 
                style={styles.touch}
                onPress={
                    submit
                }
            >
                <Text style={{color:"white",textAlign:"center"}}>SELL</Text>
            </TouchableOpacity>
            
        </View>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },  
    touch:{
        backgroundColor:"#0685c7",
        padding:10,
        borderRadius: 15,
        marginHorizontal:25,
        marginTop:10,
        marginBottom:5
    },
    content:{
        backgroundColor:"#0685c7",
        paddingVertical:40,
        paddingHorizontal:25,
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
    },
    sell:{
        borderWidth: 1,
        borderColor:"#c9bfb5",
        paddingVertical: 10,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
        }
        
})

