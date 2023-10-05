import React from "react";
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
} from "native-base";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
const Verify = () => {
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
          <Pressable padding={5}>
            <FontAwesome5
              name="arrow-alt-circle-left"
              size={24}
              color={"white"}
            />
          </Pressable>

          <Heading color="white" paddingY={5} bold fontSize={24}>
            Verify OTP
          </Heading>
        </HStack>
 
        <VStack paddingX={5} space={5} pt="30%">
          <FormControl>
            <Center>
            <Center w={24} marginBottom={10} h={24} rounded={100} bg="#0001">
                <MaterialCommunityIcons 
                name="form-textbox-password" 
                size={54}
                color="black"
                />

            </Center>
              <FormControl.Label paddingY={4}>
                <Text fontWeight={600} fontSize={20}>
                  Phone OTP Verification
                </Text>
              </FormControl.Label>
              <Input
                variant="filled"
                marginX={6}
                _focus={{
                  bg: "purple.50",
                  borderBottomWidth: 2,
                  borderWidth: 0,
                  borderColor: "#5521C2",
                }}
                InputRightElement={
                  <Box paddingX={2}>
                    <Button
                      _pressed={{
                        bg: "#0009",
                      }}
                      bg={"#5521C2"}
                    >
                      Verify
                    </Button>
                  </Box>
                }
                InputLeftElement={
                  <Box paddingX={2}>
                    <MaterialIcons
                      name="phone-android"
                      size={24}
                      color={"black"}
                    />
                  </Box>
                }
                bg={"gray.100"}
                padding={3}
                placeholder="******"
                color="black"
                marginBottom={4}
                letterSpacing={20}
                maxLength={6}
                fontSize={22}
                keyboardType="phone-pad"
                //   value={email}
                //   onChangeText={e=>setEmail(e)}
                borderBottomColor="#0B0464"
              />
            </Center>

            <Center>
              <FormControl.Label paddingY={4} paddingTop={8}>
                <Text fontWeight={600} fontSize={20}>
                  Email OTP Verification
                </Text>
              </FormControl.Label>

              <Input
                variant="filled"
                marginX={6}
                _focus={{
                  bg: "purple.50",
                  borderBottomWidth: 2,
                  borderWidth: 0,
                  borderColor: "#5521C2",
                }}
                InputRightElement={
                  <Box paddingX={2}>
                    <Button
                      _pressed={{
                        bg: "#0009",
                      }}
                      bg={"#5521C2"}
                    >
                      Verify
                    </Button>
                  </Box>
                }
                InputLeftElement={
                  <Box paddingX={2}>
                    <MaterialCommunityIcons
                      name="email-outline"
                      size={24}
                      color={"black"}
                    />
                  </Box>
                }
                bg={"gray.100"}
                padding={3}
                placeholder="******"
                color="black"
                marginBottom={4}
                letterSpacing={20}
                maxLength={6}
                fontSize={22}
                keyboardType="phone-pad"
                //   value={email}
                //   onChangeText={e=>setEmail(e)}
                borderBottomColor="#0B0464"
              />
            </Center>
          </FormControl>

        
        </VStack>
        <Box w={'full'} position={'absolute'}
            bottom={0}>

        
        <Button
            // onPress={loginfn}
            _pressed={{
              bg: "#0009",
            }}
            marginX={10}
            marginY={10}
            rounded={10}
           
           

            bg="black"
          >
            <Text marginY={1} color="white" bold fontSize={20}>
              Continue
            </Text>
          </Button>
          </Box>
      </Box>
    </>
  );
};

export default Verify;
