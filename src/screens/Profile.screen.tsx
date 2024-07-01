import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {useAppContext} from '../App.provider';
import {BLText} from '../components/UIKit/BLText';
import {theme} from '../theme';

export const Profile = () => {
  const {
    user: {city, firstName, lastName},
    logOut,
  } = useAppContext();
  return (
    <View style={styles.container}>
      <BLText style={styles.title} content="User Profile" />
      <View style={styles.infoContainer}>
        <BLText style={styles.label} content="First Name" />
        <BLText style={styles.value} content={firstName} />
      </View>
      <View style={styles.infoContainer}>
        <BLText style={styles.label} content="Last Name:" />
        <BLText style={styles.value} content={lastName} />
      </View>
      <View style={styles.infoContainer}>
        <BLText style={styles.label} content="City" />
        <BLText style={styles.value} content={city} />
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
