import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useAppContext} from '../App.provider';
import {theme} from '../theme';
import {BLScrollableList} from '../components/UIKit/BLScrollableList';
import {ItemCard} from '../components/ItemCard';
import {FriendCard} from '../components/FriendCard';

export const Home = () => {
  const {user} = useAppContext();
  const {items, friends} = user;

  return (
    <View style={styles.container}>
      <BLScrollableList
        title="Library"
        items={items.map(({item}) => item)}
        renderItem={({item}) => <ItemCard item={item} />}
      />
      <BLScrollableList
        title="My friends"
        items={friends}
        renderItem={({item}) => <FriendCard friend={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colorWhite,
    flex: 1,
  },
});
