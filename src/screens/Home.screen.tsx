import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useAppContext} from '../App.provider';
import {theme} from '../theme';
import {BLScrollableList} from '../components/UIKit/BLScrollableList';

export const Home = () => {
  const {user} = useAppContext();
  const {items} = user;

  return (
    <View style={styles.container}>
      <BLScrollableList title="Library" items={items} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colorWhite,
    flex: 1,
  },
});
