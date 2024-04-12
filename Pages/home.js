
import React, { useEffect, useState, useContext, useRef } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  Button,
  Platform,
  Alert,
  Switch,
  Image,
  StyleSheet,
  Linking
} from 'react-native'; //import de elementos do proprio react
// import Mensage from '../Components/message.js'
import { Picker } from '@react-native-picker/picker'; //usado para fazer lista de items
import DateTimePicker from '@react-native-community/datetimepicker'; //seletor de data
import stylesY from '../Styles/estilos.js'; //estilos da pagina
import { Entypo } from '@expo/vector-icons'; //pacote de icones
import { useNavigation } from "@react-navigation/native"; //navegacao entre paginas
import { getLatitude } from '../Components/mapa.js'; // latitude do dispositivo
import MapView, { Marker } from 'react-native-maps'; // marcador do mapa
import * as Location from 'expo-location'; // pacote para a localização
import * as ImagePicker from 'expo-image-picker'; //seletor de imagem
import { ThemeContext } from '../Styles/temaContext.js'; // Importe o ThemeContext
import * as Device from 'expo-device'; //pega informações do dispositivo
import * as Notifications from 'expo-notifications'; //notificações pop up
import Constants from 'expo-constants'; //constantes para o projeto
import { Gyroscope } from 'expo-sensors';

export default function App() {

  //mensagem codigo da propria documentação
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });


  // Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications
  // aqui são definidas as informações do pop up
  async function sendPushNotification(expoPushToken) {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: taskTitle,
      body: taskCategory,
      data: { someData: 'tarefa criada com sucesso'},
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig.extra.eas.projectId,
      });
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }

    return token.data;
  }

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);


  //constantes do projeto
  const { theme, toggleTheme, configTextColor } = useContext(ThemeContext); // Acesse o tema atual
  const navigation = useNavigation(); //navegação
  const styles = stylesY(theme);

  const [location, setLocation] = useState(null); //armazena a localização
  const [markerLocation, setMarkerLocation] = useState(null); //armazena o marcador
  const [latitude, setLatitude] = useState(null); //armazena o latitude
  const [longitude, setLongitude] = useState(null);//armazena o longitude

  const [tasks, setTasks] = useState([]); //armazena as tarefas
  const [selectedTasks, setSelectedTasks] = useState([]); //armazena quais tarefas selecionadas
  const [taskTitle, setTaskTitle] = useState(''); //armazena o titulo das tarefas
  const [taskDate, setTaskDate] = useState(new Date()); //armazena a data das tarefas
  const [taskTime, setTaskTime] = useState(new Date()); //armazena a hora das tarefas
  const [taskLocation, setTaskLocation] = useState(''); //armazena a localização das tarefas
  const [taskCategory, setTaskCategory] = useState(''); //armazena a categoria
  const [modalVisible, setModalVisible] = useState(false); //modal visivel ou não
  const [openModalImg, setopenModalImg] = useState(false); //modal 2
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [filter, setFilter] = useState('Pendentes'); // Alterado de 'Todos' para 'Pendentes'
  const [image, setImage] = useState(null);

  //cores das categorias que existem
  const categoryColors = {
    'Atribuído a Mim': '#40f3ff',
    'Meu Dia': '#f8fa7a',
    'Planejado': '#66ff87',
    'Importante': '#ff7575',
    'Tarefas': '#d780ff',
    'Pendentes': '#DDDDDD', // Alterado de 'Todos' para 'Pendentes'
    'Concluído': '#ccc'
  };

  const handleAddTask = () => {
    if (taskTitle.trim() === '') {
      return;
    }

    //abaixo é setado a tarefa com os devidos dados
    const newTask = {
      id: Date.now(),
      title: taskTitle,
      date: taskDate,
      time: taskTime,
      location: taskLocation,
      category: taskCategory,
      color: categoryColors[taskCategory],
      completed: false,
      image: image
    };

    if (isEditing) {
      setTasks(tasks.map(task => selectedTasks.includes(task.id) ? newTask : task));
      setIsEditing(false);
      setSelectedTasks([]);
    } else {
      setTasks([newTask, ...tasks]);
    }

    setTaskTitle('');
    setTaskDate(new Date());
    setTaskTime(new Date());
    setTaskLocation('');
    setTaskCategory('');
    setModalVisible(false);
    setopenModalImg(false);
    setImage(null);
  };

  const handleSelectTask = (id) => {
    if (selectedTasks.includes(id)) {
      setSelectedTasks(selectedTasks.filter((taskId) => taskId !== id));
    } else {
      setSelectedTasks([...selectedTasks, id]);
    }
  };

  const handleEditTask = (task) => {
    setTaskTitle(task.title);
    setTaskDate(task.date);
    setTaskTime(task.time);
    setTaskLocation(task.location);
    setTaskCategory(task.category);
    setSelectedTasks([task.id]);
    setIsEditing(true);
    setModalVisible(true);
    setImage(task.image);
  };

  const handleDeleteTasks = () => {
    setTasks(tasks.filter((task) => !selectedTasks.includes(task.id)));
    setSelectedTasks([]);
  };

    const onChangeDate = (event, selectedDate) => {
      const currentDate = selectedDate || taskDate;
      setDatePickerVisible(Platform.OS === 'ios');
      setTaskDate(currentDate);
    };

    const onChangeTime = (event, selectedTime) => {
      const currentTime = selectedTime || taskTime;
      setTimePickerVisible(Platform.OS === 'ios');
      setTaskTime(currentTime);
    };
  //filtro das categorias
  const handleFilter = (category) => {
    setFilter(category);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'Pendentes') {
      return !task.completed;
    } else if (filter === 'Concluído') {
      return task.completed;
    }
    return task.category === filter && !task.completed; // Adicionado !task.completed para excluir tarefas concluídas
  });
  //ordem de data
  const sortedTasks = filteredTasks.sort((a, b) => {
    const dateA = new Date(a.date.getFullYear(), a.date.getMonth(), a.date.getDate(), a.time.getHours(), a.time.getMinutes());
    const dateB = new Date(b.date.getFullYear(), b.date.getMonth(), b.date.getDate(), b.time.getHours(), b.time.getMinutes());
    return dateA - dateB;
  });


  //permissao de localização
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permissão de localização negada');
        return;
      }

      let locationWatcher = await Location.watchPositionAsync({
        accuracy: Location.Accuracy.High,
        timeInterval: 1000,
        distanceInterval: 1
      }, (location) => {
        setLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.021,
        });
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
      });

      return () => {
        locationWatcher.remove();
      };
    })();
  }, []);

  //marcador
  const onMapPress = (e) => {
    const { coordinate } = e.nativeEvent;
    setMarkerLocation({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0921,
    });

    setLatitude(coordinate.latitude);
    setLongitude(coordinate.longitude);

    console.log('Novo valor de markerLocation:', {
      latitudeValue: coordinate.latitude,
      longitudeValue: coordinate.longitude,
    });
  };


  //image picker
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const [gyroData, setGyroData] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    _subscribe();
    return () => {
      _unsubscribe();
    };
  }, []);
  const _subscribe = () => {
    Gyroscope.setUpdateInterval(500);
    this._subscription = Gyroscope.addListener(gyroscopeData => {
      setGyroData(gyroscopeData);
      if (Math.abs(gyroscopeData.x) > 6 || Math.abs(gyroscopeData.y) > 6 || Math.abs(gyroscopeData.z) > 6) {
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

  //parte visual do codigo
  return (
    <View style={[styles.container, { backgroundColor: theme === 'light' ? '#fff' : '#000' }]}>
      <TouchableOpacity onPress={() => navigation.navigate('Configurações')}>
        <Entypo name="menu" size={24} color={theme === 'light' ? 'black' : 'white'} />
      </TouchableOpacity>

      {/* <TouchableOpacity onPress={navigation.navigate('Login')}>
        <Text>Login</Text>
        
      </TouchableOpacity> */}

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, marginTop: 20 }}>
        <TouchableOpacity style={[styles.button_cat, { backgroundColor: categoryColors['Atribuído a Mim'] }]} onPress={() => handleFilter('Atribuído a Mim')}>
          <Text style={styles.buttonText}>Atribuído a Mim</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button_cat, { backgroundColor: categoryColors['Meu Dia'] }]} onPress={() => handleFilter('Meu Dia')}>
          <Text style={styles.buttonText}>Meu Dia</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button_cat, { backgroundColor: categoryColors['Planejado'] }]} onPress={() => handleFilter('Planejado')}>
          <Text style={styles.buttonText}>Planejado</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
        <TouchableOpacity style={[styles.button_cat, { backgroundColor: categoryColors['Importante'] }]} onPress={() => handleFilter('Importante')}>
          <Text style={styles.buttonText}>Importante</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button_cat, { backgroundColor: categoryColors['Tarefas'] }]} onPress={() => handleFilter('Tarefas')}>
          <Text style={styles.buttonText}>Tarefas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button_cat, { backgroundColor: categoryColors['Pendentes'] }]} onPress={() => handleFilter('Pendentes')}>
          <Text style={styles.buttonText}>Pendentes</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
        <TouchableOpacity style={[styles.button_cat, { backgroundColor: categoryColors['Concluído'] }]} onPress={() => handleFilter('Concluído')}>
          <Text style={styles.buttonText}>Concluído</Text>
        </TouchableOpacity>
      </View>
      {/* lista com as categorias */}
      <FlatList
        data={sortedTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[
            { backgroundColor: item.color }, styles.taskContainer
          ]}>
            <TouchableOpacity
              style={[
                { backgroundColor: item.color },
                selectedTasks.includes(item.id) && styles.selectedTask,
              ]}
              onPress={() => handleEditTask(item)}
              onLongPress={() => handleSelectTask(item.id)}
            >
              <Text style={styles.taskTitle}>{item.title}</Text>
              <Text style={styles.taskDate}>{item.date.toLocaleDateString()}</Text>
              <Text style={styles.taskTime}>{item.time.toLocaleTimeString()}</Text>
              {/* <Text style={styles.taskLocation}>{item.location}</Text> */}
            </TouchableOpacity>
            <Switch value={item.completed}
              onValueChange={(newValue) => {
                setTasks(tasks.map(task => task.id === item.id ? { ...task, completed: newValue } : task));
              }}
            />
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      {selectedTasks.length > 0 && (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDeleteTasks}
        >
          <Text style={[styles.deleteButtonText, { color: configTextColor}]}>Deletar selecionados</Text>
        </TouchableOpacity>
      )}
      {/* modal de criação da tarefa */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{isEditing ? 'Editar Lembrete' : 'Novo Lembrete'}</Text>
          <TextInput
            style={styles.input}
            placeholder="Título"
            value={taskTitle}
            onChangeText={setTaskTitle}
          />


          <TouchableOpacity onPress={() => setopenModalImg(true)}>
            {image && (
              <View onPress={() => setopenModalImg(true)}>
                <Image style={styles.imgNovoContato} source={{ uri: image || setImage }} />
              </View>
            )}

            <TouchableOpacity onPress={pickImage}>
              <Text style={styles.inputImage}>Selecionar Imagem</Text>
            </TouchableOpacity>

            <Image source={{ uri: image }} style={{ width: 50, height: 50 }} />
          </TouchableOpacity>


          <TouchableOpacity onPress={() => setDatePickerVisible(true)}>
            <Text style={styles.input}>{taskDate.toLocaleDateString()}</Text>
          </TouchableOpacity>


          {datePickerVisible && (
            <DateTimePicker
              testID="datePicker"
              value={taskDate}
              mode={'date'}
              is24Hour={true}
              display="default"
              onChange={onChangeDate}
            />
          )}
          <TouchableOpacity onPress={() => setTimePickerVisible(true)}>
            <Text style={styles.input}>{taskTime.toLocaleTimeString()}</Text>
          </TouchableOpacity>
          {timePickerVisible && (
            <DateTimePicker
              testID="timePicker"
              value={taskTime}
              mode={'time'}
              is24Hour={true}
              display="default"
              onChange={onChangeTime}
            />
          )}
          <View>

            <Text style={styles.input}>Selecione a localização:</Text>
            {location && (
              <MapView
                style={{
                  width: '100%',
                  height: 200,
                }}
                initialRegion={location}
                onPress={onMapPress}
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

          <Picker
            selectedValue={taskCategory}
            style={styles.input}
            onValueChange={(itemValue, itemIndex) => setTaskCategory(itemValue)}
          >
            <Picker.Item label="Atribuído a Mim" value="Atribuído a Mim" />
            <Picker.Item label="Meu Dia" value="Meu Dia" />
            <Picker.Item label="Planejado" value="Planejado" />
            <Picker.Item label="Importante" value="Importante" />
            <Picker.Item label="Tarefas" value="Tarefas" />
          </Picker>
          <View style={styles.buttonContainer}>

            <Button
              title={isEditing ? 'Salvar' : 'Adicionar'}
              onPress={async () => {
                handleAddTask();
                await sendPushNotification(expoPushToken);
              }}
            />
            <Button title="Cancelar" onPress={() => {
              setModalVisible(false);
              setIsEditing(false);
              setSelectedTasks([]);
            }} />
          </View>
        </View>
      </Modal>

      {/* modal visualização tem tela cheia da imagem */}
      <Modal visible={openModalImg} animationType="slide" style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }} >
        <View style={{
          width: '100%', // ajuste conforme necessário
          height: '100%',
          alignSelf: 'center', // adicionado para centralizar a imagem
          marginVertical: 100
        }} >

          <Text style={{ textAlign: 'center' }}>hehe</Text>
          <Image source={{ uri: image }} style={{
            width: 150, // ajuste conforme necessário
            height: 150,
            alignSelf: 'center', // adicionado para centralizar a imagem
          }} />
          <TouchableOpacity onPress={() => setopenModalImg(false)} >
            <Text style={{ fontSize: 30, textAlign: 'center' }}>Ok</Text>
          </TouchableOpacity>
        </View>

      </Modal>

    </View>
  );
}