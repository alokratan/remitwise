import { Box, Text, Pressable, Image } from "native-base";
import React from "react";

const HomeBottom = ({ navigation }) => {
  return (
    <Box flex={1} bg="white" justifyContent="center" alignItems="center">
      <Image
        source={require("../../../assets/sendmon.png")}
        resizeMode="contain"
        w={"100%"}
        h={"30%"}
        alt="logo"
      />
      <Pressable
      _pressed={{
        bg:'black',
        shadow:0,
        borderWidth:5,
        borderColor:"gray.800"
      }}
        marginY={5}
        bg="#5521C2"
        borderWidth={5}
        borderColor={"#0003"}
        shadow={5}
        w={"60%"}
        justifyContent={"center"}
        alignItems={"center"}
        onPress={() => navigation.navigate("viewremit")}
        paddingY={3}
      >
        <Text fontWeight={600} fontSize={18} color="white">
          SEND
        </Text>
      </Pressable>
      <Pressable
        _pressed={{
          bg:'black',
         shadow:0,
         borderWidth:5,
         borderColor:"gray.800"
        }}
        bg="#5521C2"
        w={"60%"}
        shadow={5}
        borderWidth={5}
        borderColor={"#0003"}
        justifyContent={"center"}
        alignItems={"center"}
        onPress={() => navigation.navigate("remitter")}
        paddingY={3}
      >
        <Text fontWeight={600} fontSize={18} color="white">
          RECEIVE
        </Text>
      </Pressable>
    </Box>
  );
};

export default HomeBottom;
