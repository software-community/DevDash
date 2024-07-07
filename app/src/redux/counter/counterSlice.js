import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  entryNumber: null,
};

export const entryNumberSlice = createSlice({
  name: 'entryNumber',
  initialState,
  reducers: {
    setEntryNumber: (state, action) => {
      state.entryNumber = action.payload;
    },
  },
});

export const { setEntryNumber } = entryNumberSlice.actions;

export default entryNumberSlice.reducer;
