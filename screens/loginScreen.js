import 'react-native-gesture-handler';
import {TextInput, ScrollView} from 'react-native-gesture-handler';
import auth, {firebase} from '@react-native-firebase/auth';
import React, {useState} from 'react';
import {
  Alert,
  StyleSheet,
  Image,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';

//Login Page

const LogInScreen = ({navigation}) => {
  const [email, setEmailId] = useState('');
  const [password, setPassword] = useState('');
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
    }

    console.log('here');
    SignIn(email, password);
  };

  const SignIn = async (email, password) => {
    try {
      let response = await auth().signInWithEmailAndPassword(email, password);
      if (response && response.user) {
        Alert.alert('Success ✅', 'Authenticated successfully');
        if (email == 'ritus@geekyants.com') {
          navigation.navigate('AdminMenu');
        } else {
          navigation.navigate('Menu');
        }
      }
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <SafeAreaView style={styles2.container}>
      <View style={styles2.view2}>
        <Text style={styles2.text1}>FoodApp</Text>
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
          }}>
          <View style={styles2.button1}>
            <Text style={{color: 'white'}}>Login</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

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
    flex: 2,
    alignItems: 'center',
  },
  view3: {
    flex: 1,
  },
  text1: {
    fontWeight: '400',
    marginTop: '20%',
    fontFamily: 'Cochin',
    textAlign: 'center',
    fontSize: 48,
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
    height: '40%',
    backgroundColor: '#edac45',
    alignSelf: 'center',
    paddingHorizontal: 105,
    alignContent: 'space-between',
    justifyContent: 'center',
    borderRadius: 15,
  },
});

export default LogInScreen;
