import {View, Text, SafeAreaView, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import Scale from '../components/Scale';
import Product from '../components/Product';
import {useDispatch, useSelector} from 'react-redux';

import {addToCart} from '../store/CartReducer';
import {addToFavorite, removeFromFavorite} from '../store/FavReducer';

interface FavoritesScreenProps {
  navigation: any;
}

const FavoritesScreen = (props: FavoritesScreenProps) => {
  const favorite = useSelector(state => state.favorite.favorite);
  const dispatch = useDispatch();

  const {navigation} = props;

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
      <View style={styles.productsContainer}>
        <Text
          style={{
            fontSize: Scale(30),
            color: '#1E222B',
            marginLeft: Scale(20),
            marginBottom: Scale(10),
          }}>
          Favorites
        </Text>

        <View style={{flex: 1}}>
          <FlatList
            data={favorite}
            renderItem={({item, index}: any) => {
              let isAlreadyFav = favorite.some(
                (product: any) => product?.id == item?.id,
              );

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
            ListEmptyComponent={() => {
              return (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '50%',
                  }}>
                  <Text
                    style={{
                      fontSize: Scale(20),
                      color: '#1E222B',
                      marginLeft: Scale(20),
                      marginBottom: Scale(10),
                      fontWeight: 'bold',
                    }}>
                    Save Your Favorites Items
                  </Text>
                </View>
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  productsContainer: {
    marginTop: Scale(20),
    flex: 1,
  },
});

export default FavoritesScreen;
