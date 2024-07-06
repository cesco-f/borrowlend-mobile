import React from 'react';
import {Card} from 'react-native-paper';
import {BLText} from './UIKit/BLText';
import {StyleSheet} from 'react-native';
import {BLItem} from '../types';
import {theme} from '../theme';

const IMAGE_WIDTH = 150;

export const ItemCard = ({item: {author, title, coverUrl}}: {item: BLItem}) => {
  return (
    <Card style={styles.card} mode="contained">
      <Card.Cover
        source={{uri: coverUrl.replace('http', 'https')}}
        resizeMode="stretch"
        style={styles.image}
      />
      <Card.Content style={styles.content}>
        <BLText style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </BLText>
        <BLText style={styles.author}>{author}</BLText>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: IMAGE_WIDTH,
    alignSelf: 'flex-start',
  },
  image: {
    width: IMAGE_WIDTH,
  },
  content: {
    paddingHorizontal: 0,
    paddingVertical: 5,
    paddingBottom: 0,
    backgroundColor: theme.colorWhite,
    gap: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  author: {
    fontSize: 10,
    color: theme.colorBlue,
  },
});
