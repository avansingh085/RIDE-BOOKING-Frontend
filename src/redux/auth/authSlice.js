import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { registerUser, loginUser } from './authAPI';

export const register = createAsyncThunk('auth/register', async (data, thunkAPI) => {
  try {
    const res = await registerUser(data);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message || 'Registration failed');
  }
});

export const login = createAsyncThunk('auth/login', async (data, thunkAPI) => {
  try {
    const res = await loginUser(data);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message || 'Login failed');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        localStorage.setItem('BikeToken',action.payload.token);
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
         state.user = action.payload.user;
        localStorage.setItem('BikeToken',action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
