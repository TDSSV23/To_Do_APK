import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import LoadingScreen from '../Components/Loading';
import { MaterialIcons } from '@expo/vector-icons';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isBiometricsSupported, setIsBiometricsSupported] = useState(false);

  useEffect(() => {
    (async () => {
      const hardware = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      setIsBiometricsSupported(hardware && enrolled);
    })();
  }, []);

  const handleLogin = async () => {

    if ((!username || !password) ) {
      alert('Todos os campos devem ser preenchidos!');
      return;
    }

    // Armazenar os dados em uma constante fixa (como solicitado)
    const fixedUserData = {
      username: 'admin',
      password: 'admin'
    };
0
    // Verificar se os dados fornecidos correspondem aos dados fixos
    if (username === fixedUserData.username && password === fixedUserData.password) {
      // Navegar para a página principal (ou qualquer outra página após o login)

      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        navigation.navigate('Home');
      }, 10000);
    } else {
      alert('Credenciais inválidas. Tente novamente.');
    }

  };

  const handleBiometricLogin = async () => {
    if (isBiometricsSupported) {
      const result = await LocalAuthentication.authenticateAsync();

      if (result.success) {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          navigation.navigate('Home');
        }, 5000);
      } else {
        alert('Falha na autenticação.');
      }
    } else {
      alert('Autenticação biométrica não suportada neste dispositivo.');
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
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
          secureTextEntry={!isPasswordVisible}
        />
        <TouchableOpacity style={styles.visibilityButton} onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <Text style={styles.visibilityButtonText}>{isPasswordVisible ? 'Ocultar' : 'Mostrar'}</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        {isBiometricsSupported && (
          <TouchableOpacity style={styles.buttonBio}>
            <Text onPress={handleBiometricLogin} >
              <MaterialIcons name="fingerprint" size={45} color="#000" />  {/* Substitua o texto pelo ícone */}
            </Text>
          </TouchableOpacity>
        )}
      </View>
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
  buttonBio: {
    marginLeft: 20,
  }
});

export default Login;