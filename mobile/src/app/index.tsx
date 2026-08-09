import { router } from 'expo-router';
import { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Line, Path, Rect } from 'react-native-svg';

import { Wordmark } from '@/components/brand/Wordmark';
import { IHO } from '@/constants/iho-theme';

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/welcome');
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.mapBackground}>
        <Svg width="100%" height="100%" viewBox="0 0 390 844">
          <Path
            d="M-30 120 C60 70 100 145 180 110 S320 80 430 130"
            stroke="#DADFDA"
            strokeWidth="1"
            fill="none"
            opacity={0.35}
          />

          <Path
            d="M10 245 C90 190 150 250 230 205 S350 180 420 225"
            stroke="#DADFDA"
            strokeWidth="1"
            fill="none"
            opacity={0.3}
          />

          <Path
            d="M-20 380 C80 325 130 395 205 350 S320 340 420 385"
            stroke="#DADFDA"
            strokeWidth="1"
            fill="none"
            opacity={0.28}
          />

          <Path
            d="M70 -20 C110 100 60 165 125 260 S150 430 90 530"
            stroke="#E2E5E1"
            strokeWidth="1"
            fill="none"
            opacity={0.28}
          />

          <Path
            d="M285 -30 C250 110 325 185 280 300 S260 470 330 560"
            stroke="#E2E5E1"
            strokeWidth="1"
            fill="none"
            opacity={0.28}
          />

          <Circle
            cx="48"
            cy="160"
            r="28"
            fill={IHO.colors.mintSoft}
            opacity={0.35}
          />

          <Circle
            cx="350"
            cy="85"
            r="45"
            fill={IHO.colors.mintSoft}
            opacity={0.28}
          />
        </Svg>
      </View>

      <View style={styles.main}>
        <View style={styles.iconArea}>
          <Image
            source={require('@/assets/images/imhavingone-app-icon.png')}
            style={styles.appIcon}
            resizeMode="contain"
          />
        </View>

        <View style={styles.wordmarkWrap}>
          <Wordmark size={40} capAsO={false} />
        </View>

        <Text style={styles.tagline}>
          SEE WHO&apos;S HAVING ONE, WHERE YOU ARE.
        </Text>

        <Text style={styles.subTagline}>
          KACLINK TO CELEBRATE.
        </Text>

        <View style={styles.drinkStrip}>
          <Svg width="220" height="58" viewBox="0 0 220 58">
            <Path
              d="M18 47 L18 22 L22 17 L22 7 L29 7 L29 17 L33 22 L33 47 Z"
              stroke={IHO.colors.charcoal}
              strokeWidth="1.5"
              fill="none"
            />

            <Path
              d="M55 18 L72 18 L70 47 L57 47 Z"
              stroke={IHO.colors.charcoal}
              strokeWidth="1.5"
              fill="none"
            />

            <Path
              d="M56 22 Q64 18 71 22"
              stroke={IHO.colors.sunshine}
              strokeWidth="3"
              fill="none"
            />

            <Path
              d="M98 17 C98 28 101 34 108 34 C115 34 118 28 118 17 Z"
              stroke={IHO.colors.charcoal}
              strokeWidth="1.5"
              fill="none"
            />

            <Line
              x1="108"
              y1="34"
              x2="108"
              y2="46"
              stroke={IHO.colors.charcoal}
              strokeWidth="1.5"
            />

            <Line
              x1="101"
              y1="46"
              x2="115"
              y2="46"
              stroke={IHO.colors.charcoal}
              strokeWidth="1.5"
            />

            <Path
              d="M140 19 L160 19 L150 31 Z"
              stroke={IHO.colors.charcoal}
              strokeWidth="1.5"
              fill="none"
            />

            <Line
              x1="150"
              y1="31"
              x2="150"
              y2="46"
              stroke={IHO.colors.charcoal}
              strokeWidth="1.5"
            />

            <Line
              x1="144"
              y1="46"
              x2="156"
              y2="46"
              stroke={IHO.colors.charcoal}
              strokeWidth="1.5"
            />

            <Rect
              x="188"
              y="14"
              width="15"
              height="33"
              rx="4"
              stroke={IHO.colors.charcoal}
              strokeWidth="1.5"
              fill="none"
            />
          </Svg>
        </View>
      </View>

      <View style={styles.footer}>
        <Svg
          width="100%"
          height="100%"
          viewBox="0 0 390 210"
          preserveAspectRatio="none"
          style={StyleSheet.absoluteFill}
        >
          <Path
            d="M0 35 Q195 135 390 35 L390 210 L0 210 Z"
            fill={IHO.colors.mint}
          />
        </Svg>

        <View style={styles.loadingArea}>
          <View style={styles.spinnerOuter}>
            <View style={styles.spinnerHighlight} />
          </View>

          <Text style={styles.loadingText}>
            Loading good times...
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
    overflow: 'hidden',
  },

  mapBackground: {
    ...StyleSheet.absoluteFillObject,
  },

  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: IHO.spacing.x5,
    paddingBottom: 80,
    zIndex: 2,
  },

  iconArea: {
    width: 160,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
  },

  appIcon: {
    width: 140,
    height: 140,
  },

  wordmarkWrap: {
    marginBottom: 12,
  },

  tagline: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 11,
    letterSpacing: 0.4,
    color: IHO.colors.mintStrong,
    textAlign: 'center',
  },

  subTagline: {
    marginTop: 7,
    fontFamily: 'DMSans_700Bold',
    fontSize: 10,
    letterSpacing: 0.5,
    color: IHO.colors.charcoal,
    textAlign: 'center',
  },

  drinkStrip: {
    marginTop: 28,
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 210,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  loadingArea: {
    alignItems: 'center',
    paddingBottom: 48,
  },

  spinnerOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.55)',
    marginBottom: 13,
  },

  spinnerHighlight: {
    position: 'absolute',
    width: 7,
    height: 7,
    borderRadius: 99,
    backgroundColor: IHO.colors.paper,
    top: -2,
    left: 7,
  },

  loadingText: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 13,
    color: IHO.colors.paper,
  },
});