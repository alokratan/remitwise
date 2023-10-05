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
// import CON from "../country.json";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { baseurl, baseurl2 } from "../../../baseurl";
import { MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import Coundet from "../../../country.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CountryPicker from "../../components/CountryPicker";

const Remitter = ({ navigation }) => {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [date, setDate] = useState(new Date());
  const [countries, setCountries] = useState(Coundet);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [valueuid, setValueuid] = useState("");

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      phone: "",
      // dob: "",
      pannumber: "",
      aadharnumber: "",
      // country: "",
      state: "",
      city: "",
      address: "",
      bankname: "",
      bankcode: "",
      accountnumber: "",
      ifsc: "",
      postalcode: "",
    },
    validationSchema: Yup.object().shape({
      fullname: Yup.string()
        .min(3, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
      email: Yup.string()
        .matches(
          /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$/,
          "Invalid email"
        )
        .min(5, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
      phone: Yup.string()
        .required("Required")
        .matches(/^[6-9]\d{9}/, "Invalid Phone number")
        .max(10, "Invalid Phone number"),

      // dob: Yup.string().required("Required"),
      pannumber: Yup.string()
        .required("Required")
        .matches(/^[A-Z]{5}\d{4}[A-Z]$/, "Invalid PAN card number"), // Add regex for PAN card
      aadharnumber: Yup.string()
        .required("Required")
        .matches(/^\d{12}$/, "Aadhaar number must be exactly 12 digits long"),
      state: Yup.string()
        .matches(/^[A-Za-z0-9 .,-]*$/, "Invalid characters")
        .min(3, "Too Short!")
        .max(200, "Too Long!")
        .required("Required"),
      city: Yup.string()
        .matches(/^[A-Za-z0-9 .,-]*$/, "Invalid characters")
        .min(3, "Too Short!")
        .max(200, "Too Long!")
        .required("Required"),
      address: Yup.string()
        .min(3, "Too Short!")
        .max(200, "Too Long!")
        .required("Required"),
      bankname: Yup.string()
        .min(3, "Too Short!")
        .max(200, "Too Long!")
        .required("Required"),
      bankcode: Yup.string().required("Required"),
      accountnumber: Yup.string()
        .required("Required")
        .matches(/^[0-9-]*$/, "Invalid Account Number"),
      ifsc: Yup.string()
        .required("Required")
        .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC Number"),
      postalcode: Yup.string()
        .required("Required")
        .min(6, "Too Short!")
        .max(15, "Too Long!"),
    }),
    onSubmit: (values) => {
      // myremitterfn(values);
      myremitterfnvin(values);
      console.log(values, date, selectedCountry);
      // resetForm({ values: "" });
    },
  });
  const showdatafn = (e) => {
    console.log(e);
  };
  useEffect(() => {
    AsyncStorage.getItem("uid").then((value) => {
      console.log(value);
      setValueuid(value);
    });
  }, []);

  const myremitterfnvin = async (val) => {
    ToastAndroid.show("Please Wait..", 2000);

    await axios
      .post(`${baseurl2}/remitterr`, {
        full_name: val.fullname,
        email: val.email,
        phoneno: val.phone,
        nationality: selectedCountry,
        bankname: val.bankname,
        accountno: val.accountnumber,
        ifsccode: val.ifsc,
        panno: val.pannumber,
        aadharno: val.aadharnumber,
        postalcode: val.postalcode,
        bankcode: val.bankcode,
        state: val.state,
        city: val.city,
        address: val.address,
        registered_userid: valueuid,
        purpose: "EDUCATION",
        dob: date,
      })

      .then((res) => {
        console.log(res.data.message);
        console.log(res.data);
        ToastAndroid.show(res.data.message, 2000);
        if (res.data.statuscode === 1) {
          console.log(res.data.message);
          console.log(res.data);
          ToastAndroid.show(res.data.message, 2000);
          AsyncStorage.setItem(
            "remitterid",
            JSON.stringify(res.data.remitter_id)
          );
          setTimeout(() => {
            navigation.navigate("viewbenef");
          }, 1000);
        } else {
          ToastAndroid.show(res.data.message, 2000);
        }
      })
      .catch((error) => {
        // console.log(error.response.data.error);
        console.log(error.response.data);
        ToastAndroid.show(error.response.data.message, 2000);
      });
  };

  //   const myremitterfn=async(val)=>{
  //     ToastAndroid.show("Please Wait..", 2000);
  //     await axios
  //       .post(`${baseurl}/remitter`, {

  //     partyname: val.fullname,
  //     email: val.email,
  //     mobilenumber: val.phone,
  //     dob:date,
  //     pannumber: val.pannumber,
  //     adhaar: val.aadharnumber,
  //     nationality: selectedCountry,
  //     partystate: val.state,
  //     partycity: val.city,
  //     partyaddress: val.address,
  //     bankname: val.bankname,
  //     bankcode: val.bankcode,
  //     accountnumber: val.accountnumber,
  //     ifsccode: val.ifsc,
  //     postalcode: val.postalcode,
  // })

  //       .then((res) => {
  //         console.log(res.data.message);
  //         console.log(res.data);

  //         ToastAndroid.show(res.data.message, 2000);

  //       })
  //       .catch((error) => {
  //         console.log(error.response.data.error);
  //         console.log(error.response.data);
  //         ToastAndroid.show(error.response.data.error, 2000);
  //       });

  //   }

  // console.log(date);

  const handleChange = (itemValue) => {
    setSelectedCountry(itemValue);
    console.log(itemValue);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios"); // For iOS, show the picker again on confirmation
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
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
            Create Remitter
          </Heading>
        </HStack>

        <ScrollView>
          <VStack paddingX={5} space={6} pt="6">
            <FormControl>
              <FormControl.Label paddingY={2}>
                <Text fontWeight={600} fontSize={17}>
                  Full Name
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
                placeholder="Full Name"
                color="black"
                fontSize={17}
                onChangeText={formik.handleChange("fullname")}
                onBlur={formik.handleBlur("fullname")}
                value={formik.values.fullname}
                borderBottomColor="#0B0464"
              />
              {formik.errors.fullname && formik.touched.fullname ? (
                <Text
                  paddingLeft={2}
                  fontSize="sm"
                  color="danger.500"
                  alignSelf="flex-start"
                >
                  {formik.errors.fullname}
                </Text>
              ) : null}
            </FormControl>
            <FormControl>
              <FormControl.Label paddingY={2}>
                <Text fontWeight={600} fontSize={17}>
                  Email
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
                InputRightElement={
                  <Box paddingX={2}>
                    <MaterialIcons name="email" size={24} color="#0B0464" />
                  </Box>
                }
                padding={3}
                placeholder="user@gmail.com"
                color="black"
                fontSize={17}
                keyboardType="email-address"
                onChangeText={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")}
                value={formik.values.email}
                borderBottomColor="#0B0464"
              />
              {formik.errors.email && formik.touched.email ? (
                <Text
                  paddingLeft={2}
                  fontSize="sm"
                  color="danger.500"
                  alignSelf="flex-start"
                >
                  {formik.errors.email}
                </Text>
              ) : null}
            </FormControl>
            <FormControl>
              <FormControl.Label paddingY={2}>
                <Text fontWeight={600} fontSize={17}>
                  Phone Number
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
                InputRightElement={
                  <Box paddingX={2}>
                    <Ionicons name="call" size={24} color="#0B0464" />
                  </Box>
                }
                padding={3}
                placeholder="9845984954"
                color="black"
                fontSize={17}
                onChangeText={formik.handleChange("phone")}
                onBlur={formik.handleBlur("phone")}
                value={formik.values.phone}
                keyboardType="phone-pad"
                borderBottomColor="#0B0464"
              />
              {formik.errors.phone && formik.touched.phone ? (
                <Text
                  paddingLeft={2}
                  fontSize="sm"
                  color="danger.500"
                  alignSelf="flex-start"
                >
                  {formik.errors.phone}
                </Text>
              ) : null}
            </FormControl>
            <FormControl>
              <FormControl.Label paddingY={2}>
                <Text fontWeight={600} fontSize={17}>
                  Date Of Birth
                </Text>
              </FormControl.Label>
              <Pressable
                bg="gray.100"
                // _focus={{
                //   bg: "purple.50",
                //   borderBottomWidth: 2,
                //   borderWidth: 0,
                //   borderColor: "#5521C2",
                // }}
                // InputRightElement={
                //   <Box paddingX={2}>
                //     <Ionicons name="call" size={24} color="black" />
                //   </Box>
                // }
                padding={4}
                onPress={showDatepicker}
                placeholder="834989384"
                color="black"
                value={date}
                rounded={5}
                fontSize={17}
                borderBottomColor="#0B0464"
              >
                {show2 ? (
                  <Text fontSize={17}>Select DOB</Text>
                ) : (
                  <Text fontSize={17}>{date.toISOString().split("T")[0]}</Text>
                )}

                {/* <Button onPress={showDatepicker} title="Pick a date" /> */}
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date" // Set mode to 'date'
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                  />
                )}
              </Pressable>
            </FormControl>
            <FormControl>
              <FormControl.Label paddingY={2}>
                <Text fontWeight={600} fontSize={17}>
                  Pan Number
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
                placeholder="Pan Number"
                color="black"
                fontSize={17}
                onChangeText={formik.handleChange("pannumber")}
                onBlur={formik.handleBlur("pannumber")}
                value={formik.values.pannumber}
                borderBottomColor="#0B0464"
              />
              {formik.errors.pannumber && formik.touched.pannumber ? (
                <Text
                  paddingLeft={2}
                  fontSize="sm"
                  color="danger.500"
                  alignSelf="flex-start"
                >
                  {formik.errors.pannumber}
                </Text>
              ) : null}
            </FormControl>
            <FormControl>
              <FormControl.Label paddingY={2}>
                <Text fontWeight={600} fontSize={17}>
                  Aadhaar Number
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
                placeholder="Aadhaar Number"
                color="black"
                keyboardType="phone-pad"
                fontSize={17}
                onChangeText={formik.handleChange("aadharnumber")}
                onBlur={formik.handleBlur("aadharnumber")}
                value={formik.values.aadharnumber}
                borderBottomColor="#0B0464"
              />
              {formik.errors.aadharnumber && formik.touched.aadharnumber ? (
                <Text
                  paddingLeft={2}
                  fontSize="sm"
                  color="danger.500"
                  alignSelf="flex-start"
                >
                  {formik.errors.aadharnumber}
                </Text>
              ) : null}
            </FormControl>
            <FormControl>
              <FormControl.Label paddingY={2}>
                <Text fontWeight={600} fontSize={17}>
                  Nationality
                </Text>
              </FormControl.Label>
              <CountryPicker
                selectedCountry={selectedCountry}
                country={countries}
                handleChanges={handleChange}
              />
            </FormControl>
            <FormControl>
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
                onChangeText={formik.handleChange("state")}
                onBlur={formik.handleBlur("state")}
                value={formik.values.state}
                borderBottomColor="#0B0464"
              />
              {formik.errors.state && formik.touched.state ? (
                <Text
                  paddingLeft={2}
                  fontSize="sm"
                  color="danger.500"
                  alignSelf="flex-start"
                >
                  {formik.errors.state}
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
                onChangeText={formik.handleChange("city")}
                onBlur={formik.handleBlur("city")}
                value={formik.values.city}
                borderBottomColor="#0B0464"
              />
              {formik.errors.city && formik.touched.city ? (
                <Text
                  paddingLeft={2}
                  fontSize="sm"
                  color="danger.500"
                  alignSelf="flex-start"
                >
                  {formik.errors.city}
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
                padding={3}
                placeholder="Address"
                color="black"
                fontSize={17}
                onChangeText={formik.handleChange("address")}
                onBlur={formik.handleBlur("address")}
                value={formik.values.address}
                borderBottomColor="#0B0464"
              />
              {formik.errors.address && formik.touched.address ? (
                <Text
                  paddingLeft={2}
                  fontSize="sm"
                  color="danger.500"
                  alignSelf="flex-start"
                >
                  {formik.errors.address}
                </Text>
              ) : null}
            </FormControl>

            <Divider marginY={10} />
            <FormControl>
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
                placeholder="State Bank of India"
                color="black"
                fontSize={17}
                onChangeText={formik.handleChange("bankname")}
                onBlur={formik.handleBlur("bankname")}
                value={formik.values.bankname}
                borderBottomColor="#0B0464"
              />
              {formik.errors.bankname && formik.touched.bankname ? (
                <Text
                  paddingLeft={2}
                  fontSize="sm"
                  color="danger.500"
                  alignSelf="flex-start"
                >
                  {formik.errors.bankname}
                </Text>
              ) : null}
            </FormControl>
            <FormControl>
              <FormControl.Label paddingY={2}>
                <Text fontWeight={600} fontSize={17}>
                  Bank Code
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
                placeholder="Bank Code"
                color="black"
                keyboardType="phone-pad"
                fontSize={17}
                onChangeText={formik.handleChange("bankcode")}
                onBlur={formik.handleBlur("bankcode")}
                value={formik.values.bankcode}
                borderBottomColor="#0B0464"
              />
              {formik.errors.bankcode && formik.touched.bankcode ? (
                <Text
                  paddingLeft={2}
                  fontSize="sm"
                  color="danger.500"
                  alignSelf="flex-start"
                >
                  {formik.errors.bankcode}
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
                // InputRightElement={
                //   <Box paddingX={2}>
                //     <Ionicons name="call" size={24} color="black" />
                //   </Box>
                // }
                padding={3}
                placeholder="834989384"
                color="black"
                keyboardType="phone-pad"
                onChangeText={formik.handleChange("accountnumber")}
                onBlur={formik.handleBlur("accountnumber")}
                value={formik.values.accountnumber}
                fontSize={17}
                borderBottomColor="#0B0464"
              />
              {formik.errors.accountnumber && formik.touched.accountnumber ? (
                <Text
                  paddingLeft={2}
                  fontSize="sm"
                  color="danger.500"
                  alignSelf="flex-start"
                >
                  {formik.errors.accountnumber}
                </Text>
              ) : null}
            </FormControl>
            <FormControl>
              <FormControl.Label paddingY={2}>
                <Text fontWeight={600} fontSize={17}>
                  IFSC Code
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
                placeholder="SBIN000XXXX"
                color="black"
                fontSize={17}
                onChangeText={formik.handleChange("ifsc")}
                onBlur={formik.handleBlur("ifsc")}
                value={formik.values.ifsc}
                borderBottomColor="#0B0464"
              />
              {formik.errors.ifsc && formik.touched.ifsc ? (
                <Text
                  paddingLeft={2}
                  fontSize="sm"
                  color="danger.500"
                  alignSelf="flex-start"
                >
                  {formik.errors.ifsc}
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
                onChangeText={formik.handleChange("postalcode")}
                onBlur={formik.handleBlur("postalcode")}
                value={formik.values.postalcode}
                borderBottomColor="#0B0464"
              />
              {formik.errors.postalcode && formik.touched.postalcode ? (
                <Text
                  paddingLeft={2}
                  fontSize="sm"
                  color="danger.500"
                  alignSelf="flex-start"
                >
                  {formik.errors.postalcode}
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

export default Remitter;
