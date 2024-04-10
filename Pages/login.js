import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import LoadingScreen from '../Components/Loading'; // Importe o componente LoadingScreen

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Adicionado estado para controlar a tela de carregamento

  const handleLogin = () => {
    // Validação dos campos
    if (!username || !password) {
      alert('Todos os campos devem ser preenchidos!');
      return;
    }

    // Iniciar a tela de carregamento
    setIsLoading(true);

    // Simular uma tarefa assíncrona (como uma solicitação de login)
    setTimeout(() => {
      // Parar a tela de carregamento
      setIsLoading(false);

      // Navegar para a página inicial após a "tarefa assíncrona" ser concluída
      navigation.navigate('Home');
    }, 3000); // Ajuste este valor para controlar a duração da tela de carregamento
  };

  if (isLoading) {
    return <LoadingScreen />; // Retorne o componente LoadingScreen quando isLoading for true
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome de usuário"
        value={username}
        onChangeText={setUsername}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          maxLength={20}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible} // A senha será visível se isPasswordVisible for true
        />
        <TouchableOpacity style={styles.visibilityButton} onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <Text style={styles.visibilityButtonText}>{isPasswordVisible ? 'Ocultar' : 'Mostrar'}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D3D3D3',
    padding: 50, // Adicionado padding para mover o conteúdo um pouco para baixo
  },
  
  title: {
    fontSize: 40, // Aumentado o tamanho da fonte
    marginBottom: 50, // Aumentado a margem inferior para mover o título um pouco para cima
    color: '#000000',
    fontWeight: 'bold',
  },

  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 15,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: '#000000',
  },

  passwordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 15,
    marginBottom: 20,
    paddingHorizontal: 10,
  },

  visibilityButton: {
    padding: 5,
  },

  visibilityButtonText: {
    color: '#000000',
  },

  button: {
    width: '50%',
    backgroundColor: '#000000',
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default Login;