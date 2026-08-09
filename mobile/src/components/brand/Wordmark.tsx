import { StyleSheet, Text, View } from 'react-native';

import { IHO } from '@/constants/iho-theme';
import { BottleCapMark } from './BottleCapMark';

type WordmarkProps = {
  size?: number;
  capAsO?: boolean;
};

export function Wordmark({
  size = 38,
  capAsO = true,
}: WordmarkProps) {
  if (capAsO) {
    return (
      <View style={styles.row}>
        <Text
          style={[
            styles.light,
            {
              fontSize: size,
              letterSpacing: size * -0.055,
            },
          ]}
        >
          imhaving
        </Text>


        <Text
          style={[
            styles.bold,
            {
              fontSize: size,
              letterSpacing: size * -0.055,
            },
          ]}
        >
          One.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.row}>
      <Text
        style={[
          styles.light,
          {
            fontSize: size,
            letterSpacing: size * -0.055,
          },
        ]}
      >
        imhaving
      </Text>

      <Text
        style={[
          styles.bold,
          {
            fontSize: size,
            letterSpacing: size * -0.055,
          },
        ]}
      >
        One.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  light: {
    fontFamily: 'DMSans_400Regular',
    color: IHO.colors.charcoal,
  },

  bold: {
    fontFamily: 'DMSans_700Bold',
    color: IHO.colors.mint,
  },
});