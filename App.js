import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import Drawerscreen from "./Drawerscreen";

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Drawerscreen />
      </NavigationContainer>
    </NativeBaseProvider>
  );
};
export default App;
