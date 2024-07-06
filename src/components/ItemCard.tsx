import React from 'react';
import {Card} from 'react-native-paper';
import {BLText} from './UIKit/BLText';
import {StyleSheet} from 'react-native';
import {BLItem} from '../types';

export const ItemCard = ({item: {author, title, coverUrl}}: {item: BLItem}) => {
  return (
    <Card style={styles.card}>
      <Card.Cover
        source={{uri: coverUrl.replace('http', 'https')}}
        resizeMode="contain"
      />
      <Card.Content>
        <BLText numberOfLines={1} ellipsizeMode="tail">
          {title}
        </BLText>
        <BLText>{author}</BLText>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    width: 200,
  },
});
