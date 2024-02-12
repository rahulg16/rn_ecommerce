import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Scale from '../components/Scale';
import Header from '../components/Header';
import PlaceHolderImage from '../assets/product_placeholder.png';
import plusIcon from '../assets/plus_icon.png';
import minusIcon from '../assets/minus_icon.png';
import Button from '../components/Button';

const CartScreen = () => {
  return (
    <SafeAreaView style={{flex: 1, marginHorizontal: 20}}>
      <Header isBack title="Shopping Cart" />

      <View style={{marginVertical: Scale(30)}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderColor: 'red',
            borderWidth: 1,
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={PlaceHolderImage}
              style={{width: Scale(25), height: Scale(25)}}
            />

            <View style={{marginLeft: Scale(20)}}>
              <Text>Banana</Text>
              <Text>$7.60</Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderColor: 'red',
              borderWidth: 1,
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity style={styles.btn} onPress={() => {}}>
              <Image
                source={minusIcon}
                style={{width: Scale(20), height: Scale(4)}}
              />
            </TouchableOpacity>

            <Text
              style={{
                textAlign: 'center',
                marginHorizontal: Scale(15),
                fontSize: Scale(14),
              }}>
              1
            </Text>

            <TouchableOpacity style={styles.btn} onPress={() => {}}>
              <Image
                source={plusIcon}
                style={{
                  width: Scale(20),
                  height: Scale(20),
                  tintColor: 'black',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.checkoutContainer}>
        <View style={styles.checkoutItem}>
          <Text>Subtotal</Text>
          <Text>$35.96</Text>
        </View>

        <View style={styles.checkoutItem}>
          <Text>Delivery</Text>
          <Text>$35.96</Text>
        </View>

        <View style={styles.checkoutItem}>
          <Text>Total</Text>
          <Text>$35.96</Text>
        </View>

        <Button title="Proceed To Checkout" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: 44,
    height: 44,
    borderRadius: 50,
    backgroundColor: '#E7ECF0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutContainer: {
    backgroundColor: '#E7ECF0',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    paddingHorizontal: Scale(35),
    paddingVertical: Scale(20),
    position: "absolute",
    bottom: 20,
    width: "100%"
  },
  checkoutItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Scale(18)
  }
});

export default CartScreen;
