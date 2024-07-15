import React from 'react';
import {Button, Card} from 'react-native-paper';
import {BLText} from './UIKit/BLText';
import {StyleSheet} from 'react-native';
import {BLItem} from '../types';
import {theme} from '../theme';
import {useMutation} from '@tanstack/react-query';
import {addUserItemAPI, deleteUserItemAPI} from '../api';
import {useAppContext} from '../App.provider';

const IMAGE_WIDTH = 150;

export const ItemCard = ({item}: {item: BLItem}) => {
  const {author, title, coverUrl} = item;
  const {user, addUserItem, removeUserItem} = useAppContext();

  const {isPending: isAddingItem, mutateAsync: addItem} = useMutation({
    mutationFn: () => addUserItemAPI(user.id, item),
    onSuccess: () => {
      addUserItem({isAvailable: true, itemId: item.id, userId: user.id, item});
    },
  });
  const {isPending: isRemovingItem, mutateAsync: removeItem} = useMutation({
    mutationFn: () => deleteUserItemAPI({userId: user.id, itemId: item.id}),
    onSuccess: () => {
      removeUserItem(item.id);
    },
  });
  const isUserItem = user.items.some(({itemId}) => itemId === item.id);
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
        <Button
          mode="contained"
          loading={isAddingItem || isRemovingItem}
          onPress={() => {
            isUserItem ? removeItem() : addItem();
          }}
          style={styles.button}>
          {isUserItem ? 'Remove item' : 'Add item'}
        </Button>
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
  button: {},
});
