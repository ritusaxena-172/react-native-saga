import 'react-native-gesture-handler';
import {TextInput, ScrollView} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import React, {useState} from 'react';
import {
  Alert,
  StyleSheet,
  Image,
  SafeAreaView,
  Text,
  View,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';

//Login Page

function SignUpScreen({navigation}) {
  const [name, setName] = useState('');
  const [email, setEmailId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(true);
  const [isValid, setValid] = useState(true);

  const validation = () => {
    if (!email) {
      setError('Email required *');
      setValid(false);
      return;
    } else if (!password && password.trim() && password.length < 7) {
      setError('Weak password, minimum 5 chars');
      setValid(false);
      return;
    } else if (!phoneNumber && phoneNumber < 11) {
      setError('Invalid Phone Number');
      setValid(false);
      return;
    }
    console.log('here');
    createAccount(email, password, confirmPassword);
  };

  const createAccount = async (email, password, confirmPassword) => {
    console.log('lol');
    if (confirmPassword == password) {
      try {
        console.log('again');
        let response = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );
        if (response && response.user) {
          console.log('response');
          Alert.alert('Success ✅', 'Account created successfully');
        }
      } catch (e) {
        console.error(e.message);
      }
    }
  };

  return (
    <SafeAreaView style={styles2.container}>
      <ScrollView>
        <View style={styles2.view2}>
          <Text style={styles2.text1}>FoodApp</Text>
          <TextInput
            style={styles2.TextInputStyleClass}
            placeholder="Enter your name"
            placeholderTextColor="#a0a5ad"
            onChangeText={text => {
              setName(text);
            }}
          />
          <TextInput
            style={styles2.TextInputStyleClass}
            placeholder="Enter your phone number"
            placeholderTextColor="#a0a5ad"
            onChangeText={text => {
              setPhoneNumber(text);
            }}
          />
          <TextInput
            style={styles2.TextInputStyleClass}
            autoCapitalize={'none'}
            placeholder="Enter your email Id"
            placeholderTextColor="#a0a5ad"
            onChangeText={text => {
              setEmailId(text);
            }}
          />
          <TextInput
            style={styles2.TextInputStyleClass}
            autoCapitalize={'none'}
            secureTextEntry={true}
            placeholder="Enter your Password"
            placeholderTextColor="#a0a5ad"
            onChangeText={text => {
              setPassword(text);
            }}
          />
          <TextInput
            style={styles2.TextInputStyleClass}
            autoCapitalize={'none'}
            secureTextEntry={true}
            placeholder="Confirm your password"
            placeholderTextColor="#a0a5ad"
            onChangeText={text => {
              setConfirmPassword(text);
            }}
          />
          <Text style={styles2.text2}>Forgot Password?</Text>
        </View>
        {error ? (
          <View>
            <Text>{error}</Text>
          </View>
        ) : null}
        <View style={styles2.view3}>
          <TouchableOpacity
            onPress={() => {
              validation();
              navigation.navigate('Login');
            }}>
            <View style={styles2.button1}>
              <Text style={{color: 'white'}}>Sign Up</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

//login page styles
const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#452d03',
  },
  view1: {
    flex: 0.5,
  },
  view2: {
    flex: 1,
    alignItems: 'center',
  },
  view3: {
    flex: 1,
  },
  text1: {
    fontWeight: '400',
    marginTop: '10%',
    fontFamily: 'Cochin',
    textAlign: 'center',
    fontSize: 50,
    color: 'white',
  },
  text2: {
    fontWeight: 'bold',
    marginTop: '4%',
    fontFamily: 'Cochin',
    textAlign: 'center',
    fontSize: 15,
    color: '#a0a5ad',
  },
  TextInputStyleClass: {
    backgroundColor: '#d4c8b4',
    paddingHorizontal: 15,
    marginTop: '12%',
    width: 300,
    alignSelf: 'center',
    height: 50,
    borderWidth: 1,
    borderColor: '#a0a5ad',
    borderRadius: 20,
  },
  button1: {
    width: '70%',
    height: '140%',
    backgroundColor: '#edac45',
    alignSelf: 'center',
    paddingHorizontal: 105,
    alignContent: 'space-between',
    justifyContent: 'center',
    borderRadius: 15,
  },
});

export default SignUpScreen;
