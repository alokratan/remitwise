import { FontAwesome5 } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import {
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  Heading,
  Input,
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextArea,
  VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import Coun from "../../../country.json";
import { ToastAndroid, View } from "react-native";
import { remit } from "../../../userapi";
import { benef } from "../../../userapi";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Orders = ({navigation}) => {
  const [countries, setCountries] = useState(Coun);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectremitter, setSelectremitter] = useState([]);
  const [selectedremitter, setSelectedremitter] = useState();
  const [selectbenef, setSelectbenef] = useState([]);
  const [selectedbenef, setSelectedbenef] = useState();
  const [selectedrelation, setSelectedrelation] = useState();
  const [selectedpaymentmode, setSelectedpaymentmode] = useState();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [uid,setUid]=useState("")

  const handleChange = (itemValue) => {
    setSelectedCountry(itemValue);
  };

  const toggleModal = () => {
    ToastAndroid.show("Apologies, work is in progress.", 2000);
    navigation.goBack();
    // setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {

    // Fetch remitters when the component mounts
    const fetchRemitters = async () => {
      try {
        const response = await remit();
        if (response && response.data) {
          setSelectremitter(response.data);
        }
      } catch (error) {
        console.error("Error fetching remitters:", error);
      }
    };

    fetchRemitters();
    const fetchBenef = async () => {
      try {
        const response = await benef();
        if (response && response.data) {
          setSelectbenef(response.data);
        }
      } catch (error) {
        console.error("Error fetching remitters:", error);
      }
    };

    fetchBenef();
    asyncfn();
  }, []);
  const asyncfn=async ()=>{
    const value1 = await AsyncStorage.getItem('uid');
    const value2 = await AsyncStorage.getItem('remitterid');
    const value3 = await AsyncStorage.getItem('beneficiaryid');
    const obj= {value1,value2,value3}
    console.log(obj)
    setUid(obj)
  }

  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor="#5521C2"
        barStyle="light-content"
      />
       <Modal isOpen={isModalOpen} onClose={false}>
            
            <Modal.Content>
              <Modal.Header>Order Screen
             

              </Modal.Header>
           
           
              <Modal.Body>
              <Text paddingY={2} color="red.500" bold >Apologies, work is in progress.</Text>

                <Text>User/Customer ID:{JSON.stringify(uid.value1)}</Text>
                <Text>Selected Remitter ID:{JSON.stringify(uid.value2)}</Text>
                <Text>Selected Beneficiary ID:{JSON.stringify(uid.value3)}</Text>
              
              </Modal.Body>
              <Modal.Footer>
                <Button onPress={toggleModal}>Go Back</Button>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
      <Box flex={1} justifyContent="space-between" safeAreaTop bg="white">
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
            Create Order
          </Heading>
        </HStack>
        <ScrollView>
          <VStack paddingX={5} space={6} pt="6">
            <FormControl>
              <FormControl.Label paddingY={2}>
                <Text fontWeight={600} fontSize={17}>
                  Currency
                </Text>
              </FormControl.Label>
              <View
                style={{
                  width: "100%",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <Picker
                  style={{
                    borderRadius: 100,
                    width: "100%",
                    backgroundColor: "#F5F5F5",
                    color: "black",
                  }}
                  selectedValue={selectedCountry}
                  onValueChange={handleChange}
                  dropdownIconColor="black"
                >
                  <Picker.Item label="Select Currency" value="" />
                  {countries.map((country) => (
                    <Picker.Item
                      key={country.code}
                      label={country.flag + "  " + country.name+"  (" + country.currency+")"}
                      value={country.currency}
                    />
                  ))}
                </Picker>
              </View>
            </FormControl>

            <FormControl>
              <FormControl.Label paddingY={2}>
                <Text fontWeight={600} fontSize={17}>
                  Amount
                </Text>
              </FormControl.Label>
              <Input
                variant="filled"
                _focus={{
                  bg: "purple.50",
                  borderBottomWidth: 2,
                  borderWidth: 0,
                  borderColor: "#5521C2",
                }}
                padding={3}
                letterSpacing={1}
                placeholder="0.0"
                keyboardType="number-pad"
                color="black"
                fontSize={20}
                borderBottomColor="#0B0464"
                InputRightElement={
                    
                    <Box borderLeftWidth={1} borderColor={"#0003"} padding={0} w="15%">
                   <Center>
                    <Text bold paddingY={1} fontSize="lg" >{selectedCountry}</Text>
                    </Center>
                    </Box>
                  }
              />
            </FormControl>

            <FormControl>
              <FormControl.Label paddingY={2}>
                <Text fontWeight={600} fontSize={17}>
                  Beneficiary
                </Text>
              </FormControl.Label>
              <View
                style={{
                  width: "100%",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <Picker
                  style={{
                    borderRadius: 100,
                    width: "100%",
                    backgroundColor: "#F5F5F5",
                    color: "black",
                  }}
                  selectedValue={selectedbenef}
                  onValueChange={(e) => setSelectedbenef(e)}
                  dropdownIconColor="black"
                >
                  <Picker.Item label="Select Beneficiary" value="" />
                  {selectbenef.map((b) => (
                    <Picker.Item
                      key={b.beneficiaryid}
                      label={"Beneficiary - " + b.beneficiaryname}
                      value={b.beneficiaryname}
                    />
                  ))}
                </Picker>
              </View>
            </FormControl>
            <FormControl>
              <FormControl.Label paddingY={2}>
                <Text fontWeight={600} fontSize={17}>
                  Remitter
                </Text>
              </FormControl.Label>
              <View
                style={{
                  width: "100%",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <Picker
                  style={{
                    borderRadius: 100,
                    width: "100%",
                    backgroundColor: "#F5F5F5",
                    color: "black",
                  }}
                  selectedValue={selectedremitter}
                  onValueChange={(e) => setSelectedremitter(e)}
                  dropdownIconColor="black"
                >
                  <Picker.Item label="Select Remitter" value="" />
                  {selectremitter.map((country) => (
                    <Picker.Item
                      key={country.partyid}
                      label={"Remitter - " + country.partyname}
                      value={country.partyname}
                    />
                  ))}
                </Picker>
              </View>
            </FormControl>
            <FormControl>
              <FormControl.Label paddingY={2}>
                <Text fontWeight={600} fontSize={17}>
                  Customer Relationship
                </Text>
              </FormControl.Label>
              <View
                style={{
                  width: "100%",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <Picker
                  style={{
                    borderRadius: 100,
                    width: "100%",
                    backgroundColor: "#F5F5F5",
                    color: "black",
                  }}
                  selectedValue={selectedrelation}
                  onValueChange={(e) => setSelectedrelation(e)}
                  dropdownIconColor="black"
                >
                  <Picker.Item label="Select Relation" value="" />
                  <Picker.Item label="SELF" value="SELF" />
                  <Picker.Item label="FATHER" value="FATHER" />
                  <Picker.Item label="MOTHER" value="MOTHER" />
                  <Picker.Item label="BROTHER" value="BROTHER" />
                  <Picker.Item label="SISTER" value="SISTER" />
                  <Picker.Item label="HUSBAND" value="HUSBAND" />
                  <Picker.Item label="WIFE" value="WIFE" />
                  <Picker.Item label="UNCLE" value="UNCLE" />
                  <Picker.Item label="AUNT" value="AUNT" />
                  <Picker.Item label="COUSIN" value="COUSIN" />

                </Picker>
                
              </View>
            </FormControl>
            <FormControl>
              <FormControl.Label paddingY={2}>
                <Text fontWeight={600} fontSize={17}>
                  Remarks
                </Text>
              </FormControl.Label>
              <TextArea
                variant="filled"
                _focus={{
                  bg: "purple.50",
                  borderBottomWidth: 2,
                  borderWidth: 0,
                  borderColor: "#5521C2",
                }}
                
                padding={3}
                placeholder="Fill the narration (for e.g GIC Number, registration number, etc.) for the order."
                color="black"
           
                fontSize={17}
                // onChangeText={formik.handleChange("bankname")}
                // onBlur={formik.handleBlur("bankname")}
                // value={formik.values.bankname}
                borderBottomColor="#0B0464"
              />
              {/* {formik.errors.bankname && formik.touched.bankname ? (
                <Text
                  paddingLeft={2}
                  fontSize="sm"
                  color="danger.500"
                  alignSelf="flex-start"
                >
                  {formik.errors.bankname}
                </Text>
              ) : null} */}
            </FormControl>
            <FormControl>
              <FormControl.Label paddingY={2}>
                <Text fontWeight={600} fontSize={17}>
                  Customer Declaration
                </Text>
              </FormControl.Label>
              <TextArea
                variant="filled"
                _focus={{
                  bg: "purple.50",
                  borderBottomWidth: 2,
                  borderWidth: 0,
                  borderColor: "#5521C2",
                }}
                
                padding={3}
                placeholder="This field let you pass the pre remittance amount for the remitter while creating the order for that PAN used for remittance."
                color="black"
           
                fontSize={17}
                // onChangeText={formik.handleChange("bankname")}
                // onBlur={formik.handleBlur("bankname")}
                // value={formik.values.bankname}
                borderBottomColor="#0B0464"
              />
              {/* {formik.errors.bankname && formik.touched.bankname ? (
                <Text
                  paddingLeft={2}
                  fontSize="sm"
                  color="danger.500"
                  alignSelf="flex-start"
                >
                  {formik.errors.bankname}
                </Text>
              ) : null} */}
            </FormControl>
            <FormControl>
              <FormControl.Label paddingY={2}>
                <Text fontWeight={600} fontSize={17}>
                  Payment Mode
                </Text>
              </FormControl.Label>
              <View
                style={{
                  width: "100%",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <Picker
                  style={{
                    borderRadius: 100,
                    width: "100%",
                    backgroundColor: "#F5F5F5",
                    color: "black",
                  }}
                  selectedValue={selectedpaymentmode}
                  onValueChange={(e) => setSelectedpaymentmode(e)}
                  dropdownIconColor="black"
                >
                  <Picker.Item label="Select Payment Mode" value="" />
                  <Picker.Item label="UPI" value="upi" />
                  <Picker.Item label="Net Banking" value="nb" />
                  <Picker.Item label="Bank Transfer" value="banktransfer" />
                </Picker>
                
              </View>
            </FormControl>
            </VStack>
            <Button
            _pressed={{
              bg: "#0009",
            }}
            marginX={10}
            marginBottom={24}
            marginTop={10}
            rounded={10}
            // onPress={formik.handleSubmit}
            bg="black"
          >
            <Text marginY={1} color="white" bold fontSize={20}>
            CONTINUE
            </Text>
          </Button>
         
        </ScrollView>
       
      </Box>
    </>
  );
};

export default Orders;
