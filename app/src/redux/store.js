import { configureStore } from '@reduxjs/toolkit';
import entryNumberReducer from './counter/counterSlice';

const store = configureStore({
  reducer: {
    entryNumber: entryNumberReducer,
    // Add other reducers here if needed
  },
});

export default store;
