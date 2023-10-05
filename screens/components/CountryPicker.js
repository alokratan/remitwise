import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import {Picker} from '@react-native-picker/picker'

const CountryPicker = ({country,selectedCountry,handleChanges}) => {
  return (
    <View> 
      <Picker
    style={{borderRadius:100, backgroundColor: '#F5F5F5', color: 'black'}} 
      
        selectedValue={selectedCountry}
        onValueChange={handleChanges}
        dropdownIconColor="black"
      >
        <Picker.Item  label="Select a country" value="" />
        {country.map(e => (
          <Picker.Item 
            key={e.code} 
            label={e.flag+" "+e.name} 
            value={e.code} 
          />
        ))}
      </Picker>
    
    </View>
  );
}

export default CountryPicker;
