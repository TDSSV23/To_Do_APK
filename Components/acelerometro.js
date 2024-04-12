import React, { useState, useEffect } from 'react';
import { Text, View, Linking, StyleSheet } from 'react-native';
import { Gyroscope } from 'expo-sensors';

export default function GyroscopeComponent() {
  const [dataGyroscopio, setDataGyroscopio] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    _subscribe();
    return () => {
      _unsubscribe();
    };
  }, []);

  const _subscribe = () => {
    Gyroscope.setUpdateInterval(1000);
    this._subscription = Gyroscope.addListener(gyroscopeData => {
      setDataGyroscopio(gyroscopeData);
      console.log('Gyroscope data:', gyroscopeData); // Log gyroscope data
      if (Math.abs(gyroscopeData.x) > 5 || Math.abs(gyroscopeData.y) > 5 || Math.abs(gyroscopeData.z) > 5) {
        console.log('Opening URL...'); // Log before opening URL
        Linking.openURL('https://joaomanfre.github.io/teste/')
          .then(() => console.log('URL opened')) // Log on success
          .catch(err => console.error('Failed to open URL:', err)); // Log on failure
      }
    });
  };

  const _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  text: {
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
});

