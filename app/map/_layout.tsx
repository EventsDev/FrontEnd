import React from 'react';
import MapView, { Marker } from 'react-native-maps';

const MapViewComponent = () => {
  const region = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={region}
    >
      <Marker
        coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
        title="Exemplo de Marcador"
        description="Descrição do Marcador"
      />
    </MapView>
  );
};

export default MapViewComponent;
