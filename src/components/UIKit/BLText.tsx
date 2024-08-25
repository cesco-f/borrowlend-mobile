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

export const BLText = ({
  style,
  children,
  size = 'h3',
  ...rest
}: TextProps<unknown> & {
  style?: Omit<StyleProp<TextStyle>, 'fontWeight' | 'fontSize'> & {
    fontWeight?: 'bold';
  };
  size?: HeadlinesSize;
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
          fontSize: fontSizeMap[size],
        },
      ]}
      {...rest}>
      {children}
    </Text>
  );
};
