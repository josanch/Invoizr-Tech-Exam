import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import invoicesReducer from './invoicesSlice';
import invoiceDetailsReducer from './invoiceDetailsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    invoices: invoicesReducer,
    invoiceDetails: invoiceDetailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
