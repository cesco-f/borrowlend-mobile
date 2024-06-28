import React from 'react';
import {StyleProp, Text, TextStyle} from 'react-native';
import {theme} from '../../theme';

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
