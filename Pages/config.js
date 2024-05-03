// Config.js
import { View, Text, TouchableOpacity, StyleSheet, Image, Linking } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { ThemeContext } from '../Styles/temaContext'; // Importe o ThemeContext
import { BackHandler } from 'react-native';

export default function Header() {
  const { theme, toggleTheme, configTextColor } = useContext(ThemeContext); // Acesse a cor do texto do botão
  const navigation = useNavigation();

  return (
    <View style={[styles.container, { backgroundColor: theme === 'light' ? '#fff' : '#000' }]}>
      <View style={styles.innerContainer}>
        <Image source={require('../assets/logo-app.jpeg')} style={styles.logo} />
        <TouchableOpacity onPress={toggleTheme} style={styles.button}>
          <Text style={[styles.texto, { color: theme === 'light' ? 'white' : 'black', backgroundColor: theme === 'light' ? 'black' : 'white',}]}>Mudar Tema</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => BackHandler.exitApp()} style={styles.button}>
          <Text style={[styles.texto, {color: theme === 'light' ? 'white' : 'black', backgroundColor: theme === 'light' ? 'black' : 'white'}]}>Fechar App</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login', 'deslogar')} style={styles.button}>
          <Text style={[styles.texto, { color: 'red', backgroundColor: theme === 'light' ? 'black' : 'white'}]}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('mailto:support@example.com?subject=Estou com Problemas&body=Descreva o problema encontrado')} style={styles.button}>
          <Text style={[styles.texto, { color: theme === 'light' ? 'white' : 'black', backgroundColor: theme === 'light' ? 'black' : 'white' , }]}>Suporte</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('blue')} style={styles.button}>
          <Text style={[styles.texto, { color: theme === 'light' ? 'white' : 'black', backgroundColor: theme === 'light' ? 'blue' : 'blue'}]}>Bluetooth</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
          <Text style={[styles.texto, { color: theme === 'light' ? 'white' : 'black', backgroundColor: theme === 'light' ? 'black' : 'white'}]}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    padding: 20,
    paddingTop: 50,
    height: '100%',
    alignItems: 'center', // Centraliza os itens horizontalmente
  },
  innerContainer: {
    alignItems: 'center', // Centraliza os itens verticalmente
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 20, // Adiciona uma margem abaixo da logo
  },
  button: {
    marginVertical: 10, // Adiciona uma margem acima e abaixo dos botões
  },
  texto: {
    width: 120,
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
    color: 'white',
    fontWeight: 800,
    textAlign: 'center'
  }
})
