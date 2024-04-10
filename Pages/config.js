// Config.js
import { View, Text, TouchableOpacity, StyleSheet, Image, Linking } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { ThemeContext } from '../Styles/temaContext'; // Importe o ThemeContext
import { BackHandler } from 'react-native';

export default function Header() {
  const navigation = useNavigation();
  const { theme, toggleTheme, configTextColor } = useContext(ThemeContext); // Acesse a cor do texto do botão

  return (
    <View style={[styles.container, { backgroundColor: theme === 'light' ? '#fff' : '#000' }]}>
      <View>
        <Image source={require('../assets/logo-app.jpeg')} style={{ width: 80, height: 80, borderRadius: 10 }} />
        {/* <TouchableOpacity onPress={() => navigation.navigate('Config')}>
          <Text style={[styles.texto, {color: configTextColor}]}>Apagar Contatos</Text>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={toggleTheme}>
          <Text style={[styles.texto, { color: configTextColor }]}>Mudar Tema</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => BackHandler.exitApp()}>
          <Text style={[styles.texto, { color: configTextColor }]}>Fechar App</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login', 'deslogar')}>
          <Text style={[styles.texto, { color: configTextColor }]}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('mailto:support@example.com?subject=Estou com Problemas&body=Descreva o problema encontrado')}>
          <Text style={[styles.texto, { color: configTextColor }]}>Suporte</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[styles.texto, { color: configTextColor }]}>Voltar</Text>
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
    height: '100%'

  },
  texto: {
    fontSize: 20,
    margin: 5
  }
})
