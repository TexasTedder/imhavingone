import { StyleSheet, Text, View } from 'react-native';

import { IHO } from '@/constants/iho-theme';

export default function HomeScreen() {
  return (
    <View style={styles.container}>

      <View style={styles.content}>
        <View style={styles.brand}>
          <Text style={styles.brandLight}>imhaving</Text>
          <Text style={styles.brandBold}>One.</Text>
        </View>

        <Text style={styles.heading}>
          Who&apos;s having one?
        </Text>

        <Text style={styles.subheading}>
          Your people. Right now.
        </Text>

        <View style={styles.button}>
          <Text style={styles.buttonText}>
            I&apos;M HAVING ONE
          </Text>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: IHO.colors.paper,
    justifyContent: 'center',
  },

  content: {
    paddingHorizontal: IHO.spacing.x5,
  },

  brand: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: IHO.spacing.x8,
  },

  brandLight: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 38,
    letterSpacing: -2.1,
    color: IHO.colors.charcoal,
  },

  brandBold: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 38,
    letterSpacing: -2.1,
    color: IHO.colors.mint,
  },

  heading: {
    fontFamily: 'DMSans_700Bold',
    fontSize: IHO.typography.h1,
    lineHeight: 39,
    letterSpacing: -1,
    color: IHO.colors.charcoal,
  },

  subheading: {
    marginTop: IHO.spacing.x2,
    fontFamily: 'DMSans_400Regular',
    fontSize: IHO.typography.body,
    lineHeight: 24,
    color: IHO.colors.darkGrey,
  },

  button: {
    marginTop: IHO.spacing.x8,
    width: '100%',
    minHeight: 56,
    borderRadius: IHO.radius.pill,
    backgroundColor: IHO.colors.mint,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    fontFamily: 'DMSans_700Bold',
    fontSize: IHO.typography.label,
    letterSpacing: 1.4,
    color: IHO.colors.charcoal,
  },
});