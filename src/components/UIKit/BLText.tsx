import React from 'react';
import {StyleProp, TextStyle} from 'react-native';
import {theme} from '../../theme';
import {Text} from 'react-native-paper';

export const BLText = ({
  content,
  style,
}: {
  content: string;
  style?: StyleProp<TextStyle> & {fontWeight?: 'bold'};
}) => {
  return (
    <Text
      style={[
        style,
        {
          fontFamily:
            style?.fontWeight === 'bold'
              ? theme.fontFamilyBold
              : theme.fontFamilyRegular,
          fontWeight: undefined,
        },
      ]}>
      {content}
    </Text>
  );
};
