import React, { useState, useEffect } from 'react';
import { View, Button, Text, Alert, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { BleManager } from 'react-native-ble-plx';

const BluetoothLinkSender = () => {
  const [isBluetoothReady, setIsBluetoothReady] = useState(false);
  const [range, setRange] = useState(100); // Alcance inicial de 100 metros
  const manager = new BleManager();

  useEffect(() => {
    // Esta função será chamada quando o componente for montado
    const subscription = manager.onStateChange((state) => {
      if (state === 'PoweredOn') {
        setIsBluetoothReady(true);
        subscription.remove();
      }
    }, true);

    return () => subscription.remove(); // Limpeza ao desmontar
  }, [manager]);
  // Função para enviar o link via Bluetooth
  const sendBluetoothLink = async () => {
    try {
      // Verifique se o Bluetooth está pronto para uso
      if (!isBluetoothReady) {
        Alert.alert('Bluetooth não está pronto. Verifique as configurações.');
        return;
      }

      // Implemente a lógica para enviar o link com o alcance especificado
      const linkToSend = 'https://example.com/';
      await NetworkBluetooth.sendLink(linkToSend, range); // Substitua pelo método correto da biblioteca

      Alert.alert(`Link enviado com sucesso dentro do alcance de ${range} metros!`);
    } catch (error) {
      console.error('Erro ao enviar o link via Bluetooth:', error);
      Alert.alert('Erro ao enviar o link. Verifique as configurações e tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Slider
        style={styles.slider}
        minimumValue={10}
        maximumValue={200}
        step={10}
        value={range}
        onValueChange={setRange}
      />
      <Button title="Enviar Link via Bluetooth" onPress={sendBluetoothLink} />
      <Text>Alcance Atual: {range} metros</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
    padding: 20, // Adiciona um pouco de espaço em volta dos elementos
  },
  slider: {
    width: '100%', // O Slider ocupa toda a largura disponível
    marginBottom: 60, // Adiciona um espaço abaixo do Slider
  },
});

export default BluetoothLinkSender;


