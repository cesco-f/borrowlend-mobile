import {View, StyleSheet, Pressable, Image} from 'react-native';
import {MoodOptionType} from '../types';
import {theme} from '../theme';
import React, {useState} from 'react';
import {BLText} from './UIKit/BLText';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';

const ReanimatedPressable = Animated.createAnimatedComponent(Pressable);

const moodOptions: MoodOptionType[] = [
  {emoji: '🧑‍💻', description: 'studious'},
  {emoji: '🤔', description: 'pensive'},
  {emoji: '😊', description: 'happy'},
  {emoji: '🥳', description: 'celebratory'},
  {emoji: '😤', description: 'frustrated'},
];

const imageSrc = require('../assets/butterflies.png');

export const MoodPicker = ({
  onSelect,
}: {
  onSelect: (mood: MoodOptionType) => void;
}) => {
  const [selectedMood, setSelectedMood] = useState<MoodOptionType>();
  const [hasSelected, setHasSelected] = React.useState(false);

  const buttonStyle = useAnimatedStyle(
    () => ({
      opacity: selectedMood ? withTiming(1) : withTiming(0.5),
      transform: [{scale: selectedMood ? withTiming(1) : 0.8}],
    }),
    [selectedMood],
  );

  const handleSelect = React.useCallback(() => {
    if (selectedMood) {
      onSelect(selectedMood);
      setSelectedMood(undefined);
      setHasSelected(true);
    }
  }, [onSelect, selectedMood]);

  if (hasSelected) {
    return (
      <View style={styles.container}>
        <Image source={imageSrc} style={styles.image} />
        <Pressable style={styles.button} onPress={() => setHasSelected(false)}>
          <BLText style={styles.buttonText}>Back</BLText>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BLText style={styles.heading}>How are you right now4?</BLText>
      <View style={styles.moodList}>
        {moodOptions.map(option => (
          <View key={option.emoji}>
            <Pressable
              onPress={() => setSelectedMood(option)}
              style={[
                styles.moodItem,
                option.emoji === selectedMood?.emoji
                  ? styles.selectedMoodItem
                  : undefined,
              ]}>
              <BLText style={styles.moodText}>{option.emoji}</BLText>
            </Pressable>
            <BLText style={styles.descriptionText}>
              {selectedMood?.emoji === option.emoji ? option.description : ''}
            </BLText>
          </View>
        ))}
      </View>
      <ReanimatedPressable
        style={[styles.button, buttonStyle]}
        onPress={handleSelect}>
        <BLText style={styles.buttonText}>Choose</BLText>
      </ReanimatedPressable>
    </View>
  );
};

const styles = StyleSheet.create({
  moodText: {
    fontSize: 24,
  },
  moodList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moodItem: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginBottom: 5,
  },
  selectedMoodItem: {
    borderWidth: 2,
    backgroundColor: theme.colorBlue,
    borderColor: theme.colorWhite,
  },
  descriptionText: {
    color: theme.colorBlue,
    fontWeight: 'bold',
    fontSize: 10,
    textAlign: 'center',
  },
  container: {
    borderWidth: 2,
    borderColor: theme.colorBlue,
    margin: 10,
    borderRadius: 10,
    padding: 20,
    justifyContent: 'space-between',
    height: 230,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  image: {
    alignSelf: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: 20,
    color: theme.colorWhite,
  },
  button: {
    backgroundColor: theme.colorBlue,
    width: 150,
    borderRadius: 20,
    marginTop: 20,
    alignSelf: 'center',
    padding: 10,
  },
  buttonText: {
    color: theme.colorWhite,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
