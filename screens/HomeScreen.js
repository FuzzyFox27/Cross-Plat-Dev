import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Dimensions, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Svg, {image} from 'react-native-svg';
import { Searchbar, TextInput } from 'react-native-paper';
import MapView,{ Marker, Callout, PROVIDER_GOOGLE }  from 'react-native-maps';
import { MonoText } from '../components/StyledText';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as ExpoLocation from 'expo-location';
import Geocoder from 'react-native-geocoding';
import { Ionicons } from '@expo/vector-icons';

Geocoder.init("AIzaSyCFwDieIrvE0plAgln7Cv07lbpUcazKyKI");

export default function HomeScreen() {
  const [searchString, SetSearchString] = useState (null);
  const [location, SetLocation] = useState({
    latitude: 53.22683,
    longitude: -0.53792,
    latitudeDelta: 0.15,
    longitudeDelta: 0.15       
  });
  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    (async () => {
      let { status } = await ExpoLocation.requestPermissionsAsync();
      if (status !== 'granted') {
        // setErrorMsg('Permission to access location was denied');
      }

      let newlocation = await ExpoLocation.getCurrentPositionAsync({});
      console.log(newlocation)
      SetLocation({
        ...location,
        latitude: newlocation.coords.latitude,
        longitude: newlocation.coords.longitude
      })
      // SetLocation(newlocation);
    })();
  }

  const onSearch = () => {
    console.log("Search Text =>", searchString)

    Geocoder.from(searchString)
    .then(json => {
        let geocoderLocation = json.results[0].geometry.location;
        // console.log("searchString =>", searchString)
        console.log(geocoderLocation);
        SetLocation({
          latitude: geocoderLocation.lat,
          longitude: geocoderLocation.lng,
          latitudeDelta: 0.15,
          longitudeDelta: 0.15       
        });
    })
    .catch(error => console.warn(error));

  }

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <TextInput value={searchString} onChangeText={SetSearchString} style={{width: '68%'}} placeholder="Location" />
        <Button onPress={onSearch} style={{width: '15%'}} title="Search " />
        <Ionicons style = {{alignItems:'center'}} onPress={getLocation} name = "ios-locate" size = {70}/>
      </View>
      <GooglePlacesAutocomplete      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: 'AIzaSyCFwDieIrvE0plAgln7Cv07lbpUcazKyKI',
        language: 'en', // language of the results
        types: '(cities)', // default: 'geocode'
      }}GooglePlacesSearchQuery={{
        rankby: 'distance',
        type: 'cafe'
      }}
      autoFocus={false}
      fetchDetails={true}
      renderDescription={row => row.description}
      onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
      console.log(data, details);
    }}
      currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
      currentLocationLabel="Current location"
      onChangeText={(typedText) => this.setState({location: typedText})}  
      >
      <MapView
      region={location}
      provider={PROVIDER_GOOGLE}
      style={styles.mapStyle}>
        <Marker
        coordinate ={{latitude: 53.2343, longitude: -0.5360}}
        >  

        <Callout>
          <View style = {styles.Marker}>
          <Text>Lincoln, Cathedral</Text>
          <View style = {{flexDirection: "row"}}>
            <Text> <Image style={{ width: 60, height: 60, backgroundColor: '#333' }} source={require('../TestPhotos/pic3.jpg')} /> </Text>
            <Text style = {styles.description}>was taken at dinnertime in april at the front gate</Text>
          </View>
          </View>
        </Callout>  
        </Marker>
        <Marker
        coordinate ={{latitude: 53.22683, longitude: -0.53792}}
        >  

        <Callout>
          <View style = {styles.Marker}>
          <Text>Lincoln, Train Bridge</Text>
          <View style = {{flexDirection: "row"}}>
            <Text> <Image style={{ width: 60, height: 60, backgroundColor: '#333' }} source={require('../TestPhotos/pic2.jpg')} /> </Text>
            <Text style = {styles.description}>This Picture was taken at night overlooking the train brige. Using a f/1.2 50mm lens</Text>
          </View>
          </View>
        </Callout>  
        </Marker>
        <Marker
        coordinate ={{latitude: 53.2318, longitude: -0.5251}}
        >  

        <Callout>
          <View style = {styles.Marker}>
          <Text>Lincoln, Arbatreum</Text>
          <View style = {{flexDirection: "row"}}>
            <Text> <Image style={{ width: 60, height: 60, backgroundColor: '#333' }} source={require('../TestPhotos/pic1.jpg')} /> </Text>
            <Text style = {styles.description}>was taken at dinnertime in april at the front gate</Text>
          </View>
          </View>
        </Callout>  
        </Marker>
        <Marker
        coordinate ={{latitude: 53.2288, longitude: -0.5459}}
        >  

        <Callout>
          <View style = {styles.Marker}>
          <Text>Lincoln, Brayford</Text>
          <View style = {{flexDirection: "row"}}>
            <Text> <Image style={{ width: 60, height: 60, backgroundColor: '#333' }} source={require('../TestPhotos/pic4.jpg')} /> </Text>
            <Text style = {styles.description}>Taken at 7pm, may, with a canon 80D</Text>
          </View>
          </View>
        </Callout>  
        </Marker>
        <Marker
        coordinate ={{latitude: 53.3401, longitude: 0.2673}}
        >  

        <Callout>
          <View style = {styles.Marker}>
          <Text>MableThorpe, Sea Front</Text>
          <View style = {{flexDirection: "row"}}>
            <Text> <Image style={{ width: 60, height: 60, backgroundColor: '#333' }} source={require('../TestPhotos/pic5.jpg')} /> </Text>
            <Text style = {styles.description}>quite windy but worth the picture</Text>
          </View>
          </View>
        </Callout>  
        </Marker>
      </MapView>
      </GooglePlacesAutocomplete>
      {/* <TextInput placeholder = "Search" style = {styles.Searchbar}/> */}
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

HomeScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use useful development
        tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/workflow/development-mode/');
}



const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Searchbar: {
    flex: 1,
  },
  Marker:{
    flex: 1,
    backgroundColor: 'white',
    width: 350,
    height: 100,
  },
  DescryptionText:{
    fontSize: 10,

  },
  Icon:{


  },
});
