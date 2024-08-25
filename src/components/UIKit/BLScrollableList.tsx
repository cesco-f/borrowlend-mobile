import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {BLText} from './BLText';
import {ItemCard} from '../ItemCard';
import {theme} from '../../theme';
import {CompleteUserItem} from '../../types';

export const BLScrollableList = ({
  title,
  items,
}: {
  title: string;
  items: CompleteUserItem[];
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BLText size="h2">{title}</BLText>
        <BLText size="h5" style={{color: theme.colorLightBlue}}>
          View all
        </BLText>
      </View>
      {items.length ? (
        <FlatList
          data={items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <ItemCard item={item.item} />}
          scrollEnabled
          horizontal
          contentContainerStyle={styles.resultsContainer}
        />
      ) : (
        <BLText>This user has no items</BLText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultsContainer: {
    gap: 20,
    backgroundColor: theme.colorWhite,
    alignSelf: 'flex-start',
    padding: 10,
  },
});
