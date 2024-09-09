import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CompleteUserItem} from '../types';
import {BLText} from './UIKit/BLText';
import {BLHorizontalCard} from './UIKit/BLHorizontalCard';
import {ItemImage} from './ItemImage';

export const ItemHorizontalCard = ({item}: {item: CompleteUserItem}) => {
  const {
    item: {title, coverUrl, author},
  } = item;
  return (
    <BLHorizontalCard>
      <ItemImage coverUrl={coverUrl} size="s" />
      <View style={styles.itemInfo}>
        <BLText bold size="h3" numberOfLines={2} ellipsizeMode="tail">
          {title}
        </BLText>
        <BLText color="blue" size="h4">
          {author}
        </BLText>
      </View>
    </BLHorizontalCard>
  );
};

const styles = StyleSheet.create({
  itemInfo: {
    gap: 5,
    flex: 1,
  },
});
