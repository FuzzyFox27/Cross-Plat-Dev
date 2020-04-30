import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, KeyboardAvoidingView, AsyncStorage} from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import MapView,{ Marker, Callout }  from 'react-native-maps';
import * as Location from 'expo-location';
import Geocoder from 'react-native-geocoding';
import styles from './HomeScreen';

Geocoder.init("AIzaSyCFwDieIrvE0plAgln7Cv07lbpUcazKyKI");

const DummyData = [
  {
    "name": "Cathedral",
    "desc": "Good spot innit",
    "location": {
      "lat": 0.1,
      "long": 0.1,
    }
  },
  {
    "name": "Canal",
    "desc": "Good spot innit",
    "location": {
      "lat": 0.1,
      "long": 0.1,
    }
  },
]

//Geocoder.from("Lincoln, United Kingdom")
  //      .then(json => {
    //        var location = json.results[0].geometry.location;
      //      console.log(location);
        //})
        //.catch(error => console.warn(error));

export default class UploadImage extends React.Component {
  state = {
    image: null,
    Descrpytion: 'a very nice photo',
    location: null,
    inProgress: false,
  };

render(){
  const {image} = this.state
  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior="padding"> 
    <View>
        <Button title="Pick an image from camera roll" onPress={this._pickImage} />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        <View style={{padding: 10}}>
        <Text>Add Description</Text>
        <TextInput  
          style={{height: 100, width: 390,backgroundColor: 'white', fontSize: 11}}  
          placeholder=""  
          onChangeText={(typedText) => this.setState({Descrpytion: typedText})}           
        /> 
        <Text>Where was the photo taken</Text>
        <TextInput  
          style={{height: 100, width: 390,backgroundColor: 'white', fontSize: 11}}  
          placeholder=""  
          onChangeText={(typedText) => this.setState({location: typedText})}           
        /> 
        <Text>{this.state.Descrpytion}</Text>
        <Button title="Upload" onPress={ ()=>{this.Upload(this.state)} }/>

        </View>
        <View>
          
        </View>
  </View>
  </KeyboardAvoidingView>
  );
}

Upload = async (newObj) => {
  console.log("uploading")
  // let storageList = await AsyncStorage.getItem("positions")
  // if(storageList !== null){
  //   await AsyncStorage.setItem("positions", storageList.append(newObj))
  // }else{
  //   await AsyncStorage.setItem("positions", newObj)
  // }

  // await AsyncStorage.setItem( "positions", {"test": 5} )
  console.log( newObj )
  await AsyncStorage.setItem('positions', JSON.stringify(newObj) );
  const value = await AsyncStorage.getItem('positions');
  if (value !== null) {
    // We have data!!
    let storageA = JSON.parse(value);
    console.log( storageA );
    //await AsyncStorage.setItem('positions', JSON.stringify(storageA.push(newObj)) );
    //await AsyncStorage.setItem('positions', newObj);
  }
  // console.log()
}

AddToStorage = () =>{
  AsyncStorage.setItem('locations', image, location, Descrpytion);
}

GetFromStorage = () =>{
  AsyncStorage.getItem('locations').then(
    value => {
      console.log( value[0] )
    }
  )
}

_getLocationAsync = async () => {
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== 'granted') {
    this.setState({
      errorMessage: 'Permission to access location was denied',
    });
  }
  Geocoder.from(this.state.location)
        .then(json => {
            var location = json.results[0].geometry.location;
            console.log(location);
        })
        .catch(error => console.warn(error));
};

componentDidMount() {
  this.getPermissionAsync();
  Permissions.askAsync(Permissions.LOCATION);
}

getPermissionAsync = async () => {
  if (Constants.platform.ios) {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    }
  }
};

_pickImage = async () => {
  try {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }

    console.log(result);
  } catch (E) {
    console.log(E);
  }
};
}
