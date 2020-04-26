import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Dimensions} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Svg, {image} from 'react-native-svg';
import { Searchbar, TextInput } from 'react-native-paper';
import MapView,{ Marker, Callout }  from 'react-native-maps';
import { MonoText } from '../components/StyledText';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default function HomeScreen() {
  const [searchString, SetSearchString] = React.useState (null);
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete 
      style = {styles.searcrhBar} 
      currentLocation={true} 
      currentLocationLabel="Current location" 
      nearbyPlacesAPI='GooglePlacesSearch'
      autoFocus={true}>
        {({})>(
          <React.Fragment>
          </React.Fragment>
        )}
      <MapView
      region={{
        latitude: 53.22683,
        longitude: -0.53792,
        latitudeDelta: 0.15,
        longitudeDelta: 0.15       
      }}
      style={styles.mapStyle}>
        <Marker
        coordinate ={{latitude: 53.22683, longitude: -0.53792}}
        title={'Scunthorpe'}>  

        <Callout>
          <Text>Chimken</Text>
          <Text> <Image style={{ width: 20, height: 20, backgroundColor: '#333' }} source={require('../TestPhotos/pic1.jpg')} /> </Text>
          <Image
            style={{ width: 50, height: 50, backgroundColor: '#333' }}
            source={require('../TestPhotos/pic1.jpg')}
          />
        </Callout>  
        </Marker>
      </MapView>

      
      {/* <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}>
          <Image
            source={
              __DEV__
                ? require('../assets/images/robot-dev.png')
                : require('../assets/images/robot-prod.png')
            }
            style={styles.welcomeImage}
          />
        </View>

        <View style={styles.getStartedContainer}>
          <DevelopmentModeNotice />

          <Text style={styles.getStartedText}>Open up the code for this screen:</Text>

          <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
            <MonoText>screens/HomeScreen.js</MonoText>
          </View>

          <Text style={styles.getStartedText}>
            Change any of the text, save the file, and your app will automatically reload.
          </Text>
        </View>

        <View style={styles.helpContainer}>
          <TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
            <Text style={styles.helpLinkText}>Help, it didn’t automatically reload!</Text>
          </TouchableOpacity>
        </View>
      </ScrollView> */}

      {/* <View style={styles.tabBarInfoContainer}>
        <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>

        <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
          <MonoText style={styles.codeHighlightText}>navigation/BottomTabNavigator.js</MonoText>
        </View>
      </View> */}
      </GooglePlacesAutocomplete>
    </View>
  );
}

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

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change'
  );
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
  searcrhBar:{
    height: 90,
    width: 300,
    borderWidth: 1,
    paddingHorizontal:16
  }
});
