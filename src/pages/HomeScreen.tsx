import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import React, {useEffect, useState} from 'react';

import Header from '../components/Header';
import Scale from '../components/Scale';
import SearchIcon from '../assets/search_icon.png';
import Product from '../components/Product';
import {useDispatch, useSelector} from 'react-redux';
import {
  addToCart,
} from '../store/CartReducer';

import {
  addToFavorite,
  removeFromFavorite
} from '../store/FavReducer'

// import 

interface HomeScreen {
  navigation: any;
}

const HomeScreen = (props: HomeScreen) => {
  let {navigation} = props;
  const cart = useSelector(state => state.cart.cart);
  const favorite = useSelector(state => state.favorite.favorite);
  const dispatch = useDispatch();

  let [allProducts, setAllProducts] = useState([]);
  let [allProductsBackup, setAllProductsBackup] = useState([]);
  let [loading, setLoading] = useState(true);
  let [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getAllProducts();
  }, []);

  function getAllProducts() {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => {
        setAllProducts(data?.products);
        setAllProductsBackup(data?.products);
        setLoading(false);
      });
  }

  const addItemToCart = item => {
    dispatch(addToCart(item));
  };

  const addToFav = item => {
    dispatch(addToFavorite(item));
  };

  const removeFromFav = item => {
    dispatch(removeFromFavorite(item));
  };

  const searchProducts = (text: string) => {
    if(text?.length == 0) {
      setAllProducts(allProductsBackup)
      setSearchTerm("")
    } else {
      let term = text.toLowerCase();
      let modifiedProductsList = allProducts.filter((product: any) =>
        product?.title?.toLowerCase()?.startsWith(term),
      );

      setAllProducts(modifiedProductsList);
      setSearchTerm(text);
    }
  }

  return (
    <TouchableWithoutFeedback style={{flex: 1}} onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <View style={styles.headerContainer}>
          <Header isHome isCart count={cart?.length} navigation={navigation} />

          <View style={styles.searchBarContainer}>
            <Image
              source={SearchIcon}
              style={{
                width: Scale(18),
                height: Scale(18),
                marginRight: Scale(16),
              }}
            />

            <TextInput
              placeholder="Search Products or store"
              placeholderTextColor={'#8891A5'}
              value={searchTerm}
              onChangeText={searchProducts}
              style={{flex: 1, color: "white"}}
            />
          </View>

          <View style={styles.geographyInfoContainer}>
            <View>
              <Text style={{color: '#C5CDD2', textTransform: 'uppercase'}}>
                Delivery To
              </Text>
              <Text style={{color: '#F8F9FB', fontSize: Scale(14)}}>
                Green Way 3000, Sylhet
              </Text>
            </View>

            <View>
              <Text style={{color: '#C5CDD2', textTransform: 'uppercase'}}>
                Within
              </Text>
              <Text style={{color: '#F8F9FB', fontSize: Scale(14)}}>
                1 Hour
              </Text>
            </View>
          </View>
        </View>

        {loading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator color={'#FFC83A'} size={'large'} />
          </View>
        ) : (
          <View style={styles.productsContainer}>
            <Text
              style={{
                fontSize: Scale(30),
                color: '#1E222B',
                marginLeft: Scale(20),
                marginBottom: Scale(10),
              }}>
              Recommended
            </Text>

            <View style={{flex: 1}}>
              <FlatList
                data={allProducts}
                renderItem={({item, index}) => {

                  let isAlreadyFav = favorite.some((product: any) => product?.id == item?.id)

                  return (
                    <Product
                      key={index}
                      item={item}
                      index={index}
                      isFavorite={isAlreadyFav}
                      navigation={navigation}
                      onAddPress={() => addItemToCart(item)}
                      onFavPress={() => isAlreadyFav ? removeFromFav(item) : addToFav(item)}
                    />
                  );
                }}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: Scale(20),
    backgroundColor: '#2A4BA0',
    paddingTop: Scale(20)
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#153075',
    paddingHorizontal: Scale(18),
    paddingVertical: Scale(20),
    borderRadius: 40,
    marginTop: Scale(50),
    marginBottom: Scale(20),
  },
  geographyInfoContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: Scale(14),
  },
  productsContainer: {
    marginTop: Scale(20),
    flex: 1,
  },
});

export default HomeScreen;
