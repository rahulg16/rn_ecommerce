import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  StyleSheet,
} from 'react-native';

import {Provider} from 'react-redux';
import store from "./store"

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from "./src/pages/HomeScreen"
import ProductDetailsScreen from './src/pages/ProductDetailsScreen';
import CartScreen from './src/pages/CartScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen name="ProductDetails" options={{headerShown: false}}>
            {props => <ProductDetailsScreen {...props} />}
          </Stack.Screen>

          <Stack.Screen
            name="Cart"
            component={CartScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
