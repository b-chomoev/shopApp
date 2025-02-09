import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { categoriesReducer } from '../features/categories/categoriesSlice';
import { usersReducer } from '../features/users/usersSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist/es/constants';
import { productsAdminReducer } from '../features/admin/productsAdminSlice';
import { productsReducer } from '../features/products/productsSlice';

const userPersistConfig = {
  key: 'store:users',
  storage,
  whitelist: ['user'], // slice state
};

const rootReducer = combineReducers({
  adminProducts: productsAdminReducer,
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