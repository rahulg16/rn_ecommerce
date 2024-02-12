import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import placeholderImage from '../assets/product_placeholder.png';
import heartIcon from '../assets/heart.png';
import plusIcon from '../assets/plus_icon.png';
import Scale from './Scale';

interface ProductProps {
  item: any;
  index: number;
  navigation: any;
  onAddPress?: () => void;
}

const Product = (props: ProductProps) => {
  let {item, index, navigation, onAddPress} = props;

  let productName = item.title;
  let productPrice = item.price;
  let thumbnail = item.thumbnail;
  let productID = item.id;

  return (
    <TouchableOpacity
      style={styles.productContainer}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('ProductDetails', {id: productID})}>
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image source={{uri: thumbnail}} style={styles.productImage} />
        <Image
          source={heartIcon}
          style={{
            width: Scale(15),
            height: Scale(14),
            position: 'absolute',
            left: 14,
            top: 14,
            zIndex: 10,
          }}
        />
      </View>

      <View style={styles.detailsContainer}>
        <View>
          <Text
            style={{color: '#616A7D', fontSize: Scale(14), fontWeight: 'bold'}}>
            ${productPrice}
          </Text>
          <Text
            style={{
              color: '#616A7D',
              fontSize: Scale(12),
              fontFamily: 'Manrope',
            }}>
            {productName}
          </Text>
        </View>

        <TouchableOpacity onPress={onAddPress}>
          <View style={styles.addBtn}>
            <Image
              source={plusIcon}
              style={{width: Scale(8), height: Scale(8)}}
            />
          </View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productImage: {
    width: '100%',
    height: Scale(160),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  productContainer: {
    // width: '50%',
    borderRadius: 20,
    backgroundColor: '#E7ECF0',
    marginHorizontal: Scale(14),
    marginVertical: Scale(14),
    flex: 1,
  },
  addBtn: {
    backgroundColor: '#2A4BA0',
    borderRadius: 50,
    width: Scale(24),
    height: Scale(24),
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsContainer: {
    paddingHorizontal: Scale(20),
    paddingVertical: Scale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Product;
