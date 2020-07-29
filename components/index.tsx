import React from 'react';
import { Provider } from 'react-redux';
// Imports: Screens
import App from './App';
import configureStore from './store/index';
import { PersistGate } from "redux-persist/integration/react";
import { SafeAreaView } from 'react-native';
export default function index() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
        <Provider store={configureStore().store}>
          <PersistGate loading={null} persistor={configureStore().persistor}>
            <App />
          </PersistGate>
        </Provider>
      </SafeAreaView>
  );
};