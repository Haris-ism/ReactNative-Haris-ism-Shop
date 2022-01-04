import React, { useEffect,useContext,useState } from 'react'
import {AccountContext} from '../context/Context'
import { useSelector, useDispatch } from 'react-redux';
import {userAct,firstNameAct,lastNameAct,balanceAct,imageAct,refreshAct,selectuser,selectfirstName,selectlastName,selectbalance,selectimage,selectrefresh} from '../Redux/Slicer'
import { StyleSheet, Text, View, Image, Button, FlatList,TouchableOpacity } from 'react-native'
import axios from 'axios';
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
    // const [user,setuser,firstName,setfirstName,lastName,setlastName,profile,setprofile,,setbalance,refresh,setrefresh]=useContext(AccountContext);
    const [totalPrice, setTotalPrice] = useState(0);
    const [product,setproduct]=useState([]);
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
                dispatch(userAct(data2));
                dispatch(firstNameAct(data2.firstName));
                dispatch(lastNameAct(data2.lastName));
                dispatch(balanceAct(data2.balance));
                dispatch(imageAct(data2.image));
            })
            .catch((err)=>{
                handleError(err)
            });
    };
    const GetDataProduct=()=>{
        client
            .get(`/buy`)
            .then((res)=>{
                const data2=res.data;
                setproduct(data2);
            })
            .catch((err)=>{
                handleError(err)
            });
    };
    useEffect(()=>{
        GetDataAccount()
        GetDataProduct()
        dispatch(refreshAct(false))
        console.log(staterefresh)
    },[staterefresh])
    // const { username } = route.params;
    const currencyFormat=(num)=> {
        return 'Rp ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      };

    const updateHarga =(price)=>{
        const temp = Number(price) + totalPrice;
        setTotalPrice(temp)
            
    }
    const pay=(bought)=>{
        const calculation = Number(statebalance)- Number(bought);
        client
            .put(`/Account/1`,{balance:calculation})
            .then((res)=>{
                console.log("res: ",res.data);
                GetDataAccount();
            })
            .catch((err)=>{
                handleError(err)
            });
            navigation.navigate("Home")
    }
    return (
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
            <View style={{flexDirection:'row', justifyContent:"flex-end",marginBottom:15}}>
                <View style={{marginRight:49}}>
                    <Text style={{fontSize:10, color:"black"}}>Total Price:</Text>
                    <Text style={{fontSize:12, fontWeight:'bold',color:"black"}}> {currencyFormat(totalPrice)}</Text>
                </View>
            </View>
            <View style={styles.content}>
                <FlatList
                    data={product}
                    numColumns={2}
                    renderItem={({item})=>(
                        <>
                            <TouchableOpacity onPress={()=>{
                                onSelectItem(item)
                            }}>
                                <View style={styles.box}> 
                                    <View style={styles.items}>
                                        <Image
                                        style={styles.images}
                                        source={{uri:item.image}}
                                        resizeMode='contain'
                                        />  
                                        <Text style={{color:"black"}}>{item.productName}</Text>
                                        <Text style={{color:"black"}}>{currencyFormat(Number(item.price))}</Text>
                                    </View>
                                    <Button
                                        color="#75a6bf"
                                        title="BUY"
                                        onPress={()=>updateHarga(item.price)}
                                    /> 
                                </View>
                                
                            </TouchableOpacity>
                        </>
                    )}
                />
                
            </View>
            <TouchableOpacity 
                style={styles.touch}
                onPress={()=>{
                    pay(totalPrice)
                }}
            >
                <Text style={{color:"white",textAlign:"center"}}>PAY</Text>
            </TouchableOpacity>
            
            
        </View>
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
    box:{
        padding:5
    },
    items:{
        width: 145,
        height: 150,
        marginBottom:5,
        alignItems:'center',
        borderRadius: 5,
        borderColor:'grey',
        backgroundColor:"white",
    },
    images:{
        flex:1,
        width:145
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
    homeMenu:{
        width:130,
        height:130,
        backgroundColor:"cyan",
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
    },
    content:{
        flex: 1,
        flexDirection:'row',
        justifyContent:"center",  
        backgroundColor:"#0685c7",
        paddingVertical:15,
        paddingHorizontal:25,
        marginHorizontal:25,
        borderRadius:20,
        
    }
        
})
