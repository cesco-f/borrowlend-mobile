import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {CARD_PADDING, CARD_WIDTH} from './UIKit/BLCard';

const IMAGE_WIDTH = CARD_WIDTH - 2 * CARD_PADDING;

type ItemImageSize = 's' | 'm';

const imageWithMap: Record<ItemImageSize, number> = {
  s: 70,
  m: IMAGE_WIDTH,
};

export const ItemImage = ({
  coverUrl,
  size = 'm',
}: {
  coverUrl: string;
  size?: ItemImageSize;
}) => {
  const styles = getStyles(size);
  return (
    <Image
      source={{uri: coverUrl.replace('http', 'https')}}
      style={styles.image}
      resizeMode="stretch"
    />
  );
};

const getStyles = (imageSize: ItemImageSize) =>
  StyleSheet.create({
    image: {
      width: imageWithMap[imageSize],
      height: 1.33 * imageWithMap[imageSize],
      borderRadius: CARD_PADDING / 2,
    },
  });
