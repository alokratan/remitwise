import * as LocalAuthentication from 'expo-local-authentication';

export const localauth=async (val,loginfnvin)=>{
  
    try {
      const result = await LocalAuthentication.authenticateAsync()
      console.log(result)
      // const result = await auth.authenticateAsync();
      if (result.success) {
        console.log("The user has been successfully authenticated.");
        // ToastAndroid.show("Successfully Authenticated.", 2000);
        loginfnvin(val);
        // The user has been successfully authenticated.
      } else {
        // The user has not been successfully authenticated.
        console.log("The user has not been successfully authenticated");
        ToastAndroid.show("Authentication Failed , Please secure your device first. ", 2000);
      }
    } catch (error) {
      // An error occurred during authentication.
      console.log("haahahah")
      console.log(error)
    }
  }
