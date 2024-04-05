import * as React from 'react';
import { Button, Menu, Divider, Provider } from 'react-native-paper';

const MyComponent = () => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <Provider>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Button onPress={openMenu}>Menu</Button>}
      >
        <Menu.Item onPress={() => {}} title="Atribuído a mim" />
        <Divider />
        <Menu.Item onPress={() => {}} title="Importante" />
        <Divider />
        <Menu.Item onPress={() => {}} title="Meu Dia" />
        <Divider />
        <Menu.Item onPress={() => {}} title="Planejado" />
        <Divider />
        <Menu.Item onPress={() => {}} title="Tarefas" />
      </Menu>
    </Provider>
  );
};

export default MyComponent;
