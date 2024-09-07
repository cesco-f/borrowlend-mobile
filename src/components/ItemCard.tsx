import React from 'react';
import {StyleSheet, View} from 'react-native';
import {BLItem} from '../types';
import {BLText} from './UIKit/BLText';
import {BLCard} from './UIKit/BLCard';
import {ItemImage} from './ItemImage';

export const ItemCard = ({item}: {item: BLItem}) => {
  const {author, title, coverUrl} = item;

  return (
    <BLCard>
      <ItemImage coverUrl={coverUrl} />
      <View style={styles.titleAndAuthorContainer}>
        <BLText size="h3" numberOfLines={2} bold ellipsizeMode="tail">
          {title}
        </BLText>
        <BLText color="blue">{author}</BLText>
      </View>
    </BLCard>
  );
};

const styles = StyleSheet.create({
  titleAndAuthorContainer: {
    gap: 5,
  },
});
