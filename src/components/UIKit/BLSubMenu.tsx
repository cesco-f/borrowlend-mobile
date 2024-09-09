import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {BLText} from './BLText';
import {theme} from '../../theme';

const BLSubMenuItem = <T extends string>({
  isSelected,
  title,
  menuOption,
  onPress,
}: {
  isSelected: boolean;
  title: string;
  menuOption: T;
  onPress: (option: T) => void;
}) => {
  return (
    <Pressable
      onPress={() => onPress(menuOption)}
      style={[styles.item, ...(isSelected ? [styles.selectedItem] : [])]}>
      <BLText color={isSelected ? 'white' : 'grey'}>{title}</BLText>
    </Pressable>
  );
};

export const BLSubMenu = <T extends string>({
  subMenuOptionsMap,
  selectedItem,
  setSelectedItem,
}: {
  subMenuOptionsMap: Record<T, {title: string}>;
  selectedItem: T;
  setSelectedItem: (item: T) => void;
}) => {
  return (
    <View style={styles.container}>
      {Object.entries(subMenuOptionsMap).map(([key, value]) => (
        <BLSubMenuItem
          key={key}
          isSelected={selectedItem === key}
          title={(value as {title: string}).title}
          menuOption={key as T}
          onPress={setSelectedItem}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '6%',
    backgroundColor: theme.colorDarkBlue,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  selectedItem: {
    borderBottomWidth: 2,
    borderColor: theme.colorGreen,
  },
});
