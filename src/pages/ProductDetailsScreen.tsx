import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Image,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import Scale from '../components/Scale';
import Header from '../components/Header';
import {Rating} from 'react-native-ratings';
import favHeart from '../assets/favHeart.png';
import heartIcon from "../assets/favoriteHeart.png"
import Button from '../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from '../store/CartReducer';

import {addToFavorite, removeFromFavorite} from '../store/FavReducer';

const screenWidth = Dimensions.get('window').width;

interface ProductDetailsScreen {
  id?: number;
  navigation: any;
}

const ProductDetailsScreen = (props: ProductDetailsScreen) => {
  const cart = useSelector(state => state.cart.cart);
  const favorite = useSelector(state => state.favorite.favorite);
  const dispatch = useDispatch();

  let [productDetails, setProductDetails] = useState({});
  let [loading, setLoading] = useState(true);
  let [sliderIndex, setSliderIndex] = useState(0);
  let isAlreadyFav = favorite.some((product: any) => product?.id == productDetails?.id);

  let {id} = props?.route?.params;
  console.log('Product id', id);
  const flatListRef = useRef(null);

  useEffect(() => {
    getProductDetails();
  }, [id]);

  function getProductDetails() {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProductDetails(data);
        setLoading(false)
      });
  }

  const onViewableItemsChanged = ({viewableItems, changed}: any) => {
    if (changed[0].isViewable) {
      setSliderIndex(changed[0].index);
    }
  };

  const addItemToCart = item => {
    dispatch(addToCart(item));
  };

  const addToFav = item => {
    dispatch(addToFavorite(item));
  };

  const removeFromFav = item => {
    dispatch(removeFromFavorite(item));
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      {loading ?
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <ActivityIndicator color={'#FFC83A'} size={"large"}/>
      </View>
      :
      <>
        <View style={styles.headerContainer}>
          <Header
            isBack
            isCart
            count={cart.length}
            navigation={props.navigation}
          />

          <Text style={styles.productTitle}>{productDetails?.title}</Text>

          <View style={{alignItems: 'flex-start'}}>
            <Rating
              type="star"
              ratingCount={productDetails?.rating ? productDetails?.rating : 0}
              imageSize={14}
              readonly
              fractions={2}
            />
          </View>
        </View>

        <View>
          <FlatList
            data={productDetails?.images}
            onViewableItemsChanged={onViewableItemsChanged}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <View
                  key={index}
                  style={{
                    width: screenWidth,
                    height: Scale(230),
                  }}>
                  <Image
                    source={{uri: item}}
                    style={{width: screenWidth, minHeight: Scale(230)}}
                  />
                </View>
              );
            }}
          />

          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              borderRadius: 10,
              paddingHorizontal: Scale(10),
              paddingVertical: Scale(10),
              position: 'absolute',
              top: 18,
              right: 20,
            }}
            onPress={() => isAlreadyFav ? removeFromFav(productDetails) : addToFav(productDetails)}
          >
            <Image
              source={isAlreadyFav ? heartIcon : favHeart}
              style={isAlreadyFav ? {width: Scale(20), height: Scale(18)} : {width: Scale(24), height: Scale(24)}}
            />
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              position: 'absolute',
              bottom: 28,
              left: 20,
            }}>
            {productDetails?.images?.map((data: any, index: number) => {
              let isCurrent = index == sliderIndex;

              return (
                <View
                  key={index}
                  style={[
                    isCurrent
                      ? {borderColor: '#F9B023', borderWidth: 2}
                      : {borderColor: '#C5CDD2', borderWidth: 2},
                    {marginRight: Scale(6), width: Scale(20)},
                  ]}></View>
              );
            })}
          </View>
        </View>

        <View
          style={{
            flex: 1,
            paddingHorizontal: Scale(20),
            paddingVertical: Scale(20),
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                color: '#2A4BA0',
                fontSize: Scale(16),
                fontWeight: 'bold',
              }}>
              ${productDetails.price}
            </Text>

            <View style={styles.discountBadge}>
              <Text
                style={{
                  color: 'white',
                  fontSize: Scale(14),
                  fontWeight: 'bold',
                }}>
                {productDetails.discountPercentage}% OFF
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: Scale(30),
            }}>
            <Button
              title="Add To Cart"
              isOutline
              style={{width: '46%'}}
              onPress={() => addItemToCart(productDetails)}
            />
            <Button
              title="Buy Now"
              style={{width: '46%'}}
              onPress={() => props.navigation.navigate('CartScreen')}
            />
          </View>

          <View>
            <Text style={{color: '#1E222B', fontSize: Scale(16)}}>Details</Text>
            <Text
              style={{
                color: '#8891A5',
                fontSize: Scale(16),
                textAlign: 'left',
              }}>
              {productDetails?.description}
            </Text>
          </View>
        </View>
      </>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: Scale(20),
    paddingBottom: Scale(15),
  },
  productTitle: {
    fontSize: Scale(50),
    fontFamily: 'Manrope',
    marginTop: Scale(20),
  },
  productImage: {
    width: '100%',
    height: Scale(100),
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
  discountBadge: {
    paddingHorizontal: Scale(10),
    paddingVertical: Scale(6),
    backgroundColor: '#2A4BA0',
    borderRadius: 20,
    marginLeft: Scale(20),
  },
});

export default ProductDetailsScreen;
