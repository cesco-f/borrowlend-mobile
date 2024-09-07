import React from 'react';
import {StyleProp, TextStyle} from 'react-native';
import {theme} from '../../theme';
import {Text, TextProps} from 'react-native-paper';

type HeadlinesSize = 'h1' | 'h2' | 'h3' | 'h4' | 'h5';

const fontSizeMap: Record<HeadlinesSize, number> = {
  h5: 10,
  h4: 12,
  h3: 16,
  h2: 20,
  h1: 24,
};

type Colors = 'black' | 'grey' | 'blue' | 'white';

const colorsMap: Record<Colors, string> = {
  grey: theme.colorGrey,
  black: theme.colorBlack,
  blue: theme.colorLightBlue,
  white: theme.colorWhite,
};

export const BLText = ({
  style,
  children,
  size = 'h3',
  color = 'black',
  bold = false,
  ...rest
}: TextProps<unknown> & {
  style?: StyleProp<TextStyle>;
  size?: HeadlinesSize;
  color?: Colors;
  bold?: boolean;
}) => {
  return (
    <Text
      style={[
        style,
        {
          fontFamily: bold ? theme.fontFamilyBold : theme.fontFamilyRegular,
          fontWeight: undefined,
          fontSize: fontSizeMap[size],
          color: colorsMap[color],
        },
      ]}
      {...rest}>
      {children}
    </Text>
  );
};
