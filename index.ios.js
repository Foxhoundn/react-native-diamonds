/* @flow */
import React from 'react';
import { AppRegistry, NavigatorIOS } from 'react-native';
import { Provider } from 'react-redux';

import IndexRoute from './src/views';
import store from './src/store';
import globalStyles from './src/style';

const app = (): React.Element<any> => (
  <Provider store={store}>
    <NavigatorIOS
      style={globalStyles.flex}
      initialRoute={{
        component: IndexRoute,
        title: 'Diamonds',
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
