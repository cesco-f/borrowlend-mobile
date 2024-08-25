import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {BLItem} from '../types';
import {BLText} from './UIKit/BLText';
import {theme} from '../theme';
import {BLCard, CARD_PADDING, CARD_WIDTH} from './UIKit/BLCard';

const IMAGE_WIDTH = CARD_WIDTH - 2 * CARD_PADDING;

export const ItemCard = ({item}: {item: BLItem}) => {
  const {author, title, coverUrl} = item;

  return (
    <BLCard>
      <Image
        source={{uri: coverUrl.replace('http', 'https')}}
        style={styles.image}
        resizeMode="stretch"
      />
      <View style={styles.titleAndAuthorContainer}>
        <BLText
          style={styles.title}
          size="h3"
          numberOfLines={2}
          ellipsizeMode="tail">
          {title}
        </BLText>
        <BLText style={styles.author}>{author}</BLText>
      </View>
    </BLCard>
  );
};

const styles = StyleSheet.create({
  image: {
    width: IMAGE_WIDTH,
    height: 1.33 * IMAGE_WIDTH,
    borderRadius: CARD_PADDING / 2,
  },
  titleAndAuthorContainer: {
    gap: 5,
  },
  title: {
    fontWeight: 'bold',
  },
  author: {
    color: theme.colorBlue,
  },
});
