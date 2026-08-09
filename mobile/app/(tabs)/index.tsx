import { StyleSheet, Text, View } from 'react-native';

import { IHO } from '@/constants/iho-theme';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.brand}>
        <Text style={styles.brandLight}>ImHaving</Text>
        <Text style={styles.brandBold}>One</Text>
        <View style={styles.liveDot} />
      </View>

      <Text style={styles.heading}>Who&apos;s having one?</Text>

      <Text style={styles.subheading}>
        Your people. Right now.
      </Text>

      <View style={styles.button}>
        <Text style={styles.buttonText}>I&apos;M HAVING ONE</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: IHO.colors.paper,
    justifyContent: 'center',
    paddingHorizontal: IHO.spacing.x5,
  },

  brand: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: IHO.spacing.x8,
  },

  brandLight: {
    fontSize: 38,
    fontWeight: '300',
    letterSpacing: -2,
    color: IHO.colors.charcoal,
  },

  brandBold: {
    fontSize: 38,
    fontWeight: '900',
    letterSpacing: -2,
    color: IHO.colors.mint,
  },

  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 999,
    backgroundColor: IHO.colors.mint,
    marginLeft: 4,
    marginBottom: 5,
  },

  heading: {
    fontSize: IHO.typography.h1,
    fontWeight: '700',
    letterSpacing: -1,
    color: IHO.colors.charcoal,
  },

  subheading: {
    marginTop: IHO.spacing.x2,
    fontSize: IHO.typography.body,
    color: IHO.colors.darkGrey,
  },

  button: {
    marginTop: IHO.spacing.x8,
    minHeight: 54,
    borderRadius: IHO.radius.pill,
    backgroundColor: IHO.colors.mint,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: IHO.colors.charcoal,
    fontSize: IHO.typography.label,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
});