import { call,put, takeEvery, takeLatest } from 'redux-saga/effects'
// import { getData } from './getData';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import * as actions from '../actions'

export function* watchFetchData() {
  yield takeLatest('GETTING_DATA', fetchData);
}
function* fetchData() {
  try{
  const data= yield call(dataGet)
  console.log('fetched data is',data);
  yield put(actions.fetchData(data));
    console.log('outside fetch');
  }
catch (error) {
  yield put(actions.errorData(error));
}
}

function dataGet () {
  const data=[];
  const ref=firestore().collection('Menu');
  return new Promise((resolve, reject) => {
    console.log('here');
    ref.get().then(
      querySnapshot =>{
        querySnapshot.forEach( doc =>{
          const {dishName, dishDescription, dishPrice, image} = doc.data();
        // const downloadURL= getImage(doc.id)
        // console.log('urls',downloadURL);
        data.push({
        id: doc.id,
        image: image,
        dishName: dishName,
        dishDescription: dishDescription,
        dishPrice: dishPrice,
        });
        });
        resolve(data)
      })
      .catch(err => reject(err))
  })
}

// function getImage(id){
//   return new Promise((resolve,reject)=>{
//      storage()
//     .ref('/breakfast/' + id)
//     .getDownloadURL().then((url)=>{
//       console.log('id is '+id+'url is '+url);
//       resolve(url)}).catch(error=>reject(error))
//   })
// }

// async function getData(){
//   console.log('ref is',firestore().collection('Menu'))
//   await firestore()
//   .collection('Menu')
//   .get()
//   .then(querySnapshot => {
//     console.log('Total items: ', querySnapshot.size);
//     querySnapshot.forEach(async doc => {
      // const {dishName, dishDescription, dishPrice} = doc.data();
      // console.log('data is',doc.data());
    //   const downloadURL =await storage()
    //     .ref('/breakfast/' + doc.id)
    //     .getDownloadURL()
    //     data.push({
    //     id: doc.id,
    //     image: downloadURL,
    //     dishName: dishName,
    //     dishDescription: dishDescription,
    //     dishPrice: dishPrice,
    // });
//     return data;
//   });
// })
// }