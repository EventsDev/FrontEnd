import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View } from 'react-native';
import * as Location from 'expo-location';
import iconsSvgs from '../static-content/svgs/icons-events';

const mockEvent = { description: 'Festa de república +18.', location: { coords: { accuracy: 14.154000282287598, altitude: 0.6999999284744263, altitudeAccuracy: 1, heading: 0, latitude: -20.334559, longitude: -40.289911, speed: 0 }, mocked: false, timestamp: 1683895460981 }, title: 'Calourada UVV', type: 'party', uuid: '85da4f1b-9b5d-4c5e-9f5a-2a768ee12753' };

export interface IRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface IEvent {
  title: string;
  location: Location.LocationObject;
  uuid?: string;
  type: string;
  description: string;
}

const MapViewComponent = () => {
  const [region, setRegion] = useState<IRegion | null>(null);
  const [events, setEvents] = useState<IEvent[]>([mockEvent]);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});

      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  return (
    <>
      {region && <MapView
        style={{ flex: 1 }}
        initialRegion={region}
      >
        <Marker
          coordinate={{ latitude: region.latitude, longitude: region.longitude }}
          title="Você"
          description="Você está perto de festinhas..."
        />
        {
          events.map(({ location, ...ev }, index) => <Marker
            key={index}
            coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }}
            title={ev.title}
            description={ev.description}
          >
            <View style={{ width: 35, height: 35, borderRadius: 50, borderColor: '#333', borderWidth: 2 }}>
              {iconsSvgs.beer()}
            </View>
          </Marker>)
        }
      </MapView>}
    </>
  );
};

export default MapViewComponent;
