import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUser, updateUser, deleteUser } from './userAPI';

export const fetchUser = createAsyncThunk('user/fetch', async (thunkAPI) => {
  try {
   
    const res = await getUser();
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Error fetching user');
  }
});

export const updateUserProfile = createAsyncThunk('user/update', async (data, thunkAPI) => {
  try {
    console.log(data);
    const res = await updateUser(data);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Error updating user');
  }
});

export const deleteUserProfile = createAsyncThunk('user/delete', async ( thunkAPI) => {
  try {
    const res = await deleteUser();
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Error deleting user');
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null,
   
    loading: true,
    error: null,
    deleted: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.deleted = false;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload;

      })
      .addCase(deleteUserProfile.fulfilled, (state) => {
        state.deleted = true;
        state.profile = null;
      });
  },
});

export default userSlice.reducer;
