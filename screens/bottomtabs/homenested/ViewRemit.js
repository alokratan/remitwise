import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import {
  Box,
  Text,
  Pressable,
  Center,
  StatusBar,
  HStack,
  Heading,
  Button,
  VStack,
  ScrollView,
  Modal,
} from "native-base";
import React, { useEffect, useState } from "react";
import { ToastAndroid, View, RefreshControl } from "react-native"; // Added RefreshControl
import { remitvin } from "../../../userapi";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ViewRemit = ({ navigation }) => {
  const [selectedremit, setSelectedremit] = useState("");
  const [selectremit, setSelectremit] = useState([]);
  const [select, setSelect] = useState(null);
  const [selectdata, setSelectdata] = useState([]);
  const [selectdata2, setSelectdata2] = useState();
  const [show, setShow] = useState(false);
  const [refreshing, setRefreshing] = useState(false); // Added refreshing state

  const onRefresh = async () => {
    setRefreshing(true);
    setSelect(null);

    try {
      const response = await remitvin();
      if (response && response.data) {
        console.log("All Remitters Fetch Successfully...")
        setSelectremit(response.data);
      }
    } catch (error) {
      console.error("Error fetching remitters:", error);
    }

    setRefreshing(false);
  };

  useEffect(() => {
    // Fetch remitters when the component mounts
    const fetchRemitters = async () => {
      try {
        const response = await remitvin();
        if (response && response.data) {
          console.log("All Remitters Fetch Successfully...")
          setSelectremit(response.data);
        }
      } catch (error) {
        console.error("Error fetching remitters:", error);
      }
    };
    fetchRemitters();
    
  }, []);

  const continuefn=()=>{
    
    console.log("Remitter id:",select)
    if(select){
      AsyncStorage.setItem('remitterid', JSON.stringify(select));
      setTimeout(() => {
        navigation.navigate("viewbenef");
      }, 1000);
    }else{
      ToastAndroid.show("Select a Remitter. If you do not have a remitter, create a new one.", 2000);

    }
   
  }

  const viewfn = (ac) => {
    setSelectdata(JSON.stringify(ac));
    console.log(ac.partyname);
    setSelectdata2(ac)
    setShow(true);
  };
  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor="#5521C2"
        barStyle="light-content"
      />
      <Modal isOpen={show} onClose={() => setShow(false)}>
        <Box bg="white" w="80%" h="40%">
          <Modal.Header>
            <Heading>Remitter Details</Heading>
          </Modal.Header>
          <Modal.Body>
         
            <ScrollView>
             <VStack space={4} paddingY={4} >
              <Text fontSize={20}>Remitter ID: {selectdata2 && selectdata2.partyid}</Text>
              <Text fontSize={20}>Remitter Name: {selectdata2 && selectdata2.partyname}</Text>
              <Text fontSize={20}>Email ID: {selectdata2 && selectdata2.email}</Text>
              <Text fontSize={20}>Phone Number: {selectdata2 && selectdata2.mobilenumber}</Text>
              <Text fontSize={20}>Pan Number: {selectdata2 && selectdata2.pannumber}</Text>
              <Text fontSize={20}>Country: {selectdata2 && selectdata2.nationality}</Text>
              </VStack>
            </ScrollView>
          </Modal.Body>
        </Box>
      </Modal>
      <Box flex={1} bg="white" justifyContent="space-between">
        <HStack
          bg={"#5521C2"}
          justifyContent={"flex-start"}
          alignItems={"center"}
          w={"full"}
        > 
          <Pressable padding={5}>
            <FontAwesome5
              onPress={() => navigation.goBack()}
              name="arrow-alt-circle-left"
              size={24}
              color={"white"}
            />
          </Pressable>

          <Heading color="white" paddingY={5} bold fontSize={24}>
            Select Remitter
          </Heading>
        </HStack>

        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >
          <VStack paddingX={4}>
            {selectremit.length > 0 ? (
              selectremit.map((a) => (
                <Pressable onPress={() => setSelect(a.partyid)} key={a.partyid}>
                  <HStack
                    borderColor={select === a.partyid ? "#5521C2" : "gray.100"} // Change background color based on selected state
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    marginY={3}
                    borderWidth={2}
                    paddingY={4}
                    bg="gray.100"
                    paddingX={4}
                  >
                    <Center>
                      {select === a.partyid ? (
                        <FontAwesome
                          name="check-circle"
                          color="#5521C2"
                          size={24}
                        />
                      ) : (
                        <FontAwesome
                          name="circle-thin"
                          color="#5521C2"
                          size={24}
                        />
                      )}
                    </Center>

                    <VStack w="65%">
                      <Text fontSize={20} bold textTransform={"capitalize"}>
                        {a.partyname}
                      </Text>
                      <Text fontSize={15} textTransform={"lowercase"}>
                        {a.email}
                      </Text>
                    </VStack>
                    <HStack>
                      <Button onPress={() => viewfn(a)} bg="#5521C2">
                        View
                      </Button>
                    </HStack>
                  </HStack>
                </Pressable>
              ))
            ) : (
              <Center flex={1} justifyContent={"center"} alignItems={"center"}  rounded={20} bg="white">
                <Heading color="#0004" bold paddingY={3} paddingX={5}>
                 No Remitter Found
                </Heading>
              </Center>
            )}
          </VStack>
        </ScrollView>

        <VStack>
          <Pressable
            justifyContent={"center"}
            alignItems={"center"}
            onPress={() => navigation.navigate("remitter")}
          >
            <Text paddingY={2} fontSize={18} bold color="black">
              Create New Remitter
            </Text>
          </Pressable>

          <Button
            _pressed={{
              bg: "#0009",
            }}
            marginX={10}
            marginBottom={24}
            rounded={10}
            onPress={continuefn}
            bg="black"
          >
            <Text marginY={1} color="white" bold fontSize={20}>
              CONTINUE
            </Text>
          </Button>
        </VStack>
      </Box>
    </>
  );
};

export default ViewRemit;
