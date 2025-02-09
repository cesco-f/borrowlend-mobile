import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {theme} from '../../theme';

export const CARD_PADDING = 18;
export const CARD_WIDTH = 180;

export const BLCard = ({
  children,
  onPress,
}: {
  children: React.ReactNode;
  onPress?: () => void;
}) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: CARD_PADDING,
    backgroundColor: theme.colorWhite,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    borderRadius: CARD_PADDING,
    gap: 5,
    width: CARD_WIDTH,
  },
});
