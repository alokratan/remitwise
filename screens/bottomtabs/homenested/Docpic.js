import * as DocumentPicker from 'expo-document-picker';
import React, { useEffect, useState } from 'react';
import { Button, View, Text } from 'react-native';

export default function Docpic() {
  const [pickedDocuments, setPickedDocuments] = useState([]);
  const [docs,setDocs]=useState([]);
  useEffect(() => {
    console.log(pickedDocuments)
    setDocs(...pickedDocuments)
   
   
  }, [])
  console.log(pickedDocuments)
  
 
  const pickDocuments = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: ["*/*"],
      multiple: true // Allow multiple document selection
    });

    if (!result.canceled) {
      setPickedDocuments(result);
      setDocs(pickedDocuments);
    }
  };

  return (
    <View style={{ paddingTop: 100 }}>
      <Text>
        hello
      </Text>
      <Button title="Pick documents" onPress={pickDocuments} />
      {pickedDocuments.length > 0 && (
        <Text>
          Picked {pickedDocuments.length} documents
        </Text>
      )}
    </View>
  );
}
