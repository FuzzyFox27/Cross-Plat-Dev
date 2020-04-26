import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import UploadImage from '../screens/UploadImage';
//import UploadImage from '../screens/UploadImage';
import { Button } from 'react-native-paper';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Map',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-map" />,
        }}
      />
        <BottomTab.Screen
        name="Upload"
        component={UploadImage}
        options={{
        title: 'Add',
        tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-add-circle-outline" />,
        }}
      />   
      <BottomTab.Screen
        name="Links"
        component={LinksScreen}
        options={{
          title: 'Favourites',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-star-outline" />,
        }}
      />       
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'Picture Maps';
    case 'Links':
      return 'Favourite Locations';
    case 'Upload':
      return 'Add your own Picture Location'
  }
}
