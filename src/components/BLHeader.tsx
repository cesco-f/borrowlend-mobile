import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {theme} from '../theme';
import {BLText} from './UIKit/BLText';
import {useNavigation} from '@react-navigation/native';

export const BLHeader = ({
  showBackButton,
  title,
}: {
  showBackButton?: boolean;
  title?: string;
}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      {showBackButton ? (
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <BLText color="white">Back</BLText>
        </Pressable>
      ) : null}
      {title ? (
        <BLText color="white" style={styles.title}>
          {title}
        </BLText>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 100,
    backgroundColor: theme.colorLightBlue,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  backButton: {
    padding: 10,
    position: 'absolute',
    left: 20,
    bottom: 10,
  },
  title: {
    padding: 10,
  },
});
