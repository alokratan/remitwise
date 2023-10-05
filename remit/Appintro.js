import React, { useState } from 'react';
import { StyleSheet, Text, View, useColorScheme } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import slides from './slides';
import Home from '../screens/Home';
import Login from '../Login';

const Appintro = () => {
    const theme=useColorScheme();
    console.log(theme);
    const [showHome, setShowHome] = useState(true);

    const doneBtn = (label) => {
        return (
            <View style={styles.button}>
                <Text style={[styles.buttonText,{color:theme=='light'?'black':'white'}]}>{label}</Text>
            </View>
        );
    };

    // const skipBtn = (label) => {
    //     return (
    //         <View style={styles.button}>
    //             <Text style={styles.buttonText}>Skip</Text>
    //         </View>
    //     );
    // };

    const nextBtn = (label) => {
        return (
            <View style={styles.button}>
              <Text style={[styles.buttonText,{color:theme=='light'?'black':'white'}]}>{label}</Text>
            </View>
        );
    };
    if (showHome) {
        return (
            <AppIntroSlider
                data={slides}
                renderItem={({ item }) => (
                    <View style={[styles.container,{backgroundColor:theme=='light'?'white':'black'}]}>
                        <Text style={[styles.title,{color:theme=='light'?'black':'white'}]}>{item.title}</Text>
                        <Text style={styles.bottomwidth}></Text>
                    </View>
                )}
                dotStyle={styles.dotStyle}
                activeDotStyle={styles.activeDotStyle}
                renderNextButton={() => nextBtn("Next")}
                renderDoneButton={() => doneBtn("Done")}
                onDone={() => {
                    setShowHome(false);
                }}
            />
        );
    } else {
        return <Login/>;
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'start',
        paddingLeft:20,
        justifyContent: 'flex-end',
        backgroundColor: 'black'
    },
    title: {
        fontWeight: '900',
        fontSize: 44,
        color: 'white',
        marginBottom:10
     
        
    },
    dotStyle: {
        backgroundColor: 'grey',
        width: 10,
        height: 10,
        borderRadius: 10,
        position:'fixed',
        top:-300,
        left:2
        
    },
    activeDotStyle: {
        backgroundColor: '#6828EE',
        width: 38,
        height: 10,
        borderRadius: 20,
        position:'fixed',
        top:-300,
        left:0
        
    },
    button: {
   
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
      
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        textTransform: 'uppercase',
        fontWeight: '700',
        letterSpacing: 0.5,
        paddingRight:5
    },
    bottomwidth:{
        height:2,
        width:80,
        backgroundColor:'#6828EE',
        marginBottom:100
    }
});

export default Appintro;
