import React from 'react';
import {StyleProp, TextStyle} from 'react-native';
import {theme} from '../../theme';
import {Text, TextProps} from 'react-native-paper';

export const BLText = ({
  style,
  children,
  ...rest
}: TextProps<unknown> & {
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
      ]}
      {...rest}>
      {children}
    </Text>
  );
};
