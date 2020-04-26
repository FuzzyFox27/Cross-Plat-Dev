import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

export default class UploadImage extends React.Component {
  state = {
    image: null,
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
          onChangeText={(text) => this.setState({text})}  
        /> 
        <Button title="Upload"/>
        </View>
  </View>
  );
}
componentDidMount() {
  this.getPermissionAsync();
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
