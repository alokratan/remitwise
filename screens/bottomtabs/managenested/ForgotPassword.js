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
  Button,
  Center,
  ScrollView,
} from "native-base";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseurl2 } from "../../../baseurl";
import { ToastAndroid } from "react-native";
const ForgotPassword = ({ navigation }) => {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object().shape({
      password: Yup.string()
        .required("Required")
        .min(8, "Too Short! - should be 8 chars minimum.")
        .matches(
          /[a-z]/,
          "Password must contain at least one lowercase letter."
        )
        .matches(
          /[A-Z]/,
          "Password must contain at least one uppercase letter."
        )
        .matches(/[0-9]/, "Password must contain at least one numeric digit.")
        .matches(
          /[!@#$%^&*(),.?":{}|<>]/,
          "Password must contain at least one special character."
        ),
        confirm_password: Yup.string()
        .required("Required")
        .min(8, "Too Short! - should be 8 chars minimum.")
        .matches(
          /[a-z]/,
          "Password must contain at least one lowercase letter."
        )
        .matches(
          /[A-Z]/,
          "Password must contain at least one uppercase letter."
        )
        .matches(/[0-9]/, "Password must contain at least one numeric digit.")
        .matches(
          /[!@#$%^&*(),.?":{}|<>]/,
          "Password must contain at least one special character."
        ),
    }),
    onSubmit: (values, { resetForm }) => {
      // localauth(values);
      changepdfun(values);
      console.log(values);
      resetForm({ values: "" });
    },
  });

  const changepdfun=async(values)=>{
try{
  

  const email = await AsyncStorage.getItem('emailid');
  
  const res = await axios.post(`${baseurl2}/changepassword`, {
    "userId": email,
    "oPassword": values.password,
    "nPassword": values.confirm_password,
    "type": "C"
  }
  );
  console.log(res.data);
  ToastAndroid.show("Update Successfully..",2000);
  
}
catch(err){
console.log(err);
}
  }
  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor="#5521C2"
        barStyle="light-content"
      />
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
            Reset Password
          </Heading>
        </HStack>
        <ScrollView>
          <VStack paddingX={5} space={5} pt="20%">
            <Center w="full" marginBottom={4}>
              <Center w={24} marginBottom={10} h={24} rounded={100} bg="#0001">
                <MaterialCommunityIcons
                  name="form-textbox-password"
                  size={54}
                  color="black"
                />
              </Center>
            </Center>
            <FormControl>
              <FormControl.Label paddingY={2}>
                <Text fontSize={17} fontWeight={600}>
                  Current Password
                </Text>
              </FormControl.Label>

              <Input
                variant="filled"
                type={show ? "text" : "password"}
                padding={3}
                _focus={{
                  bg: "purple.50",
                  borderBottomWidth: 2,
                  borderWidth: 0,
                  borderColor: "#5521C2",
                }}
                InputRightElement={
                  <Pressable paddingX={2} onPress={() => setShow(!show)}>
                    <MaterialIcons
                      name={show ? "visibility" : "visibility-off"}
                      size={24}
                      color="black"
                    />
                  </Pressable>
                }
                placeholder="********"
                color="black"
                fontSize={17}
                onChangeText={formik.handleChange("password")}
                onBlur={formik.handleBlur("password")}
                value={formik.values.password}
                borderBottomColor="#0B0464"
              />
              {formik.errors.password && formik.touched.password ? (
                <Text
                  paddingLeft={2}
                  fontSize="sm"
                  color="danger.500"
                  alignSelf="flex-start"
                >
                  {formik.errors.password}
                </Text>
              ) : null}
            </FormControl>
            <FormControl>
              <FormControl.Label paddingY={2} paddingTop={8}>
                <Text fontSize={17} fontWeight={600}>
                  Enter New Password
                </Text>
              </FormControl.Label>

              <Input
                variant="filled"
                type={show2 ? "text" : "password"}
                padding={3}
                _focus={{
                  bg: "purple.50",
                  borderBottomWidth: 2,
                  borderWidth: 0,
                  borderColor: "#5521C2",
                }}
                InputRightElement={
                  <Pressable paddingX={2} onPress={() => setShow2(!show2)}>
                    <MaterialIcons
                      name={show2 ? "visibility" : "visibility-off"}
                      size={24}
                      color="black"
                    />
                  </Pressable>
                }
                placeholder="********"
                color="black"
                fontSize={17}
                onChangeText={formik.handleChange("confirm_password")}
                onBlur={formik.handleBlur("confirm_password")}
                value={formik.values.confirm_password}
                borderBottomColor="#0B0464"
              />
              {formik.errors.confirm_password && formik.touched.confirm_password ? (
                <Text
                  paddingLeft={2}
                  fontSize="sm"
                  color="danger.500"
                  alignSelf="flex-start"
                >
                  {formik.errors.confirm_password}
                </Text>
              ) : null}
            </FormControl>
          </VStack>
        </ScrollView>

        <Button
          onPress={formik.handleSubmit}
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
        </Button>
      </Box>
    </>
  );
};

export default ForgotPassword;
