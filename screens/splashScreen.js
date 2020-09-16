import React from 'react';
import {
  ImageBackground,
  Alert,
  StyleSheet,
  Image,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';

function SplashScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.backGround}
        source={require('../assets/images/background2.jpg')}>
        <View style={styles.view1}>
          <Text style={styles.text1}>FoodAPP</Text>
        </View>
        <View style={styles.view1}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <View style={styles.button1}>
              <Text style={{color: 'white'}}>Sign In</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Signup');
            }}>
            <View style={styles.button1}>
              <Text style={{color: 'white'}}>Sign Up</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backGround: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
  },
  view1: {
    justifyContent: 'center',
    //position: 'absolute',
    alignItems: 'center',
  },
  text1: {
    fontWeight: '400',
    marginTop: '20%',
    fontFamily: 'Cochin',
    textAlign: 'center',
    fontSize: 40,
    color: 'white',
  },
  button1: {
    marginBottom: 0,
    width: '70%',
    height: '30%',
    backgroundColor: '#edac45',
    //alignSelf: 'center',
    paddingHorizontal: 105,
    alignContent: 'space-between',
    justifyContent: 'center',
    borderRadius: 15,
    marginTop: 2,
  },
});

export default SplashScreen;
