import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {useAppContext} from '../App.provider';
import {BLText} from '../components/UIKit/BLText';
import {theme} from '../theme';

export const Profile = () => {
  const {
    user: {location, name, lastName},
    logOut,
  } = useAppContext();

  return (
    <View style={styles.container}>
      <BLText style={styles.title}>User Profile</BLText>
      <View style={styles.infoContainer}>
        <BLText style={styles.label}>First Name</BLText>
        <BLText style={styles.value}>{name}</BLText>
      </View>
      <View style={styles.infoContainer}>
        <BLText style={styles.label}>Last Name:</BLText>
        <BLText style={styles.value}>{lastName}</BLText>
      </View>
      <View style={styles.infoContainer}>
        <BLText style={styles.label}>City</BLText>
        <BLText style={styles.value}>{location} </BLText>
      </View>
      <Button mode="contained" onPress={logOut} style={styles.button}>
        Log Out
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 8,
  },
  value: {
    flex: 1,
  },
  button: {
    marginTop: 16,
    backgroundColor: theme.colorBlue,
  },
});
