import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/store/createslice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
 
const persistConfig = {
  key: 'root',
  storage,
}
 const rootReducer=combineReducers( {
  counter: counterReducer,
},)
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const makeStore = () => {
  return configureStore({
    reducer:persistedReducer
  });
};
