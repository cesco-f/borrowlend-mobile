import React from 'react';
import {CARD_PADDING, CARD_WIDTH} from './UIKit/BLCard';
import {Image, StyleSheet} from 'react-native';
import {theme} from '../theme';

const IMAGE_WIDTH = CARD_WIDTH - 2 * CARD_PADDING;

type ImageSize = 's' | 'm';
const imageWithMap: Record<ImageSize, number> = {
  s: 70,
  m: IMAGE_WIDTH,
};

export const FriendImage = ({
  photoUrl,
  imageSize = 'm',
}: {
  photoUrl?: string;
  imageSize?: ImageSize;
}) => {
  const imageStyles = getImageStyles(imageSize);
  return (
    <Image
      source={{uri: photoUrl || ''}}
      style={imageStyles.image}
      resizeMode="stretch"
    />
  );
};

const getImageStyles = (imageSize: ImageSize) => {
  return StyleSheet.create({
    image: {
      width: imageWithMap[imageSize],
      height: imageWithMap[imageSize],
      borderRadius: 100,
      borderWidth: 5,
      borderColor: theme.colorGreen,
      alignSelf: 'center',
    },
  });
};
