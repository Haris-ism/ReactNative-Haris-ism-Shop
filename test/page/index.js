import React from 'react'
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Login from './Login'
import Home from './Home'
import Buy from './Buy'
import Sell from './Sell'
import Account from './Account'
import Detail from './Detail'
import {AccountProvider} from '../context/Context'
import store from '../Redux/store';
import { Provider } from 'react-redux';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
export default function index({route, navigation}) {
    return (
      <Provider store={store}>
       <AccountProvider>
       <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" >
            <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="MainApp" component={MainApp} options={{ headerShown: false }}/>
            <Stack.Screen name="Detail" component={Detail} options={{ headerShown: false }}/>          
        </Stack.Navigator>
      </NavigationContainer>
       </AccountProvider>
      </Provider>
    )
}
const MainApp=({route, navigation})=>(
  <Tab.Navigator 
    screenOptions={{
      tabBarActiveTintColor:"crimson",
      tabBarHideOnKeyboard:"true",
      tabBarStyle: { borderRadius: 30,margin:10,paddingVertical:7 },
    }}
  >
      <Tab.Screen name="Home" component={Home} options={{ 
        headerShown: false,
        tabBarIcon:({focused})=>{
          return focused 
          ? (<MaterialCommunityIcons name="home" size={24} color="crimson" />)
          : (<MaterialCommunityIcons name="home" size={24} color="black" />)
        }  
      }}/>
      <Tab.Screen name="Buy" component={Buy} options={{ 
        headerShown: false,
        tabBarIcon:({focused})=>{
          return focused 
          ? (<MaterialCommunityIcons name="cart-arrow-down" size={24} color="crimson" />)
          : (<MaterialCommunityIcons name="cart-arrow-down" size={24} color="black" />)
        } 
      }}/>
      <Tab.Screen name="Sell" component={Sell} options={{ 
        headerShown: false,
        tabBarIcon:({focused})=>{
          return focused 
          ? (<MaterialCommunityIcons name="cart-arrow-up" size={24} color="crimson" />)
          : (<MaterialCommunityIcons name="cart-arrow-up" size={24} color="black" />)
        } 
      }}/>
      <Tab.Screen name="Account" component={Account} options={{ 
        headerShown: false,
        tabBarIcon:({focused})=>{
          return focused 
          ? (<MaterialCommunityIcons name="account-circle" size={24} color="crimson" />)
          : (<MaterialCommunityIcons name="account-circle" size={24} color="black" />)
        } 
      }}/>
      
  </Tab.Navigator>
)
