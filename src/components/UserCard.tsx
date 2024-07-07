import React from 'react';
import {Avatar, Card, Button} from 'react-native-paper';
import {BLText} from './UIKit/BLText';
import {StyleSheet} from 'react-native';
import {User} from '../types';
import {theme} from '../theme';
import {useMutation} from '@tanstack/react-query';
import {sendFriendRequest} from '../api';
import {useAppContext} from '../App.provider';

export const UserCard = ({
  user: {name, lastName, location, photoUrl, id},
}: {
  user: User;
}) => {
  const {user, addSentFriendRequest} = useAppContext();
  const {isPending, mutateAsync} = useMutation({
    mutationFn: () => sendFriendRequest({friendId: id, userId: user.id}),
    onSuccess: friendRequest => {
      addSentFriendRequest(friendRequest);
    },
  });

  const isFriend = user.friends.some(f => f.id === id);
  const isRequestPending = user.sentFriendRequests.some(
    r => r.receiverId === id,
  );

  const getButtonText = () => {
    if (isFriend) {
      return 'Friends';
    }
    if (isRequestPending) {
      return 'Request already sent';
    }
    return 'Add friend';
  };

  return (
    <Card style={styles.card}>
      <Avatar.Image source={{uri: photoUrl}} />
      <BLText>{`${name} ${lastName}`}</BLText>
      <BLText>{location}</BLText>
      <Card.Actions>
        <Button
          mode="contained"
          onPress={async () => await mutateAsync()}
          style={styles.button}
          loading={isPending}
          disabled={isFriend || isRequestPending || isPending}>
          <BLText style={styles.buttonText}>{getButtonText()}</BLText>
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  button: {
    backgroundColor: theme.colorBlue,
  },
  buttonText: {
    color: theme.colorWhite,
  },
});
