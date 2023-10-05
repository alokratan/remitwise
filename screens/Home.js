import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import {Picker} from '@react-native-picker/picker'
import Coundet from '../trans.json'

const CountrySelect = () => {
  const [countries, setCountries] = useState(Coundet);
  const [selectedCountry, setSelectedCountry] = useState('');

  const handleChange = (itemValue) => {
    setSelectedCountry(itemValue);
  };


  return (
    <View> 
      <Picker
    style={{ borderRadius:100, backgroundColor: '#0001', color: 'black' }} 
      
        selectedValue={selectedCountry}
        onValueChange={handleChange}
        dropdownIconColor="black"
      >
        <Picker.Item style={{backgroundColor:'#0003'}} label="Select a country" value="" />
        {countries.map(country => (
          <Picker.Item 
            key={country.code} 
            label={country.flag+" "+country.name} 
            value={country.code} 
          />
        ))}
      </Picker>
    
    </View>
  );
}

export default CountrySelect;
