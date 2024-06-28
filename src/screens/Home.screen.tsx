import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import {MoodPicker} from '../components/MoodPicker';
import {useAppContext} from '../App.provider';

const imageUrl =
  'https://images.unsplash.com/photo-1474540412665-1cdae210ae6b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1766&q=80';

export const Home = () => {
  const {handleSelectMood} = useAppContext();

  return (
    <ImageBackground source={{uri: imageUrl}} style={styles.container}>
      <MoodPicker onSelect={handleSelectMood} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
