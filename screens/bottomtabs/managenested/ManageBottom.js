import React, { useEffect, useCallback, useState } from "react";
import {
  Box,
  Button,
  Center,
  HStack,
  Heading,
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  VStack,
} from "native-base";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid, RefreshControl } from "react-native";
// import { viewregistervin } from "../../../userapi";
import { useFocusEffect } from "@react-navigation/native";
const ManageBottom = ({ navigation }) => {
  const [openmodalog, setOpenmodalog] = useState(false);
  const [userdata, setUserdata] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // useFocusEffect(
  //   useCallback(() => {
  //     // const value= AsyncStorage.get('userdata');
  //     // console.log(value);
  //   }, [])
  // );
  // console.log("hi",viewregistervin());

  const asyncfun =async ()=>{
    const yourname = await AsyncStorage.getItem('userdata');
    console.log(yourname);
    setUserdata(yourname);
    return yourname;
  };


  useEffect(()=>{
    
    onRefresh();
  },[])
  
  const onRefresh = async () => {
    setRefreshing(true);
    asyncfun();
    setRefreshing(false);
  };

  setTimeout(() => {
    // onRefresh();
    asyncfun();
    console.log("refresh")
  }, 2000);

  const logoutfunct = async () => {
    try {
      // onRefresh();
      await AsyncStorage.clear();
      ToastAndroid.show("Logout Successfully...", 2000);
      console.log("asyncstorage clear.");
      setOpenmodalog(false);
      navigation.navigate("home");
      navigation.navigate("logins");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor="#5521C2"
        barStyle="light-content"
      />
      <Modal isOpen={openmodalog} onClose={() => setOpenmodalog(false)}>
        <Box bg="white" w="80%">
          <Modal.Header shadow={7} bg="#5521C2">
            <Heading color="white">LOGOUT</Heading>
          </Modal.Header>

          <Text fontSize={17} marginY={10} paddingX={3}>
            Are you sure you want to logout?
          </Text>

          <Modal.Footer>
            <HStack space={4}>
              <Button
                onPress={() => setOpenmodalog(false)}
                _pressed={{
                  bg: "#0002",
                }}
                bg="gray.300"
                color="black"
              >
                <Text>Cancel</Text>
              </Button>
              <Button
                onPress={logoutfunct}
                _pressed={{
                  bg: "black",
                }}
                bg="#5521C2"
              >
                <Text color="white">Logout</Text>
              </Button>
            </HStack>
          </Modal.Footer>
        </Box>
      </Modal>
      <Box flex={1} safeAreaTop bg="white" justifyContent={"space-between"}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <VStack paddingX={5} space={5} pt="20%">
            <Center w="full" marginBottom={4}>
              <Center w={24} marginBottom={10} h={24} rounded={100} bg="#0001">
                <AntDesign name="idcard" size={54} color="black" />
              </Center>
              <Heading textTransform={'capitalize'} color="#5521C2" fontSize={"3xl"}>
            {userdata}
              </Heading>
            </Center>

            <Pressable
              marginTop={10}
              bg="gray.100"
              rounded={2}
              padding={3}
              shadow={1}
              onPress={() => navigation.navigate("uploaddocument")}
              _pressed={{
                bg: "#0001",
                shadow: -1,
              }}
            >
              <HStack justifyContent={"space-between"} alignItems={"center"}>
                <Text fontSize={18} bold>
                  Upload Doucuments
                </Text>
                <MaterialCommunityIcons
                  name="file-upload-outline"
                  size={24}
                  color="black"
                />
              </HStack>
            </Pressable>
            <Pressable
              _pressed={{
                bg: "#0001",
                shadow: -1,
              }}
              onPress={() => navigation.navigate("forgotpd")}
              marginTop={4}
              bg="gray.100"
              shadow={1}
              rounded={2}
              padding={3}
            >
              <HStack justifyContent={"space-between"} alignItems={"center"}>
                <Text fontSize={18} bold>
                  Forgot Password
                </Text>
                <MaterialCommunityIcons
                  name="form-textbox-password"
                  size={24}
                  color="black"
                />
              </HStack>
            </Pressable>
          </VStack>
        </ScrollView>
        <Button
          onPress={() => setOpenmodalog(true)}
          _pressed={{
            bg: "#0009",
          }}
          marginBottom={24}
          marginTop={10}
          rounded={10}
          marginX={10}
          bg="black"
        >
          <Text marginY={1} color="white" bold fontSize={20}>
            LOGOUT
          </Text>
        </Button>
      </Box>
    </>
  );
};

export default ManageBottom;
