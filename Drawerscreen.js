import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react'
import Login from './screens/Login';

import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Register from './screens/Register';
import Verify from './screens/Verify';
import { useNavigation } from '@react-navigation/native';
import Bottomtabs from './screens/Bottomtabs'

  
const Drawer = createDrawerNavigator();
const navigation = useNavigation();

const Drawerscreen = () => {
  useEffect(() => {
    // Check if user is already logged in
    AsyncStorage.getItem('uid')
      .then((uid) => {
        if (uid) {
          // Redirect to home page
          console.log("autologin with help AS token.")
          navigation.navigate('bottomtabs');
        }
      })
      .catch((error) => {
        console.log('Error checking token:', error);
      });
  }, []);


    
  return (
    <Drawer.Navigator >
    <Drawer.Screen options={{ headerShown: false }} name="logins" component={Login} />
    <Drawer.Screen options={{ headerShown: false }} name="bottomtabs" component={Bottomtabs} />
    <Drawer.Screen options={{ headerShown: false }} name="registers" component={Register} />
    {/* <Drawer.Screen options={{ headerShown: false }} name="remitter" component={Remitter} /> */}
    <Drawer.Screen options={{ headerShown: false }} name="verify" component={Verify} />
   </Drawer.Navigator>
  )
}

export default Drawerscreen


