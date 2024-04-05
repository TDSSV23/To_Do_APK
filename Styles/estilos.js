import { StyleSheet } from "react-native";
import React, { useEffect, useState, useContext } from 'react';
import { ThemeContext } from '../Styles/temaContext.js'; // Importe o ThemeContext

function stylesY(){
  const { theme, toggleTheme, configTextColor } = useContext(ThemeContext);

 const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme,
      padding: 10,
      paddingTop: 40,
      margin: 0,
    },
    title: {
      marginTop: 45,
      marginBottom: 15,
      fontSize: 24,
      fontWeight: 'bold',
      color: configTextColor
    },
    input: {
      height: 40,
      borderWidth: 0,
      marginBottom: 10,
      paddingHorizontal: 10,
      fontSize: 20,
      color: configTextColor
    },
    buttonContainer: {
      marginTop: 170,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    taskContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
      borderBottomWidth: 1,
      borderBottomColor: configTextColor,
      paddingBottom: 10,
      paddingLeft: 10,
      paddingTop: 10
    },
    taskTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    taskTime: {
      fontSize: 16,
    },
    taskLocation: {
      fontSize: 16,
    },
    addButton: {
      backgroundColor: theme === 'light' ? '#ADD8E6' : '#1cb6e8',
      width: 50,
      height: 50,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      bottom: 20,
      right: 20,
    },
    addButtonText: {
      color: theme === 'light' ? '#fff' : '#000000',
      fontSize: 32,
    },
    inputImage: {
      color: configTextColor,

    },
    button_cat: {
      flex: 1,
      padding: 10,
      marginHorizontal: 5,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      width: 50
    },
    buttonText: {
      color: 'black',
      fontSize: 15,
      fontWeight: 'bold',
    },
    atribuidoAMim: {
      backgroundColor: '#ADFAFF',

    },
    meuDia: {
      backgroundColor: '#FEFFC1',
    },
    planejado: {
      backgroundColor: '#BAFFC9',
    },
    importante: {
      backgroundColor: '#FFAFAF',
    },
    tarefas: {
      backgroundColor: '#EABCFF',
    },    
    modalContainer:{
      padding: 15,
      marginTop: 0,
      height: '100%',
      backgroundColor: theme === 'light' ? '#fff' : '#000000',
    },

});
return styles;
}

export default stylesY;
