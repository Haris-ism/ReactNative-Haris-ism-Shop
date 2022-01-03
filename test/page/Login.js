import React, { useState } from "react";
import { Image, StyleSheet,TouchableOpacity, Text, View, TextInput,Dimensions } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
export default function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);

  const submit = () => {
    if (username=="vivaldi" && password=="123123" && isError==false) {
      navigation.navigate("MainApp")
    }
  };

  return (
    <KeyboardAwareScrollView>
    <View style={styles.container}>
      
      <View style={styles.content}>
        <View style={{alignItems:"center"}}>
          <View style={styles.imageContainer}>
            <Image
                style={styles.image}
                source={require('../assets/icon.png')}
            >
            </Image>
          </View>
        </View>
        <Text style={styles.title}>HARIS-ISM SHOP</Text>
        <View style={styles.input}>
          <TextInput
            style={styles.box}
            placeholder="Username"
            value={username}
            autoFocus = {true}
            onChangeText={(value)=>setUsername(value)}
          />
          <TextInput
            style={styles.box}
            secureTextEntry={true}
            placeholder="Password"
            value={password}
            autoFocus = {true}
            onChangeText={(value)=>setPassword(value)}
          />
          <TouchableOpacity 
            style={styles.touch}
            onPress={submit}
          >
            <Text style={{color:"white",textAlign:"center"}}>LOGIN</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height:Dimensions.get("window").height,
    backgroundColor:"#0685c7",
  },
  input:{
    marginTop:30
  },
  imageContainer:{
    top:-80,
    borderRadius:75,
    width:110,
    elevation:10
  },
  image:{
    borderRadius:75,
    width:110,
    height:110,
  },
  touch:{
    backgroundColor:"#0685c7",
    padding:10,
    borderRadius: 15,
    marginHorizontal:25,
    marginTop:15,
  },
  content:{
    backgroundColor:"white",
    paddingTop:25,
    paddingBottom:"100%",
    paddingHorizontal:25, 
    marginTop:"40%",
    borderRadius:50,
  },
  box:{
    borderWidth: 1,
    borderColor:"#c9bfb5",
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal:25,
    paddingHorizontal: 10,
    color:"black"
  },
  title:{
    textAlign:"center",
    fontSize: 20,
    marginTop:-30,
    color:"black"
  }
});
