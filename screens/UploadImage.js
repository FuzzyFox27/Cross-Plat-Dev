import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import MapView,{ Marker, Callout }  from 'react-native-maps';
import * as Location from 'expo-location';
import Geocoder from 'react-native-geocoding';

Geocoder.init("AIzaSyCFwDieIrvE0plAgln7Cv07lbpUcazKyKI");

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
    <View>
        <Button title="Pick an image from camera roll" onPress={this._pickImage} />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        <View style={{padding: 10}}> 
        <Text>Add Descrpytion</Text>
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
        <Button title="Upload" onPress={this._getLocationAsync}/>
        </View>
        <View>
          
        </View>
  </View>
  );
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
