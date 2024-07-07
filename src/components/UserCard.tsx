import React from 'react';
import {Avatar, Card, Button} from 'react-native-paper';
import {BLText} from './UIKit/BLText';
import {StyleSheet} from 'react-native';
import {User} from '../types';
import {theme} from '../theme';

export const UserCard = ({
  user: {name, lastName, location, photoUrl},
}: {
  user: User;
}) => {
  return (
    <Card style={styles.card}>
      <Avatar.Image source={{uri: photoUrl}} />
      <BLText>{`${name} ${lastName}`}</BLText>
      <BLText>{location}</BLText>
      <Card.Actions>
        <Button
          mode="contained"
          onPress={() => console.log('send friend request')}
          style={styles.button}>
          <BLText style={styles.buttonText}>Add friend</BLText>
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
