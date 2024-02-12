import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import Header from '../components/Header';
import Scale from '../components/Scale';
import SearchIcon from '../assets/search_icon.png';
import Product from '../components/Product';
// import 

interface HomeScreen {
  navigation: any;
}

const HomeScreen = (props: HomeScreen) => {
  let {navigation} = props;

  let [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    getAllProducts();
  }, []);

  function getAllProducts() {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => setAllProducts(data?.products));
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
      <View style={styles.headerContainer}>
        <Header 
          isHome 
          isCart 
          count={2} 
          navigation={navigation} 
        />

        <View style={styles.searchBarContainer}>
          <Image
            source={SearchIcon}
            style={{
              width: Scale(18),
              height: Scale(18),
              marginRight: Scale(16),
            }}
          />

          <Text style={{color: '#8891A5'}}>Search Products or store</Text>
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
            <Text style={{color: '#F8F9FB', fontSize: Scale(14)}}>1 Hour</Text>
          </View>
        </View>
      </View>

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
            renderItem={({item, index}) => (
              <Product
                key={index}
                item={item}
                index={index}
                navigation={navigation}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: Scale(20),
    backgroundColor: '#2A4BA0',
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
