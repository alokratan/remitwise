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
import { View, RefreshControl, ToastAndroid } from "react-native"; // Added RefreshControl
import { benefvin } from "../../../userapi";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ViewBenef = ({ navigation }) => {
  const [selectbenef, setSelectbenef] = useState([]);
  const [select, setSelect] = useState(null);
  const [selectdata, setSelectdata] = useState([]);
  const [selectdata2, setSelectdata2] = useState();
  const [show, setShow] = useState(false);
  const [refreshing, setRefreshing] = useState(false); // Added refreshing state

  const onRefresh = async () => {
    setRefreshing(true);
    setSelect(null);
    try {
      const response = await benefvin();
      if (response && response.data) {
        console.log("All Beneficiary Fetch Successfully...")
        setSelectbenef(response.data);
      }
    } catch (error) {
      console.error("Error fetching Beneficiary:", error);
    }

    setRefreshing(false);
  };

  useEffect(() => {
    // Fetch Beneficiarys when the component mounts
    const fetchBeneficiay = async () => {
      try {
        const response = await benefvin();
        if (response && response.data) {
          console.log("All Beneficiary Fetch Successfully...")
          setSelectbenef(response.data);
        }
      } catch (error) {
        console.error("Error fetching Beneficiary:", error);
      }
    };
    fetchBeneficiay();
    
  }, []);
  
  const continuefn=()=>{
    console.log("Beneficiary id:",select)
    if(select){
      AsyncStorage.setItem('beneficiaryid', JSON.stringify(select));
      setTimeout(() => {
        navigation.navigate("order");
      }, 1000);
    }else{
      ToastAndroid.show("Select Beneficiary , If have not Beneficiary Create new", 2000);
    }
  }

  const viewfn = (ac) => {
    setSelectdata(JSON.stringify(ac));
    setSelectdata2(ac)
    console.log(ac.beneficiaryname);
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
            <Heading>Beneficiary Details</Heading>
          </Modal.Header>
          <Modal.Body>
            <ScrollView>
             <VStack space={4} paddingY={4} >
              <Text fontSize={20}>Beneficiary ID: {selectdata2 && selectdata2.beneficiaryid}</Text>
              <Text fontSize={20}>Beneficiary Name: {selectdata2 && selectdata2.beneficiaryname}</Text>
              <Text fontSize={20}>Account Number: {selectdata2 && selectdata2.beneficiaryaccountno}</Text>
              <Text fontSize={20}>Bank Name: {selectdata2 && selectdata2.beneficiarybankname}</Text>
              <Text fontSize={20}>Country: {selectdata2 && selectdata2.partycountry}</Text>
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
            Select Beneficiary
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
            {selectbenef.length > 0 ? (
              selectbenef.map((a) => (
                <Pressable onPress={() => setSelect(a.beneficiaryid)} key={a.beneficiaryid}>
                  <HStack
                    borderColor={select === a.beneficiaryid ? "#5521C2" : "gray.100"} // Change background color based on selected state
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    marginY={3}
                    borderWidth={2}
                    paddingY={4}
                    bg="gray.100"
                    paddingX={4}
                  >
                    <Center>
                      {select === a.beneficiaryid ? (
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
                        {a.beneficiaryname}
                      </Text>
                      <Text fontSize={15} textTransform={"capitalize"}>
                        Ac No. : {a.beneficiaryaccountno}
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
                 No Beneficiary Found
                </Heading>
              </Center>
            )}
          </VStack>
        </ScrollView>

        <VStack>
          <Pressable
            justifyContent={"center"}
            alignItems={"center"}
            onPress={() => navigation.navigate("beneficiary")}
          >
            <Text paddingY={2} fontSize={18} bold color="black">
              Create New Beneficiary
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
            // onPress={formik.handleSubmit}
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

export default ViewBenef;
