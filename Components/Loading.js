import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';


export default function LoadingScreen() {
  const [sound, setSound] = useState();

  async function playSound() {
    // console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(require('../assets/audio.mp3')
    );
    setSound(sound);

    // console.log('Playing Sound');
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
        // console.log('Unloading Sound');
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);


    // Executa a função automaticamente após a renderização do componente
    useEffect(() => {
      playSound();
    }, []); // Passando um array vazio como segundo argumento para executar a função apenas uma vez
  
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/Animation.json')}
        autoPlay
        loop
        style={{
          width: '100%',
          height: '100%'
        }}
      />
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
});
