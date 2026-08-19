import { router } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Line, Path } from 'react-native-svg';

import { IHO } from '@/constants/iho-theme';

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/imhavingone-app-icon.png')}
        style={styles.appIcon}
        resizeMode="contain"
      />

      <Text style={styles.heading}>
        See who&apos;s{'\n'}
        <Text style={styles.headingMint}>having one.</Text>
      </Text>

      <View style={styles.accentLine} />

      <Text style={styles.description}>
        ImHavingOne shows you, your friends{'\n'}
        and everyone around you who&apos;s{'\n'}
        having a beer or drink.
      </Text>

      <Text style={styles.descriptionSecond}>
        Snap your drink, it appears on the map.{'\n'}
        Tap to see their pic. <Text style={styles.kaClink}>KaClink</Text> what{'\n'}
        you like. Simple as that.
      </Text>

      <View style={styles.features}>
        <FeatureItem type="map" label="Live Map" tone="mint" />
        <FeatureItem type="camera" label="Snap & Share" tone="cream" />
        <FeatureItem type="cheers" label="KaClink" tone="yellow" />
        <FeatureItem type="friends" label="Friends" tone="pink" />
      </View>

      <View style={styles.dots}>
        <View style={[styles.dot, styles.dotActive]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>

      <View style={styles.actions}>
        <Pressable
          style={({ pressed }) => [
            styles.createButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => router.push('/register')}
        >
          <Text style={styles.createButtonText}>
            Create account
          </Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.loginButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => router.push('/login')}
        >
          <Text style={styles.loginButtonText}>
            Log in
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

function FeatureItem({ type, label, tone }) {
  return (
    <View style={styles.featureItem}>
      <View
        style={[
          styles.featureCircle,
          tone === 'mint' && styles.featureMint,
          tone === 'cream' && styles.featureCream,
          tone === 'yellow' && styles.featureYellow,
          tone === 'pink' && styles.featurePink,
        ]}
      >
        <FeatureIcon type={type} />
      </View>

      <Text style={styles.featureLabel}>
        {label}
      </Text>
    </View>
  );
}

function FeatureIcon({ type }) {
  if (type === 'map') {
    return (
      <Svg width="32" height="32" viewBox="0 0 32 32">
        <Path
          d="M16 4C10.8 4 7 7.8 7 12.6C7 19.1 16 28 16 28C16 28 25 19.1 25 12.6C25 7.8 21.2 4 16 4Z"
          fill={IHO.colors.mint}
          stroke={IHO.colors.charcoal}
          strokeWidth="1.5"
        />
        <Circle
          cx="16"
          cy="13"
          r="3.2"
          fill={IHO.colors.paper}
          stroke={IHO.colors.charcoal}
          strokeWidth="1.2"
        />
      </Svg>
    );
  }

  if (type === 'camera') {
    return (
      <Svg width="34" height="34" viewBox="0 0 34 34">
        <Path
          d="M7 11H11L13 8H21L23 11H27C28.7 11 30 12.3 30 14V26C30 27.7 28.7 29 27 29H7C5.3 29 4 27.7 4 26V14C4 12.3 5.3 11 7 11Z"
          fill={IHO.colors.paper}
          stroke={IHO.colors.charcoal}
          strokeWidth="1.5"
        />
        <Circle
          cx="17"
          cy="20"
          r="5"
          fill="none"
          stroke={IHO.colors.charcoal}
          strokeWidth="1.5"
        />
      </Svg>
    );
  }

  if (type === 'cheers') {
    return (
      <Svg width="36" height="36" viewBox="0 0 36 36">
        <Path
          d="M8 13L13 10L19 24L14 27Z"
          fill="#F6B93B"
          stroke={IHO.colors.charcoal}
          strokeWidth="1.3"
        />
        <Path
          d="M28 13L23 10L17 24L22 27Z"
          fill="#F6B93B"
          stroke={IHO.colors.charcoal}
          strokeWidth="1.3"
        />
        <Line
          x1="13"
          y1="10"
          x2="23"
          y2="22"
          stroke={IHO.colors.charcoal}
          strokeWidth="1.3"
        />
        <Line
          x1="23"
          y1="10"
          x2="13"
          y2="22"
          stroke={IHO.colors.charcoal}
          strokeWidth="1.3"
        />
      </Svg>
    );
  }

  return (
    <Svg width="36" height="36" viewBox="0 0 36 36">
      <Circle cx="13" cy="13" r="5" fill={IHO.colors.mint} />
      <Circle cx="24" cy="12" r="5" fill="#EF5C75" />
      <Path
        d="M4 29C4 23.5 7.7 20 13 20C18.3 20 22 23.5 22 29Z"
        fill={IHO.colors.mint}
      />
      <Path
        d="M15 29C15 23.2 18.7 19 24 19C29.3 19 32 23.2 32 29Z"
        fill="#EF5C75"
      />
    </Svg>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: IHO.colors.paper,
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 150,
    paddingBottom: 34,
  },
  appIcon: {
    width: 92,
    height: 92,
    marginBottom: 18,
  },
  heading: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 38,
    lineHeight: 41,
    letterSpacing: -1.2,
    color: IHO.colors.charcoal,
    textAlign: 'center',
  },
  headingMint: {
    color: IHO.colors.mint,
  },
  accentLine: {
    width: 48,
    height: 3,
    borderRadius: 10,
    backgroundColor: '#F6B93B',
    marginTop: 15,
    marginBottom: 17,
  },
  description: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 13,
    lineHeight: 18,
    color: IHO.colors.charcoal,
    textAlign: 'center',
  },
  descriptionSecond: {
    marginTop: 11,
    fontFamily: 'DMSans_400Regular',
    fontSize: 13,
    lineHeight: 18,
    color: IHO.colors.charcoal,
    textAlign: 'center',
  },
  kaClink: {
    fontFamily: 'DMSans_700Bold',
    color: IHO.colors.mint,
  },
  features: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 22,
  },
  featureItem: {
    width: '24%',
    alignItems: 'center',
  },
  featureCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureMint: {
    backgroundColor: '#E2F3EE',
  },
  featureCream: {
    backgroundColor: '#FFF4DF',
  },
  featureYellow: {
    backgroundColor: '#FFF0C8',
  },
  featurePink: {
    backgroundColor: '#E6F2ED',
  },
  featureLabel: {
    marginTop: 6,
    fontFamily: 'DMSans_600SemiBold',
    fontSize: 9,
    color: IHO.colors.charcoal,
    textAlign: 'center',
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 22,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#D9D9D9',
  },
  dotActive: {
    backgroundColor: IHO.colors.mint,
  },
  actions: {
    width: '100%',
    marginTop: 'auto',
    gap: 10,
  },
  createButton: {
    width: '100%',
    height: 54,
    borderRadius: 10,
    backgroundColor: IHO.colors.mint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createButtonText: {
    fontFamily: 'DMSans_600SemiBold',
    fontSize: 15,
    color: '#FFFFFF',
  },
  loginButton: {
    width: '100%',
    height: 54,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D7D9D8',
    backgroundColor: IHO.colors.paper,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    fontFamily: 'DMSans_600SemiBold',
    fontSize: 15,
    color: IHO.colors.charcoal,
  },
  buttonPressed: {
    opacity: 0.78,
  },
});
