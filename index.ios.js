/* @flow */
import React from 'react';
import { AppRegistry, NavigatorIOS } from 'react-native';
import { Provider } from 'react-redux';

import store from './src/store';
import App from './src/app';
import globalStyles from './src/style';

const app = (): React.Element<any> => (
  <Provider store={store}>
    <NavigatorIOS
      style={globalStyles.flex}
      initialRoute={{
      component: App,
      title: 'bubbles',
      navigationBarHidden: true,
      statusBarHidden: true,
    }}
      itemWrapperStyle={{
      backgroundColor: '#111'
    }}
    />
  </Provider>
);

AppRegistry.registerComponent('diamonds', () => app);
