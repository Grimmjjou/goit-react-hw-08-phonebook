import { createSlice } from '@reduxjs/toolkit';

const initialState = { filter: '' };

const filterSlice = createSlice({
  name: 'filter',
  initialState,

  reducers: {
    getFilterValue: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { getFilterValue } = filterSlice.actions;
const filterReducer = filterSlice.reducer;
export default filterReducer;
