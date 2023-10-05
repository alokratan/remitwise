import React, { useState } from 'react';
import { View } from 'react-native';
import {Picker} from '@react-native-picker/picker'


const Selectdrop = () => {
//   const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');


  const handleChange = (itemValue) => {
    setSelectedCountry(itemValue);
  };


  return (
    <View> 
      <Picker
    style={{ borderRadius:100,marginBottom:20, backgroundColor: '#F5F5F5', color: 'black' }} 
        selectedValue={selectedCountry}
        onValueChange={handleChange}
        dropdownIconColor="black"  
      >
        <Picker.Item  label="Education" value="Education" />      
      </Picker>
    
    </View>
  );
}

export default Selectdrop;
