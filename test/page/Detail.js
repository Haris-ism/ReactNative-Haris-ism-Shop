import React from 'react'
import { useState } from 'react'
import { StyleSheet, Text, View,TouchableOpacity, Image } from 'react-native'
export default function Home({route, navigation}) {
    const [totalPrice, setTotalPrice] = useState(0);
    const { productName,price,description,image } = route.params;
    const currencyFormat=(num)=> {
        return 'Rp ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      };

    const updateHarga =(price)=>{
        console.log("UpdatePrice : " + price);
        const temp = Number(price) + totalPrice;
        console.log(temp)
        setTotalPrice(temp)
            
    }
    return (
        <>
        <View style={styles.container}>
            <View style={styles.imageDetail}>
                <Image
                    source={{uri:image}}
                    style={styles.images}
                    resizeMode='contain'
                />
            </View>
            <View style={styles.title}>
                <Text style={{fontSize:45,color:"black"}}>{productName}</Text>
                <Text style={{color:"black"}}>{currencyFormat(Number(price))}</Text>
            </View>
            
            <View style={styles.description}>
                <Text>{description}</Text>
            </View>
        </View>
        
        <TouchableOpacity 
                style={styles.touch}
                onPress={()=>{
                    navigation.pop(1)
                }}
            >
                <Text style={{color:"white",textAlign:"center"}}>BACK</Text>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },  
    content:{
        width: 150,
        height: 220,        
        margin: 5,
        borderWidth:1,
        alignItems:'center',
        borderRadius: 5,
        borderColor:'grey',
        backgroundColor:"aqua",
    },
    touch:{
        backgroundColor:"#0685c7",
        padding:10,
        borderRadius: 15,
        marginHorizontal:25,
        marginTop:10,
        marginBottom:5
    },
    images:{
        flex:1,
        borderRadius:20
    },
    profilePic:{
        borderRadius:75,
        width:110,
        height:110,
        marginLeft:49
    },
    profileInfo:{
        marginRight:49
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
        marginHorizontal:49
    },
    header:{
        flexDirection:'row',
        justifyContent:"space-between",
        marginBottom:20,
        marginTop:49
    },
    imageDetail:{
        marginHorizontal:25,
        height:200
    },
    description:{
        marginHorizontal:25,
        backgroundColor:"#0685c7",
        borderRadius:15,
        padding:10
    }
        
})

