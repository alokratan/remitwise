import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  HStack,
  Heading,
  Text,
  Input,
  VStack,
  StatusBar,
  Center,
} from "native-base";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { View } from "react-native";
import { Fontisto,Ionicons } from "@expo/vector-icons";
import Coun from "../../country.json";
const Calculator = () => {
  const [countries, setCountries] = useState(Coun);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCountry2, setSelectedCountry2] = useState("");

  const handleChange = (itemValue) => {
    setSelectedCountry(itemValue);
  };
  const handleChange2 = (itemValue2) => {
    setSelectedCountry2(itemValue2);
  };

  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor="#5521C2"
        barStyle="light-content"
      />

      <View
        style={{
          flex:1,
          backgroundColor: "white",
          paddingTop: "10%",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
        
      >
        <Center marginY={10}>
          <Center>
          <Ionicons name="md-calculator" size={100} color="#5521C1" />
          <Heading>Currency Calculator</Heading>
          </Center>
       
        </Center>
       
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Picker
            style={{
              borderRadius: 100,
              width: "40%",
              backgroundColor: "#0001",
              color: "black",
            }}
            selectedValue={selectedCountry}
            onValueChange={handleChange}
            dropdownIconColor="black"
          >
            <Picker.Item
              style={{ backgroundColor: "#0001" }}
              label="Currency"
              value=""
            />
            {countries.map((country) => (
              <Picker.Item
                key={country.code}
                label={country.flag + "  " + country.currency}
                value={country.code}
              />
            ))}
          </Picker>

          <Input
            variant="filled"
            w="40%"
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
          />
        </View>

        <Center marginY={5}>
          <Center style={{transform:'rotate(90deg)'}} bg="black" w={30} h={30} rounded="full">
            <Fontisto  name="arrow-swap" size={16} color="white" />
          </Center>
        </Center>

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Picker
            style={{
              borderRadius: 100,
              width: "40%",
              backgroundColor: "#0001",
              color: "black",
            }}
            selectedValue={selectedCountry2}
            onValueChange={handleChange2}
            dropdownIconColor="black"
          >
            <Picker.Item
              style={{ backgroundColor: "#0001" }}
              label="Currency"
              value=""
            />
            {countries.map((country) => (
              <Picker.Item
                key={country.code}
                label={country.flag + "  " + country.currency}
                value={country.code}
              />
            ))}
          </Picker>

          <Input
            variant="filled"
            w="40%"
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
          />
        </View>
      </View>
    </>
  );
};

export default Calculator;
