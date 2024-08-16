"use client";
import { Provider } from "react-redux";
import { makeStore } from "./store";
import { persistStore } from "redux-persist";
import { PersistGate } from 'redux-persist/integration/react';

const store = makeStore();
const persistor = persistStore(store);

export default function StoreProvider({ children }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
