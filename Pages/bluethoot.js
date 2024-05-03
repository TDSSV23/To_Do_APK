import React, { useState, useEffect } from 'react';
import { View, Button, Text, Alert, StyleSheet } from 'react-native';
import Blue from '../Components/Blue'

const BluetoothLinkSender = () => {


  return (
    <View style={styles.container}>
        <Text style={styles.txt}>Em desenvolvimento...</Text>
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
  txt: {
    fontSize: 20
  }
});

export default BluetoothLinkSender;


