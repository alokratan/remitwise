import * as React from "react";
import { useEffect } from "react";
import { StyleSheet, Text, View, BlurView} from "react-native"
import { Pressable } from "native-base";
import Home from "../screens/bottomtabs/Home";

import Recipient from "../screens/bottomtabs/Recipient";
import Calculator from "../screens/bottomtabs/Calculator";
import Manage from "../screens/bottomtabs/Manage";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

function Bottomtabs() {
  return (
    <Tab.Navigator
      initialRouteName="home"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarActiveBackgroundColor: "#5521C2",
        tabBarInactiveBackgroundColor: "black",

        tabBarLabelStyle: {
          marginBottom: 14,
          fontSize: 12,
          fontWeight: "700",
        },
        tabBarStyle: {
          position: "absolute",
          height: 75,
        },
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          let rn = route.name;
          if (rn === "home") {
            iconName = focused ? "home" : "home-outline";
          } else if (rn === "calculate") {
            iconName = focused ? "calculator-sharp" : "calculator-outline";
          } else if (rn === "recipient") {
            iconName = focused ? "receipt" : "receipt-outline";
          } else if (rn === "managebottom") {
            iconName = focused ? "person" : "person-outline";
          }
          return <Ionicons name={iconName} size={24} color={color} />;
        },
      })}

      /* screenOptions={{
        tabBarActiveTintColor:'black',
        tabBarInactiveTintColor:'white',
         tabBarActiveBackgroundColor:'#FFC72C',
         tabBarInactiveBackgroundColor:'black',
         tabBarStyle:{
             height:60, 
         },
        // tabBarBadge:1,
       }}*/
    >
      <Tab.Screen
        name="home"
        options={{
          title: "Home",
          headerShown:false,
          headerTintColor: 'white', // Set the text color to white
          headerStyle: {
            backgroundColor: '#5521C2', // Set your desired color here
          },
          headerRight: () => (
            <Pressable
            onPress={()=>alert("notification screen")}
            paddingRight={4}
            >
              <Ionicons
              name="notifications"
              size={24}
              color="white"
              />
            </Pressable>  
            // <FontAwesome
            //   name="smile-o" // Replace with the name of your desired FontAwesome icon
            //   size={24}
            //   color="white"
            //   style={{ marginRight: 10 }}
            //   onPress={() => {
            //     // Define the action you want when the icon is pressed
            //   }}
            // />
          ),
          // headerShown: false,
        }}
        component={Home}
      />
      <Tab.Screen
        name="calculate"
        options={{
          title: "Calculator",
          headerTintColor: 'white', 
          headerStyle: {
            backgroundColor: '#5521C2', // Set your desired color here
          }
        }}
       
        component={Calculator}
      />

    
      <Tab.Screen
        name="recipient"
        options={{
          title: "Order Status",
          headerTintColor: 'white', // Set the text color to white
          headerStyle: {
            backgroundColor: '#5521C2', // Set your desired color here
          }
          // tabBarBadge:10,
        }}
        component={Recipient}
      />
        <Tab.Screen
        name="managebottom"
        options={{
          title: "Manage",
          headerShown:false,
          headerTintColor: 'white', // Set the text color to white
          headerStyle: {
            backgroundColor: '#5521C2', // Set your desired color here
          },
          
          // headerShown: false,
        }}
        
        component={Manage}
      />
    </Tab.Navigator>
  );
}

export default Bottomtabs;
