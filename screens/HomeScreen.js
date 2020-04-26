import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Dimensions} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Svg, {image} from 'react-native-svg';
import { Searchbar, TextInput } from 'react-native-paper';
import MapView,{ Marker, Callout }  from 'react-native-maps';
import { MonoText } from '../components/StyledText';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Constants from 'expo-constants';
import MapContainer from '../containers/MapContainer';

export default function HomeScreen() {
  const [searchString, SetSearchString] = React.useState (null);
  return (
    <View style={styles.container}>
    <MapContainer />
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
