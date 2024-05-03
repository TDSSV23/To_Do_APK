import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, Text, TouchableOpacity } from 'react-native';
import { BleManager } from 'react-native-ble-plx';

export default function App() {
  const [devices, setDevices] = useState([]);
  const [manager, setManager] = useState(null);

  useEffect(() => {
    const manager = new BleManager();
    setManager(manager);

    const subscription = manager.onStateChange((state) => {
      if (state === 'PoweredOn') {
        scanDevices();
        subscription.remove();
      }
    }, true);
  }, []);

  const scanDevices = () => {
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log(error);
      }

      if (device) {
        setDevices((oldDevices) => [...oldDevices, device]);
      }
    });
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity style={{ padding: 10 }}>
      <Text>{item.name}</Text>
      <Text>{item.id}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView>
      <FlatList
        data={devices}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}
