import React, { useEffect, useState } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

let latitudeValue = null;

export const getLatitude = () => latitudeValue;

export default function App() {
    const [location, setLocation] = useState(null);
    const [markerLocation, setMarkerLocation] = useState(null);
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permissão de localização negada');
                return;
            }

            let locationWatcher = await Location.watchPositionAsync({
                accuracy: Location.Accuracy.High,
                timeInterval: 1000,  // Atualizar a localização a cada 1 segundo
                distanceInterval: 1  // Ou sempre que o dispositivo se mover 1 metro
            }, (location) => {
                setLocation({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                });
            });

            // Não se esqueça de parar de observar a localização quando o componente for desmontado
            return () => {
                locationWatcher.remove();
            };
        })();
    }, []);

    const onMapPress = (e) => {
        const { coordinate } = e.nativeEvent;
        setMarkerLocation({
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        });

        latitudeValue = coordinate.latitude;

        // Exibir o novo valor no console
        console.log('Novo valor de markerLocation:', {
            latitudeValue: coordinate.longitude,
            longitude: coordinate.latitude
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.input}>Selecione a localização:</Text>
            {location && (
                <MapView
                    style={styles.map}
                    initialRegion={location}
                    onPress={onMapPress} // Adicione o manipulador de eventos onPress aqui
                >
                    {markerLocation && (
                        <Marker
                            coordinate={markerLocation}
                            title="Novo Marcador"
                        />
                    )}
                </MapView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({

    map: {
        width: 500,
        height: 200,
    },
});
