import React from 'react';
import SplashScreen from 'react-native-splash-screen'
import Main from './page/index';
export default function App() {
  SplashScreen.hide();
  return (
    <>
      <Main/>
    </>

  );
}
