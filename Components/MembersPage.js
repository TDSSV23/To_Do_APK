import React from 'react';
import { WebView } from 'react-native-webview';
import * as FileSystem from 'expo-file-system';

const MembersPage = () => {
  const [htmlContent, setHtmlContent] = React.useState('');

  React.useEffect(() => {
    const fetchHtmlContent = async () => {
      const fileUri = FileSystem.documentDirectory + 'path/to/your/file.html'; // substitua pelo caminho do seu arquivo
      const content = await FileSystem.readAsStringAsync(fileUri);
      setHtmlContent(content);
    };

    fetchHtmlContent();
  }, []);

  return <WebView source={{ html: htmlContent }} />;
};

export default MembersPage;

