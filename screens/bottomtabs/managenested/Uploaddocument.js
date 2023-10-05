import React, { useState } from "react";
import {
  Box,
  Text,
  VStack,
  Pressable,
  HStack,
  Heading,
  StatusBar,
  FormControl,
  Input,
  Spinner,
  Button,
  Center,
  ScrollView,
  Modal,
} from "native-base";
import {
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { View, RefreshControl, ToastAndroid } from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as DocumentPicker from "expo-document-picker";
import { baseurl2 } from "../../../baseurl";
import  Axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const UploadDocument = ({ navigation }) => {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [selectDocument, setSelectDocument] = useState("");
  const [selectDocumenterror, setSelectDocumenterror] = useState("");
  const [selectedDocument, setSelectedDocument] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const [filerror, setFilerror] = useState("");
  const [refreshing, setRefreshing] = useState(false); // Added refreshing state

  const pickDocument = async () => {
    if (selectDocument == "") {
      console.log("* Please select document type");
      setSelectDocumenterror("* Please select document type");
    } else {
      let result = await DocumentPicker.getDocumentAsync({});
      if (result.canceled === false) {
        if (result.assets[0].mimeType !== "application/pdf") {
          console.log("error");
          setSelectedDocument(false);
          setFilerror("* Only PDF files are allowed for upload.");
        } else {
          console.log("selected file");
          setFilerror("");
          console.log(result);
          setSelectedDocument(result);
        }
      }
    }
  };

  const onRefresh = async () => {
    setSelectedDocument(false);
    setSelectDocument("");
    setSelectDocumenterror("");
    setFilerror("");
    setRefreshing(false);
  };
  const handleChange = (e) => {
    setSelectDocument(e);
    console.log(e);
  };

   const uploadDocument = async (sd) => {
    const valueid = await AsyncStorage.getItem('uid');
      const formData = new FormData();
    formData.append('uploadFile', {
      uri: sd.assets[0].uri,
      type: sd.assets[0].mimeType,
      name: sd.assets[0].name,
    });
    formData.append('uid', valueid);
    formData.append('rid', '3');
    formData.append('bid', '2');
    formData.append('docname', selectDocument);

    try {
      const response = await Axios.post(`${baseurl2}/uploadFile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if(response.data.statuscode==1){
        setTimeout(() => {
          setIsloading(false);
        }, 1000);
        console.log('Response:', response.data);
        ToastAndroid.show(response.data.message,2000);
        onRefresh();
      }

      // Handle response from the server


    }
    catch(err){
      setTimeout(() => {
        setIsloading(false);
      }, 2000);
        console.log(err);
    }

   }
  const uploadfun=()=>{
    if(selectedDocument){
      ToastAndroid.show("Please Wait..",2000);
      uploadDocument(selectedDocument);
      setIsloading(true);
      console.log("hello upload button");
    }
    else{
     console.log("please choose file for upload.");
     ToastAndroid.show("Please choose file for upload.",2000)
    }
    

  }

  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor="#5521C2"
        barStyle="light-content"
      />
      
      <Modal isOpen={isloading}>
        <Center shadow={5} rounded={5} bg="white" w={12} h={12}>
          <Spinner color="black" size={30} />
        </Center>
      </Modal>
      <Box flex={1} safeAreaTop bg="white" justifyContent={"flex-start"}>
        <HStack
          bg={"#5521C2"}
          justifyContent={"flex-start"}
          alignItems={"center"}
          w={"full"}
        >
          <Pressable onPress={() => navigation.goBack()} padding={5}>
            <FontAwesome5
              name="arrow-alt-circle-left"
              size={24}
              color={"white"}
            />
          </Pressable>

          <Heading color="white" paddingY={5} bold fontSize={24}>
            Upload Documents
          </Heading>
        </HStack>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <VStack paddingX={5} space={5} pt="20%">
            <Center w="full" marginBottom={4}>
              <Center w={24} marginBottom={10} h={24} rounded={100} bg="#0001">
                <AntDesign name="pdffile1" size={40} color="black" />
              </Center>
            </Center>
            <VStack space={1}>
              <Picker
                style={{
                  borderRadius: 100,
                  
                  backgroundColor: "#F5F5F5",
                  color: "black",
                }}
                selectedValue={selectDocument}
                onValueChange={handleChange}
                dropdownIconColor="black"
              >
                <Picker.Item label="Select Document" value="" />
                <Picker.Item
                  label="Student Passport"
                  value="KYC_PASSPORT_STUDENT_1"
                />
                <Picker.Item
                  label="Univercity Application"
                  value="UNIVERSITY_APPLICATION_OR_ADMISSION_LETTER"
                />
                <Picker.Item
                  label="Relative Address Proof"
                  value="KYC_ADDRESS_PROOF_RELATIVE_1"
                />
                <Picker.Item
                  label="Education Loan Sanction Letter Address Proof"
                  value="EDUCATION_LOAN_SANCTION_LETTER"
                />
                <Picker.Item
                  label="Student Aadhaar"
                  value="KYC_AADHAAR_STUDENT_1"
                />
                <Picker.Item label="Student Pancard" value="KYC_PAN_STUDENT" />
                <Picker.Item
                  label="Beneficiary Passbook"
                  value="BENEFICIARY_ACCOUNT_PASSBOOK"
                />
                <Picker.Item label="Rent Agreement" value="RENT_AGREEMENT" />
              </Picker>
              {selectDocument && selectDocument ? (
                <Text></Text>
              ) : (
                <Text
                  paddingLeft={2}
                  fontSize="sm"
                  color="danger.500"
                  alignSelf="flex-start"
                >
                  {selectDocumenterror}
                </Text>
              )}
            </VStack>
            <VStack space={1}>
              <HStack justifyContent={"space-between"}>
                <Pressable
                  rounded={"full"}
                  onPress={pickDocument}
                  borderWidth={3}
                  borderColor={"gray.300"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  bg={selectedDocument !== false ? "purple.100" : "gray.100"}
                  paddingY={3}
                  w="65%"
                >
                  {selectedDocument && selectedDocument ? (
                    <Text color="#5521C2" fontSize={"md"} fontWeight={800}>
                      File Selected
                    </Text>
                  ) : (
                    <Text fontSize={"md"} fontWeight={500}>
                      Choose File
                    </Text>
                  )}
                </Pressable>

                <Pressable
                onPress={uploadfun}
                  borderColor="gray.300"
                  borderWidth={3}
                  justifyContent={"center"}
                  alignItems={"center"}
                  bg="#5521C2"
                  paddingY={3}
                  w="25%"
                >
                  <Text color="white" fontSize={"md"} fontWeight={500}>
                    Upload
                  </Text>
                </Pressable>
              </HStack>
              {filerror && filerror ? (
                <Text
                  paddingLeft={2}
                  fontSize="sm"
                  color="danger.500"
                  alignSelf="flex-start"
                >
                  {filerror}
                </Text>
              ) : (
                <Text></Text>
              )}
            </VStack>
          </VStack>
        </ScrollView>

        {/* <Button
          // onPress={loginfn}
          _pressed={{
            bg: "#0009",
          }}
          marginX={10}
          marginBottom={24}
          marginTop={10}
          rounded={10}
          bg="black"
        >
          <Text marginY={1} color="white" bold fontSize={20}>
            Continue
          </Text>
        </Button> */}
      </Box>
    </>
  );
};

export default UploadDocument;
