import React, { useState } from 'react';
import { Box, HStack, Heading, Text, VStack, FlatList } from 'native-base';
import trans from '../../trans.json';
import { TouchableOpacity } from 'react-native';

const Recipient = () => {
  const [data, setData] = useState(trans);
  const [expandedItem, setExpandedItem] = useState(null);
  
  const toggleExpand = (itemId) => {
    setExpandedItem((prev) => (prev === itemId ? null : itemId));
  };

  const renderItem = ({ item }) => (
    <Box rounded={10} marginY={1} w="100%" bg={'purple.50'} p={4}>
    <HStack justifyContent="space-between">
      <VStack>
        <Heading fontSize={20} mb={2} color="#000000">
          Order Status {item.transaction}
        </Heading>
        <Text fontSize={14} color="#000000">
          {item.date}
        </Text>
       
      </VStack>
      <VStack justifyContent={"flex-start"} alignItems={"flex-end"}>
        <Text fontSize={23} bold color={'green.700'}>
          {item.amount}
        </Text>
        <TouchableOpacity onPress={() => toggleExpand(item.id)}>
         {expandedItem !== item.id?
         <Text color={'#5521C2'} fontSize={14}>
         View More
       </Text>:
       <Text color={'#5521C2'} fontSize={14}>
       View less
     </Text>
         }
          
        </TouchableOpacity>
       
      </VStack>
      
    </HStack>
    
    {expandedItem === item.id && (<>
  <VStack bg="white" rounded={5} paddingY={3} marginY={2} paddingX={3} >  

 
          <Text fontSize={16} color="#000000">
             {item.transaction_details}
          </Text>
          <Text fontSize={14} color="#0005">
            Payment ID: {item.transactionid}
          </Text>
          </VStack>
          </>
        )}
  </Box>
  );

  return (
    <Box flex={1} bg="white" safeAreaTop paddingBottom={20} paddingTop={6} paddingX={4}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id} // Assuming each item has a unique "id" property
      />
    </Box>
  );
}

export default Recipient;
