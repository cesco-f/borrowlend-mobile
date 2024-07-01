// import React from 'react';
// import {View, StyleSheet, Pressable, LayoutAnimation} from 'react-native';
// import {format} from 'date-fns';
// import {MoodOptionWithTimestamp} from '../types';
// import {theme} from '../theme';
// import {BLText} from './UIKit/BLText';
// import {useAppContext} from '../App.provider';
// import {Gesture, GestureDetector} from 'react-native-gesture-handler';
// import Animated, {
//   useAnimatedStyle,
//   useSharedValue,
//   withTiming,
//   runOnJS,
// } from 'react-native-reanimated';

// type MoodItemRowProps = {
//   item: MoodOptionWithTimestamp;
// };

// const maxSwipe = 80;

// export const MoodItemRow: React.FC<MoodItemRowProps> = ({item}) => {
//   const appContext = useAppContext();

//   const handleDelete = React.useCallback(() => {
//     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//     appContext.handleDeleteMood(item);
//   }, [appContext, item]);

//   const translateX = useSharedValue(0);

//   const onDrag = Gesture.Pan()
//     .onChange(event => {
//       translateX.value = event.translationX;
//     })
//     .onEnd(event => {
//       if (Math.abs(event.translationX) > maxSwipe) {
//         translateX.value = withTiming(1000 * Math.sign(event.translationX));
//         runOnJS(handleDelete)();
//       } else {
//         translateX.value = withTiming(0);
//       }
//     });

//   const cardStyle = useAnimatedStyle(
//     () => ({transform: [{translateX: translateX.value}]}),
//     [],
//   );

//   return (
//     <GestureDetector gesture={onDrag}>
//       <Animated.View style={[styles.moodItem, cardStyle]}>
//         <View style={styles.iconAndDescription}>
//           <BLText style={styles.moodValue} content={item.mood.emoji} />
//           <BLText
//             style={styles.moodDescription}
//             content={item.mood.description}
//           />
//         </View>
//         <BLText
//           style={styles.moodDate}
//           content={format(
//             new Date(item.timestamp),
//             "dd MMM, yyyy 'at' h:mmaaa",
//           )}
//         />
//         <Pressable hitSlop={16} onPress={handleDelete}>
//           <BLText style={styles.deleteText} content="Delete" />
//         </Pressable>
//       </Animated.View>
//     </GestureDetector>
//   );
// };

// const styles = StyleSheet.create({
//   moodValue: {
//     textAlign: 'center',
//     fontSize: 40,
//     marginRight: 10,
//   },
//   moodDate: {
//     textAlign: 'center',
//     color: theme.colorLavender,
//   },
//   moodItem: {
//     backgroundColor: 'white',
//     marginBottom: 10,
//     padding: 10,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   moodDescription: {
//     fontSize: 18,
//     color: theme.colorPurple,
//     fontWeight: 'bold',
//   },
//   iconAndDescription: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   deleteText: {
//     color: theme.colorBlue,
//   },
// });
