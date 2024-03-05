import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import ticketReducer from '../features/tickets/ticketSlice';
import notereducer from '../features/notes/noteSlice';


export const store = configureStore({
  reducer: {
   auth:authReducer,
   tickets:ticketReducer,
   notes:notereducer,
  },
});
