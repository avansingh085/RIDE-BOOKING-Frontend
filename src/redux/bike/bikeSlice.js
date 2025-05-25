import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as bikeAPI from './bikeAPI';
import reducer from '../user/userSlice';

export const fetchBikes = createAsyncThunk('bike/fetchAll', async () => {
  const res = await bikeAPI.getAllBikes();
  return res.data.data;
});

export const createNewBike = createAsyncThunk('bike/create', async (data) => {
  const res = await bikeAPI.createBike(data);
  return res.data.data;
});

export const updateExistingBike = createAsyncThunk('bike/update', async ({ id, data }) => {
  const res = await bikeAPI.updateBike(id, data);
  return res.data.data;
});

export const deleteExistingBike = createAsyncThunk('bike/delete', async (id) => {
  await bikeAPI.deleteBike(id);
  return id;
});

const bikeSlice = createSlice({
  name: 'bike',
  initialState: {
    bikes: [],
    filters:[],
    loading: false,
    error: null
  },
  reducers: {
    setBikes:(state,action)=>{
      state.bikes=action.payload;
    },
    setFilters:(state,action)=>{
        state.filters=action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBikes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBikes.fulfilled, (state, action) => {
        state.loading = false;
        state.bikes = action.payload;
      })
      .addCase(createNewBike.fulfilled, (state, action) => {
        state.bikes.push(action.payload);
      })
      .addCase(updateExistingBike.fulfilled, (state, action) => {
        const index = state.bikes.findIndex(b => b._id === action.payload._id);
        if (index !== -1) state.bikes[index] = action.payload;
      })
      .addCase(deleteExistingBike.fulfilled, (state, action) => {
        state.bikes = state.bikes.filter(b => b._id !== action.payload);
      });
  }
});
export const {setBikes,setFilters}=bikeSlice.actions;
export default bikeSlice.reducer;
