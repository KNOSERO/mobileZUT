import React from 'react';
import {Provider} from 'react-redux';
import store from './api/redux/store';
import RootNavigation from './api/navigation/root';

import { WebView } from 'react-native-webview';
import { View, Text, SafeAreaView} from 'react-native';


const App = () => {
  return (  
  <Provider store={store}>
    <RootNavigation/>
  </Provider>
  );
};

export default App;
