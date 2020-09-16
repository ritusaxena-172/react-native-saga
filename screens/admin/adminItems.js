import 'react-native-gesture-handler';
import Dialog from 'react-native-dialog';
import Entypo from 'react-native-vector-icons/Entypo';

import React, {Component} from 'react';
import {
  FlatList,
  PixelRatio,
  StyleSheet,
  Image,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
//import  firebase from 'firebase';
import storage from '@react-native-firebase/storage';
import { fetchData } from '../../redux/generator';
const RenderViewItem = item => {
  console.log('calling renderview', item[0]);
  //   console.log('item is', item.item.length);
  return (
    <View style={styles.second}>
      {/* item list images */}
      <Image
        source={{
          uri: item.item.image,
        }}
        style={styles.logo2}
      />
      {/* displaying text fields */}
      <View>
        <Text style={styles.titleText}>{item.item.dishName}</Text>
        <Text style={styles.baseText}>{item.item.dishDescription}</Text>
        <Text style={styles.costText}>${item.item.dishPrice}</Text>
      </View>
      <TouchableOpacity>
        <View style={styles.button1}>
          <Text style={styles.text1}>+ADD</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  // return views;
};

const mapStateToProps=(state)=> {
  console.log('state is',state);
  return {
    data:state.data,
    message:state.message
  };
}

// const mapDispatchToProps=(dispatch)=>{
// //   watchGuestAddedEvent(dispatch);
// return { 
//   onFetchData: () => dispatch(fetchData())
// };
// }



//Item Screen
class AdminItemsScreen extends Component {
  state = {
    isdialogVisible: false,
    dialogVisible: false,
    dishName: '',
    dishDescription: '',
    dishPrice: 0,
    ImageSource: '',
    list: '',
    image_uri: '',
    state: '',
    downloadURL: '',
    loading: false,
    documentId: '',
    id: -1,
  };


  componentDidMount() {
    this.props.dispatch({type:'GETTING_DATA'})
    console.log('componentDidMount',this.props);
  }

   
  showDialog = () => {
    this.setState({dialogVisible: true});
  };

  handleCancel = () => {
    this.setState({dialogVisible: false});
  };
  async uploadImage(source) {
    const Image =
      Platform.OS === 'ios' ? source.uri.replace('file://', '') : source;
    const storageRef = storage().ref(this.state.dishName);
    console.log('image is', Image);
    storageRef.putFile(Image.uri).on('state_changed', snapshot => {
      switch (snapshot.state) {
        case 'running':
          ActivityIndicator;
          break;
        case 'success':
          snapshot.ref.getDownloadURL().then(downloadURL => {
            this.setState({
              downloadURL: downloadURL,
            });
            console.log('IMAGE URL IS :', this.state.downloadURL);
          });
          break;
        default:
          break;
      }
    });
  }
  async addData(dishName, dishDescription, dishPrice) {
    const ref = firestore().collection('Menu');
    await ref
      .add({
        dishName: dishName,
        dishDescription: dishDescription,
        dishPrice: dishPrice,
        image:this.state.downloadURL,
      })
      // .then(data => {
      //   console.log('id is awesome', data.id);
      //   const image = data.id;
      //   this.uploadImage(ImageSource, data.id);
      // })
      .catch(error => {
        console.log('error ', error);
      });
    this.handleCancel;
  }

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        let source = {uri: response.uri};
        this.setState({
          ImageSource: source,
        });
        this.uploadImage(source)
      }
    });
  }

  //   componentDidMount() {
  //     const ref = firestore().collection('Menu');
  //     var data = [];
  //     this.setState({
  //       loading: true,
  //     });
  //     ref.onSnapshot(querySnapshot => {
  //       querySnapshot.forEach(doc => {
  //         const {dishName, dishDescription, dishPrice} = doc.data();
  //         storage()
  //           .ref('/breakfast/' + doc.id)
  //           .getDownloadURL()
  //           .then(downloadURL => {
  //             // console.log('url is', downloadURL);
  //             data.push({
  //               id: doc.id,
  //               image: downloadURL,
  //               dishName: dishName,
  //               dishDescription: dishDescription,
  //               dishPrice: dishPrice,
  //             });
  //             this.setState({
  //               list: [...this.state.list, data],
  //             });
  //           });
  //         this.setState({
  //           loading: false,
  //         });
  //       });
  //     });
  //   }

  render() {
    return this.state.loading == true ? (
      <ActivityIndicator />
    ) : (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 2}}>
          <Image
            style={styles.logo1}
            source={require('../../assets/images/breakfast2.jpg')}
          />
          {/* <ScrollView>{this.renderViewItem(this.state.list)}</ScrollView> */}
          <FlatList
            data={this.props.data}
            renderItem={({item}) => <RenderViewItem item={item} />}
            keyExtractor={item => item.id}
          />
          <TouchableOpacity onPress={this.showDialog}>
            <Entypo name="add-to-list" size={30} />
          </TouchableOpacity>
          <Dialog.Container visible={this.state.dialogVisible}>
            <Dialog.Title>Add items</Dialog.Title>
            <Dialog.Input
              label="Dish Name"
              onChangeText={dishName => {
                this.setState({dishName});
              }}
            />
            <View style={styles.container}>
              <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                <View style={styles.ImageContainer}>
                  {this.state.ImageSource == null ? (
                    <Text>Select a Photo</Text>
                  ) : (
                    <Image
                      style={styles.ImageContainer}
                      source={this.state.ImageSource}
                    />
                  )}
                </View>
              </TouchableOpacity>
            </View>
            <Dialog.Input
              label="Dish Description"
              onChangeText={dishDescription => {
                this.setState({dishDescription});
              }}
            />
            <Dialog.Input
              label="Dish Price"
              onChangeText={dishPrice => {
                this.setState({dishPrice});
              }}
            />
            <Dialog.Button
              label="Add data"
              onPress={() =>
                this.addData(
                  this.state.dishName,
                  this.state.dishDescription,
                  this.state.dishPrice,
                  this.state.ImageSource,
                )
              }
            />
            <Dialog.Button label="Cancel" onPress={this.handleCancel} />
          </Dialog.Container>
        </View>
      </SafeAreaView>
    );
  }
}

//Item Screen styles
const styles = StyleSheet.create({
  second: {
    flexDirection: 'row',
    flex: 1,
    marginBottom: '5%',
  },
  logo1: {
    width: '100%',
    height: '30%',
    marginBottom: '5%',
  },
  logo2: {
    //resizeMode: 'stretch',
    marginLeft: '3%',
    marginEnd: '5%',
    width: '30%',
    height: '100%',
  },
  titleText: {
    fontFamily: 'Cochin',
    fontSize: 17,
  },
  baseText: {
    marginTop: '3%',
    fontFamily: 'Cochin',
  },
  costText: {
    marginTop: '3%',
    color: '#d68624',
  },
  button1: {
    marginLeft: '2%',
    alignSelf: 'flex-start',
    padding: 4,
    left: '70%',
    borderWidth: 1,
    borderColor: '#349617',
  },
  text1: {
    color: '#349617',
    marginTop: 4,
    textAlign: 'center',
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
  },

  ImageContainer: {
    borderRadius: 10,
    width: 250,
    height: 250,
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CDDC39',
  },
});

//export default AdminItemsScreen;
export default connect(mapStateToProps)(AdminItemsScreen);