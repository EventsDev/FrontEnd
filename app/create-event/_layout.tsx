import { Link } from "expo-router";
import React, { useState } from "react";
import * as Location from 'expo-location';
import { View, Text, TextInput, Button } from "react-native";
import { RadioButton } from "react-native-paper";
import styles from "./style";
import MapView, { LatLng, Marker } from "react-native-maps";

export interface IEvent {
  title: string;
  type: string;
  description: string;
  location: Location.LocationObject | null;
}

export interface IAddress {
  street: string;
  code: string;
}

interface ILatLong {
  latitude: number;
  longitude: number;
};

const CreateEventScreen = () => {
  const [title, setTitle] = useState<string>('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [locationOption, setLocationOption] = useState('current');
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  // const [address, setAddress] = useState<IAddress | null>(null);
  const [address, setAddress] = useState<string>('');
  const [eventMarker, setEventMarker] = useState<LatLng>();

  const onConfirmLocation = () => {
    // código para confirmar a localização e prosseguir com a criação do evento
    console.log('@eventMarker', eventMarker);
  };

  const handleSubmit = async () => {
    if (locationOption === 'current') {
      setLocation(await Location.getCurrentPositionAsync());
    } else {
      // converter endereço p/ location
    }

    const newEvent: IEvent = {
      title,
      type,
      description,
      location,
    };
    console.log(newEvent);
  };

  const onMapPress = (e: { nativeEvent: { coordinate: LatLng } }) => {
    if (locationOption === 'address') {
      setEventMarker(e.nativeEvent.coordinate as LatLng);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
      <Text style={{ fontSize: 24, textAlign: 'center', marginBottom: 16 }}>Criar Evento</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Título do Evento"
        style={{ marginBottom: 8, borderBottomWidth: 1, borderColor: 'gray' }}
      />
      <TextInput
        value={type}
        onChangeText={setType}
        placeholder="Tipo de Evento"
        style={{ marginBottom: 8, borderBottomWidth: 1, borderColor: 'gray' }}
      />
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Descrição do Evento"
        style={{ marginBottom: 8, borderBottomWidth: 1, borderColor: 'gray' }}
      />
      <RadioButton.Group
        onValueChange={(newValue) => setLocationOption(newValue)}
        value={locationOption}
      >
        <Text style={{ fontWeight: "600" }}>Local:</Text>
        <View style={styles.containerRadioButton}>
          <View style={styles.viewRadioButton}>
            <RadioButton value="current" />
            <Text>Localização Atual</Text>
          </View>
          <View style={styles.viewRadioButton}>
            <RadioButton value="address" />
            <Text>Outro Endereço</Text>
          </View>
        </View>
      </RadioButton.Group>
      {locationOption === 'address' && (
        <>
          <MapView
            style={styles.mapStyle}
            onPress={onMapPress}
          >
            {eventMarker && <Marker coordinate={eventMarker} />}
          </MapView>
          <Button title="Confirmar Localização" onPress={onConfirmLocation} />
        </>
      )}
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default CreateEventScreen;
