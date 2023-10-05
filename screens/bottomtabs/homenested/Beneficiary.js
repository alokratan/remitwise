import {
  Box,
  Text,
  Heading,
  StatusBar,
  Pressable,
  Image,
  CheckIcon,
  Button,
  Select,
  VStack,
  Input,
  ScrollView,
  HStack,
  Center,
  FormControl,
  WarningOutlineIcon,
  Divider,
} from "native-base";
import { ToastAndroid } from "react-native";
import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";
// import CON from "../country.json";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { baseurl, baseurl2 } from "../../../baseurl";
import { MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import CountryPicker from "../../components/CountryPicker";
import Coundet from "../../../country.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Beneficiary = ({ navigation }) => {
  const [valueuid, setValueuid] = useState("");
  const [selectedcode, setSelectedcode] = useState("Iban");
  const [countries, setCountries] = useState(Coundet);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedBankCountry, setSelectedBankCountry] = useState("");

  const formik = useFormik({
    initialValues: {
      Bank_Name: "",
      // Bank_Country: "IN",
      Bank_Address: "",
      iban: "",
      Ac_Holder_Name: "",
      Ac_Number: "",
      // Country: "IN",
      State: "",
      City: "",
      Address: "",
      swiftcode: "",
      postal_code: "",
      routing_number: "",
    },
    validationSchema: Yup.object().shape({
      Ac_Holder_Name: Yup.string()
        .min(3, "Too Short!")
        .max(20, "Too Long!")
        .required("Required"),

      State: Yup.string()
        .matches(/^[A-Za-z0-9 .,-]*$/, "Invalid characters")
        .min(3, "Too Short!")
        .max(100, "Too Long!")
        .required("Required"),
      City: Yup.string()
        .matches(/^[A-Za-z0-9 .,-]*$/, "Invalid characters")
        .min(3, "Too Short!")
        .max(100, "Too Long!")
        .required("Required"),
      Address: Yup.string()
        .min(3, "Too Short!")
        .max(200, "Too Long!")
        .required("Required"),
      Bank_Name: Yup.string()
        .min(3, "Too Short!")
        .max(100, "Too Long!")
        .required("Required"),
      Bank_Address: Yup.string()
        .min(3, "Too Short!")
        .max(100, "Too Long!")
        .required("Required"),
      Ac_Number: Yup.string()
        .required("Required")
        .matches(/^[0-9-]*$/, "Invalid Account Number"),
      swiftcode: Yup.string()
        .required("Required")
        .matches(/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/, "Invalid Swift Number"),
      iban: Yup.string()
        .required("Required")
        .min(6, "Too Short!")
        .max(20, "Too Long!")
        .matches(/^[a-zA-Z0-9]*$/, "Invalid Iban Number"),

      routing_number: Yup.string()
        .required("Required")
      .matches(/^((0[0-9])|(1[0-2])|(2[1-9])|(3[0-2])|(6[1-9])|(7[0-2])|80)([0-9]{7})$/, "Invalid Routing Number"),
      postal_code: Yup.string()
        .required("Required")
        .min(6, "Too Short!")
        .max(8, "Too Long!"),
    }),
    onSubmit: (values) => {
      // myremitterfn(values);
      mybeneffnvin(values);
      console.log(values);
      // resetForm({ values: "" });
    },
  });

 

  const handleselectcode = (itemValue) => {
    setSelectedcode(itemValue);
  };
  const handleChangebankcountry = (itemValue) => {
    setSelectedBankCountry(itemValue);
  };
  const handleChangecountry = (itemValue) => {
    setSelectedCountry(itemValue);
  };

  useEffect(() => {
    AsyncStorage.getItem("uid").then((value) => {
      console.log(value);
      setValueuid(value);
    });
  }, []);

  const mybeneffnvin = async (val) => {
    ToastAndroid.show("Please Wait..", 2000);
    const values = {
      Ac_Holder_Name: val.Ac_Holder_Name,
      Ac_Number: val.Ac_Number,
      Bank_Name: val.Bank_Name,
      Country: selectedCountry,
      State: val.State,
      City: val.City,
      Address: val.Address,
      Ifsc_Code: val.swiftcode,
      Bank_Country: selectedBankCountry,
      Bank_Address: val.Bank_Address,
      iban: val.iban,
      routing_number: val.routing_number,
      postal_code: val.postal_code,
      registered_userid: valueuid,
    };
    console.log(values);
    await axios
      .post(`${baseurl2}/beneficiaryr`, {
        Ac_Holder_Name: val.Ac_Holder_Name,
        Ac_Number: val.Ac_Number,
        Bank_Name: val.Bank_Name,
        Country: selectedCountry,
        State: val.State,
        City: val.City,
        Address: val.Address,
        Ifsc_Code: val.swiftcode,
        Bank_Country: selectedBankCountry,
        Bank_Address: val.Bank_Address,
        iban: val.iban,
        routing_number: val.routing_number,
        postal_code: val.postal_code,
        registered_userid: valueuid,
      })

      .then((res) => {
        console.log(res.data.message);
        console.log(res.data);
        ToastAndroid.show(res.data.message, 2000);
        if (res.data.statuscode === 1) {
          AsyncStorage.setItem(
            "remitterid",
            JSON.stringify(res.data.remitter_id)
          );
          setTimeout(() => {
            navigation.navigate("order");
          }, 1000);
        }
      })
      .catch((error) => {
        // console.log(error.response.data.error);
        console.log(error.response.data);
        ToastAndroid.show(error.response.data.message, 2000);
      });
  };
 
  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor="#5521C2"
        barStyle="light-content"
      />

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
            Create Beneficiary
          </Heading>
        </HStack>
        <ScrollView>
          <VStack paddingX={5} space={6} pt="6">
            <FormControl>
              {/* Bank Name */}
              <FormControl.Label paddingY={2}>
                <Text fontWeight={600} fontSize={17}>
                  Bank Name
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
                placeholder="Bank Name"
                color="black"
                fontSize={17}
                onChangeText={formik.handleChange("Bank_Name")}
                onBlur={formik.handleBlur("Bank_Name")}
                value={formik.values.Bank_Name}
                borderBottomColor="#0B0464"
              />
              {formik.errors.Bank_Name && formik.touched.Bank_Name ? (
                <Text
                  paddingLeft={2}
                  fontSize="sm"
                  color="danger.500"
                  alignSelf="flex-start"
                >
                  {formik.errors.Bank_Name}
                </Text>
              ) : null}
            </FormControl>
            <FormControl>
              <FormControl.Label paddingY={2}>
                <Text fontWeight={600} fontSize={17}>
                  Bank Country
                </Text>
              </FormControl.Label>

              <CountryPicker
                selectedCountry={selectedBankCountry}
                country={countries}
                handleChanges={handleChangebankcountry}
              />
            </FormControl>

            {/* Bank Address */}
            <FormControl>
              <FormControl.Label paddingY={2}>
                <Text fontWeight={600} fontSize={17}>
                  Bank Address
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
                placeholder="Bank Address"
                color="black"
                fontSize={17}
                onChangeText={formik.handleChange("Bank_Address")}
                onBlur={formik.handleBlur("Bank_Address")}
                value={formik.values.Bank_Address}
                borderBottomColor="#0B0464"
              />

              {formik.errors.Bank_Address && formik.touched.Bank_Address ? (
                <Text
                  paddingLeft={2}
                  fontSize="sm"
                  color="danger.500"
                  alignSelf="flex-start"
                >
                  {formik.errors.Bank_Address}
                </Text>
              ) : null}
            </FormControl>
            <FormControl>
     
              <FormControl.Label paddingY={2}>
                <Text fontWeight={600} fontSize={17}>
                  Swift Code
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
                placeholder="SKUASS12345"
                color="black"
                fontSize={17}
                onChangeText={formik.handleChange("swiftcode")}
                onBlur={formik.handleBlur("swiftcode")}
                value={formik.values.swiftcode}
                borderBottomColor="#0B0464"
              />
              {formik.errors.swiftcode && formik.touched.swiftcode ? (
                <Text
                  paddingLeft={2}
                  fontSize="sm"
                  color="danger.500"
                  alignSelf="flex-start"
                >
                  {formik.errors.swiftcode}
                </Text>
              ) : null}
            </FormControl>
            <FormControl>
              <FormControl.Label paddingY={2}>
                <Text fontWeight={600} fontSize={17}>
                  Select Code
                </Text>
              </FormControl.Label>
              <View>
                <Picker
                  style={{
                    borderRadius: 100,
                    marginBottom: 20,
                    backgroundColor: "#F5F5F5",
                    color: "black",
                  }}
                  selectedValue={selectedcode}
                  onValueChange={handleselectcode}
                  dropdownIconColor="black"
                >
                  <Picker.Item label="Iban" value="Iban" />
                  <Picker.Item label="Transit" value="Transit" />
                  <Picker.Item label="Sort" value="Sort" />
                  <Picker.Item label="Bsb" value="Bsb" />
                </Picker>
              </View>
            </FormControl>
            <FormControl>
          
              <FormControl.Label paddingY={2}>
                <Text fontWeight={600} fontSize={17}>
                  {selectedcode}
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
                placeholder={"ABCDEFGHIJ123458923"}
                color="black"
                fontSize={17}
                onChangeText={formik.handleChange("iban")}
                onBlur={formik.handleBlur("iban")}
                value={formik.values.iban}
                borderBottomColor="#0B0464"
              />
              {formik.errors.iban && formik.touched.iban ? (
                <Text
                  paddingLeft={2}
                  fontSize="sm"
                  color="danger.500"
                  alignSelf="flex-start"
                >
                  {formik.errors.iban}
                </Text>
              ) : null}
            </FormControl>
            <FormControl>
              {/* Account Holder Name */}
              <FormControl.Label paddingY={2}>
                <Text fontWeight={600} fontSize={17}>
                  Account Holder Name
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
                placeholder="Account Holder Name"
                color="black"
                fontSize={17}
                onChangeText={formik.handleChange("Ac_Holder_Name")}
                onBlur={formik.handleBlur("Ac_Holder_Name")}
                value={formik.values.Ac_Holder_Name}
                borderBottomColor="#0B0464"
              />
              {formik.errors.Ac_Holder_Name && formik.touched.Ac_Holder_Name ? (
                <Text
                  paddingLeft={2}
                  fontSize="sm"
                  color="danger.500"
                  alignSelf="flex-start"
                >
                  {formik.errors.Ac_Holder_Name}
                </Text>
              ) : null}
            </FormControl>
            <FormControl>
              <FormControl.Label paddingY={2}>
                <Text fontWeight={600} fontSize={17}>
                  Account Number
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
                placeholder="Account Number"
                color="black"
                keyboardType="number-pad"
                fontSize={17}
                onChangeText={formik.handleChange("Ac_Number")}
                onBlur={formik.handleBlur("Ac_Number")}
                value={formik.values.Ac_Number}
                borderBottomColor="#0B0464"
              />
              {formik.errors.Ac_Number && formik.touched.Ac_Number ? (
                <Text
                  paddingLeft={2}
                  fontSize="sm"
                  color="danger.500"
                  alignSelf="flex-start"
                >
                  {formik.errors.Ac_Number}
                </Text>
              ) : null}
            </FormControl>
            <FormControl>
              <FormControl.Label paddingY={2}>
                <Text fontWeight={600} fontSize={17}>
                  Country
                </Text>
              </FormControl.Label>
              <CountryPicker
                selectedCountry={selectedCountry}
                country={countries}
                handleChanges={handleChangecountry}
              />
              <FormControl.Label paddingY={2}>
                <Text fontWeight={600} fontSize={17}>
                  State
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
                placeholder="State"
                color="black"
                fontSize={17}
                onChangeText={formik.handleChange("State")}
                onBlur={formik.handleBlur("State")}
                value={formik.values.State}
                borderBottomColor="#0B0464"
              />
              {formik.errors.State && formik.touched.State ? (
                <Text
                  paddingLeft={2}
                  fontSize="sm"
                  color="danger.500"
                  alignSelf="flex-start"
                >
                  {formik.errors.State}
                </Text>
              ) : null}
            </FormControl>
            <FormControl>
           
              <FormControl.Label paddingY={2}>
                <Text fontWeight={600} fontSize={17}>
                  City
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
                placeholder="City"
                color="black"
                fontSize={17}
                onChangeText={formik.handleChange("City")}
                onBlur={formik.handleBlur("City")}
                value={formik.values.City}
                borderBottomColor="#0B0464"
              />
              {formik.errors.City && formik.touched.City ? (
                <Text
                  paddingLeft={2}
                  fontSize="sm"
                  color="danger.500"
                  alignSelf="flex-start"
                >
                  {formik.errors.City}
                </Text>
              ) : null}
            </FormControl>
            <FormControl>
              <FormControl.Label paddingY={2}>
                <Text fontWeight={600} fontSize={17}>
                  Address
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
                // InputRightElement={
                //   <Box paddingX={2}>
                //     <MaterialIcons name="email" size={24} color="#0B0464" />
                //   </Box>
                // }
                padding={3}
                placeholder="Address"
                color="black"
                fontSize={17}
                onChangeText={formik.handleChange("Address")}
                onBlur={formik.handleBlur("Address")}
                value={formik.values.Address}
                borderBottomColor="#0B0464"
              />
              {formik.errors.Address && formik.touched.Address ? (
                <Text
                  paddingLeft={2}
                  fontSize="sm"
                  color="danger.500"
                  alignSelf="flex-start"
                >
                  {formik.errors.Address}
                </Text>
              ) : null}
            </FormControl>
            <FormControl>
              <FormControl.Label paddingY={2}>
                <Text fontWeight={600} fontSize={17}>
                  Routing Number
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
                // InputRightElement={
                //   <Box paddingX={2}>
                //     <Ionicons name="call" size={24} color="black" />
                //   </Box>
                // }
                padding={3}
                placeholder="834989384"
                color="black"
                keyboardType="phone-pad"
                onChangeText={formik.handleChange("routing_number")}
                onBlur={formik.handleBlur("routing_number")}
                value={formik.values.routing_number}
                fontSize={17}
                borderBottomColor="#0B0464"
              />
              {formik.errors.routing_number && formik.touched.routing_number ? (
                <Text
                  paddingLeft={2}
                  fontSize="sm"
                  color="danger.500"
                  alignSelf="flex-start"
                >
                  {formik.errors.routing_number}
                </Text>
              ) : null}
            </FormControl>
            <FormControl>
              <FormControl.Label paddingY={2}>
                <Text fontWeight={600} fontSize={17}>
                  Postal Code
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
                placeholder="Postal Code"
                color="black"
                keyboardType="phone-pad"
                fontSize={17}
                onChangeText={formik.handleChange("postal_code")}
                onBlur={formik.handleBlur("postal_code")}
                value={formik.values.postal_code}
                borderBottomColor="#0B0464"
              />
              {formik.errors.postal_code && formik.touched.postal_code ? (
                <Text
                  paddingLeft={2}
                  fontSize="sm"
                  color="danger.500"
                  alignSelf="flex-start"
                >
                  {formik.errors.postal_code}
                </Text>
              ) : null}
            </FormControl>

            <></>
          </VStack>
          <Button
            _pressed={{
              bg: "#0009",
            }}
            marginX={10}
            marginBottom={24}
            marginTop={10}
            rounded={10}
            onPress={formik.handleSubmit}
            bg="black"
          >
            <Text marginY={1} color="white" bold fontSize={20}>
              SUBMIT
            </Text>
          </Button>
        </ScrollView>
      </Box>
    </>
  );
};

export default Beneficiary;
