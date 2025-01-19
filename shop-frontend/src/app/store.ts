import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { productsReducer } from '../features/products/productsSlice.ts';
import { categoriesReducer } from '../features/categories/categoriesSlice.ts';
import { usersReducer } from '../users/usersSlice.ts';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist/es/constants';

const userPersistConfig = {
  key: 'store:users',
  storage,
  whitelist: ['user'], // slice state
};

const rootReducer = combineReducers({
  products: productsReducer,
  categories: categoriesReducer,
  users: persistReducer(userPersistConfig, usersReducer),
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
