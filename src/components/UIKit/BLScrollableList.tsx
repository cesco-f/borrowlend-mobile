import React from 'react';
import {FlatList, ListRenderItem, StyleSheet, View} from 'react-native';
import {BLText} from './BLText';
import {theme} from '../../theme';
import {BLItem, User} from '../../types';

export const BLScrollableList = <T extends BLItem | User>({
  title,
  items,
  renderItem,
}: {
  title: string;
  items: T[];
  renderItem: ListRenderItem<T>;
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BLText size="h2">{title}</BLText>
        <BLText size="h5" color="blue">
          View all
        </BLText>
      </View>
      {items.length ? (
        <FlatList
          data={items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
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
