
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import ManageBottom from './managenested/ManageBottom';
import ForgotPassword from './managenested/ForgotPassword';
import UploadDocument from './managenested/Uploaddocument';

const ManageStack = createNativeStackNavigator();
const Manage = () => {
  return (
    <ManageStack.Navigator>
        <ManageStack.Screen options={
          {
            headerTintColor: 'white', // Set the text color to white
            headerStyle: {
              backgroundColor: '#5521C2', // Set your desired color here
            },      
          }
        }  name="Manage" component={ManageBottom} />
       <ManageStack.Screen options={{ headerShown: false }}  name="uploaddocument" component={UploadDocument} />
       <ManageStack.Screen options={{ headerShown: false }}  name="forgotpd" component={ForgotPassword} />
    </ManageStack.Navigator>
  
  )
}

export default Manage

