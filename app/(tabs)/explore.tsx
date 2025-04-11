import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

import MapView from 'react-native-maps';

import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

export default function TabTwoScreen() {
  const [location, setLocation] = useState<Location.LocationObject>();
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    getCurrentLocation();
  });

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('You must grant location permissions to use this feature');
      return;
    }
    setLocation(await Location.getCurrentPositionAsync());
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore</ThemedText>
      </ThemedView>
      {errorMsg ? (
        <ThemedView>
          <ThemedText>{errorMsg}</ThemedText>
        </ThemedView>
      ) : location ? (
        <ThemedView>
          <MapView
            initialRegion={{
              latitude: location!.coords.latitude,
              longitude: location!.coords.longitude,
              latitudeDelta: location!.coords.accuracy || 0,
              longitudeDelta: location!.coords.accuracy || 0,
            }}
            style={styles.map}
          />
        </ThemedView>
      ) : (
        <ThemedView>
          <ThemedText>{errorMsg}</ThemedText>
        </ThemedView>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  }
});

