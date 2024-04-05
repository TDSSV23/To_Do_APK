// themeContext.js
import React, { createContext, useState, useEffect } from 'react';

// Cria um Contexto de Tema
export const ThemeContext = createContext();

// Cria um provedor de tema
export const ThemeProvider = (props) => {
  const [theme, setTheme] = useState('light'); // Define o tema inicial
  const [configTextColor, setConfigTextColor] = useState('#000'); // Define a cor inicial do texto do botão para a página Config

  // Função para alternar o tema
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Atualiza a cor do texto do botão quando o tema muda
  useEffect(() => {
    setConfigTextColor(theme === 'light' ? '#000' : '#fff');
    console.log(theme, configTextColor)
  }, [theme]);

  // O valor que será fornecido ao resto da aplicação
  const value = { theme, toggleTheme, configTextColor };

  return <ThemeContext.Provider value={value}>{props.children}</ThemeContext.Provider>;
};
