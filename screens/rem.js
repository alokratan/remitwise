import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const Home = () => {
  const [purpose, setPurpose] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [pan, setPan] = useState('');
  const [remitterId, setRemitterId] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [nationality, setNationality] = useState('IN');
  const [postalCode, setPostalCode] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [bankCode, setBankCode] = useState('3003');

  const handleSubmit = () => {
    // Process the form data here
    const formData = {
      purpose,
      account_number: accountNumber,
      ifsc,
      pan,
      remitter_id: remitterId,
      name,
      address,
      phone_number: phoneNumber,
      email,
      nationality,
      postal_code: postalCode,
      state,
      city,
      bank_code: bankCode,
    };

    console.log(formData);
    // You can send the formData to your API or perform any other actions here
  };

  return (
    <View>
      <Text>Select Remittance Purpose</Text>
      
       <TextInput
        placeholder="EDUCATION"
        value={purpose}
        onChangeText={text => setPurpose(text)}
      />

      <TextInput
        placeholder="Account Number"
        value={accountNumber}
        onChangeText={text => setAccountNumber(text)}
      />
      <TextInput
        placeholder="IFSC"
        value={ifsc}
        onChangeText={text => setIfsc(text)}
      />
      <TextInput
        placeholder="PAN"
        value={pan}
        onChangeText={text => setPan(text)}
      />
      <TextInput
        placeholder="Remitter ID"
        value={remitterId}
        onChangeText={text => setRemitterId(text)}
      />
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        placeholder="Address"
        value={address}
        onChangeText={text => setAddress(text)}
      />
      <TextInput
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={text => setPhoneNumber(text)}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        placeholder="Nationality"
        value={nationality}
        onChangeText={text => setNationality(text)}
      />
      <TextInput
        placeholder="Postal Code"
        value={postalCode}
        onChangeText={text => setPostalCode(text)}
      />
      <TextInput
        placeholder="State"
        value={state}
        onChangeText={text => setState(text)}
      />
      <TextInput
        placeholder="City"
        value={city}
        onChangeText={text => setCity(text)}
      />
      <TextInput
        placeholder="Bank Code"
        value={bankCode}
        onChangeText={text => setBankCode(text)}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default Home;
