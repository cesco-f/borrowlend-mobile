import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {theme} from '../../theme';

export const CARD_PADDING = 18;
export const CARD_WIDTH = 180;

export const BLHorizontalCard = ({
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    backgroundColor: theme.colorWhite,
    width: '100%',
    padding: 15,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.13,
    shadowRadius: 5,
    elevation: 4,
  },
});
