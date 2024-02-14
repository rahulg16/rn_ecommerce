import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Touchable,
  TouchableOpacity,
  FlatList
} from 'react-native';
import React, {useState} from 'react';
import Scale from '../components/Scale';
import Header from '../components/Header';
import plusIcon from '../assets/plus_icon.png';
import minusIcon from '../assets/minus_icon.png';
import Button from '../components/Button';
import cartEmpty from "../assets/cart_empty.png"

import {useDispatch, useSelector} from 'react-redux';
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from '../store/CartReducer';

interface CartScreenProps {
  navigation: any
}

const CartScreen = (props: CartScreenProps) => {

  let {navigation} = props;
  const cart = useSelector(state => state.cart.cart);
  const dispatch = useDispatch();

  let [loading, setLoading] = useState(false);

  const increaseQuantity = item => {
    dispatch(incrementQuantity(item));
  };
  const decreaseQuantity = item => {
    if (item.quantity == 1) {
      dispatch(removeFromCart(item));
    } else {
      dispatch(decrementQuantity(item));
    }
  };

  const getSubTotal = () => {
    let subTotal = 0;

    for(let i = 0; i < cart.length; i++) {
      subTotal += cart[i].price * cart[i].quantity;
      console.log('subtotal', subTotal, cart[i]);
    }
    // console.log("subtotal", subTotal)
    return Math.round(subTotal)
  }

  const processPurchase = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false)
    }, 2000);
  }

  return (
    <SafeAreaView style={{flex: 1, marginHorizontal: 20}}>
      <Header isBack title="Shopping Cart" navigation={navigation} />

      <View style={{marginVertical: Scale(30)}}>
        <FlatList
          data={cart}
          renderItem={({item, index}) => {
            let productImage = item.thumbnail;
            let price = item.price;
            let quantity = item.quantity;
            let title = item.title;

            return (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingVertical: Scale(10),
                  flex: 1
                }}>
                <View style={{flexDirection: 'row', flex: 1}}>
                  <Image
                    source={{uri: productImage}}
                    style={{
                      width: Scale(45),
                      height: Scale(45),
                      borderRadius: 5,
                    }}
                  />

                  <View style={{marginLeft: Scale(20)}}>
                    <Text
                      style={{
                        color: '#1E222B',
                        fontSize: Scale(14),
                        marginBottom: Scale(4)
                      }}>
                      {title}
                    </Text>
                    <Text style={{color: '#1E222B', fontSize: Scale(14)}}>
                      ${price}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() => decreaseQuantity(item)}>
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
                    {quantity}
                  </Text>

                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() => increaseQuantity(item)}>
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
            );
          }}
          ListEmptyComponent={() => {
            return (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image source={cartEmpty} style={{width: 300, height: 300}} />
                <Text style={{fontSize: Scale(20), fontWeight: 'bold'}}>
                  Your Cart is Currently Empty
                </Text>
              </View>
            );
          }}
          ItemSeparatorComponent={() => {
            return <View style={{borderColor: '#EBEBFB', borderWidth: 1}} />;
          }}
        />
      </View>

      <View style={styles.checkoutContainer}>
        <View style={styles.checkoutItem}>
          <Text>Subtotal</Text>
          <Text>${getSubTotal()}</Text>
        </View>

        <View style={styles.checkoutItem}>
          <Text>Delivery</Text>
          <Text>${cart.length > 0 ? "35.96" : "0"}</Text>
        </View>

        <View style={styles.checkoutItem}>
          <Text>Total</Text>
          <Text>${(getSubTotal() + (cart.length > 0 ? 35.96 : 0)).toFixed(2)}</Text>
        </View>

        <Button title="Proceed To Checkout" loading={loading} onPress={processPurchase}/>
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
