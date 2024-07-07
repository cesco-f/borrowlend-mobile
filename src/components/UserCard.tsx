import React from 'react';
import {Avatar, Card, Button} from 'react-native-paper';
import {BLText} from './UIKit/BLText';
import {StyleSheet} from 'react-native';
import {User} from '../types';
import {theme} from '../theme';
import {useMutation} from '@tanstack/react-query';
import {acceptFriendRequest, deleteFriend, sendFriendRequest} from '../api';
import {useAppContext} from '../App.provider';

export const UserCardInternal = ({
  item: {name, lastName, location, photoUrl},
  onPressButton,
  isLoading,
  isDisabled,
  buttonText,
}: {
  item: User;
  onPressButton: () => void;
  isLoading: boolean;
  isDisabled: boolean;
  buttonText: string;
}) => {
  return (
    <Card style={styles.card}>
      <Avatar.Image source={{uri: photoUrl}} />
      <BLText>{`${name} ${lastName}`}</BLText>
      <BLText>{location}</BLText>
      <Card.Actions>
        <Button
          mode="contained"
          onPress={onPressButton}
          style={styles.button}
          loading={isLoading}
          disabled={isDisabled}>
          <BLText style={styles.buttonText}>{buttonText}</BLText>
        </Button>
      </Card.Actions>
    </Card>
  );
};

export const SearchUserCard = ({item}: {item: User}) => {
  const {id} = item;
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
    <UserCardInternal
      buttonText={getButtonText()}
      isDisabled={isFriend || isRequestPending || isPending}
      isLoading={isPending}
      item={item}
      onPressButton={async () => await mutateAsync()}
    />
  );
};

export const FriendUserCard = ({item}: {item: User}) => {
  const {id} = item;
  const {user, removeFriend} = useAppContext();
  const {isPending, mutateAsync} = useMutation({
    mutationFn: () => deleteFriend({friendId: id, userId: user.id}),
    onMutate: () => {
      removeFriend(item.id);
    },
  });

  return (
    <UserCardInternal
      buttonText={'Remove friend'}
      isDisabled={isPending}
      isLoading={isPending}
      item={item}
      onPressButton={async () => await mutateAsync()}
    />
  );
};

export const ReceivedFriendRequestsCard = ({
  item,
  friendRequestId,
}: {
  item: User;
  friendRequestId: string;
}) => {
  const {user, addFriend} = useAppContext();
  const {isPending, mutateAsync} = useMutation({
    mutationFn: () => acceptFriendRequest({friendRequestId, userId: user.id}),
    onMutate: () => {
      addFriend(item);
    },
  });

  return (
    <UserCardInternal
      buttonText={'Accept'}
      isDisabled={isPending}
      isLoading={isPending}
      item={item}
      onPressButton={async () => await mutateAsync()}
    />
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
