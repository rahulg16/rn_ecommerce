import { View, Text, SafeAreaView, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import cartIcon from "../assets/cart.png"
import Scale from './Scale'
import arrow from "../assets/arrow.png"

interface HeaderProps {
  onPress?: () => void;
  title?: string;
  isBack?: boolean;
  navigation?: any;
  isHome?: boolean;
  isCart?: boolean;
  count?: number;
}

const Header = (props: HeaderProps) => {

  const {isHome, navigation, isBack, title, isCart, count, onPress} = props;

  return (
    <SafeAreaView
      style={{paddingVertical: Scale(10)}}>
      <View style={styles.homeHeaderContainer}>
        {isHome && <Text style={styles.nameTextStyle}>Hey, User</Text>}

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          {isBack && (
            <TouchableOpacity style={styles.backArrowStyle} onPress={() => navigation.goBack()}>
              <Image
                source={arrow}
                style={{width: Scale(6), height: Scale(12)}}
              />
            </TouchableOpacity>
          )}

          {title && <Text style={styles.title}>{title}</Text>}
        </View>

        {isCart && (
          <TouchableOpacity onPress={() => navigation.navigate("CartScreen")}>
            <Image
              source={cartIcon}
              style={[styles.cartIcon, isHome && {tintColor: '#F8F9FB'}]}
            />

            {Number(count) > 0 && <View style={styles.cartCount}>
              <Text style={{color: '#F8F9FB'}}>{count}</Text>
            </View>}
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cartIcon: {
    width: Scale(19),
    height: Scale(22),
  },
  homeHeaderContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameTextStyle: {
    fontFamily: 'Poppins-Medium',
    fontSize: Scale(24),
    color: '#F8F9FB',
  },
  backArrowStyle: {
    paddingHorizontal: Scale(18),
    paddingVertical: Scale(14),
    borderRadius: 50,
    marginRight: Scale(16),
    backgroundColor: '#E7ECF0',
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    color: '#1E222B',
    fontSize: Scale(16),
    fontWeight: 'normal',
  },
  cartCount: {
    position: 'absolute',
    backgroundColor: '#FFC83A',
    width: Scale(18),
    height: Scale(18),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderColor: '#F8F9FB',
    borderWidth: 1,
    right: -8,
    top: -4,
  },
});

export default Header