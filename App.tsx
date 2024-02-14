import React from 'react';
import type {PropsWithChildren} from 'react';
import {Image, View} from 'react-native';

import {Provider} from 'react-redux';
import store from './store';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/pages/HomeScreen';
import ProductDetailsScreen from './src/pages/ProductDetailsScreen';
import CartScreen from './src/pages/CartScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FavoritesScreen from './src/pages/FavoritesScreen';
import OutlineHomeIcon from './src/assets/OutlineHome.png';
import HeartIcon from './src/assets/favHeart.png';
import Scale from './src/components/Scale';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

const HomeStack = createNativeStackNavigator();
const FavoritesStack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {

  function HomeStackNavigator() {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        />

        <HomeStack.Screen
          name="ProductDetailsScreen"
          options={{headerShown: false}}>
          {props => <ProductDetailsScreen {...props} />}
        </HomeStack.Screen>

        <HomeStack.Screen
          name="CartScreen"
          component={CartScreen}
          options={{headerShown: false}}
        />
      </HomeStack.Navigator>
    );
  }

  function FavoritesStackNavigator() {
    return (
      <FavoritesStack.Navigator>
        <FavoritesStack.Screen
          name="FavoritesScreen"
          component={FavoritesScreen}
          options={{headerShown: false}}
        />
      </FavoritesStack.Navigator>
    );
  }

  function TabNavigator() {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = OutlineHomeIcon;
            } else if (route.name === 'Favorites') {
              iconName = HeartIcon;
            }

            return (
              <View>
                <Image
                  source={iconName}
                  style={[
                    {width: Scale(18), height: Scale(19)},
                    focused && {tintColor: '#F9B023'},
                  ]}
                />
              </View>
            );
          },
          tabBarActiveTintColor: '#FFC83A',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: 'white',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20
          },
        })}>
        <Tab.Screen
          name="Home"
          component={HomeStackNavigator}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Favorites"
          component={FavoritesStackNavigator}
          options={{headerShown: false}}
        />
      </Tab.Navigator>
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
