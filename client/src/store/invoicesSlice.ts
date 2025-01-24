import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { logout } from './authSlice';
import { RootState } from './index';

interface Invoice {
  id: number;
  amount: number;
  date: string;
  user_id: number;
}

interface InvoicesState {
  invoices: Invoice[];
  isLoading: boolean;
  error: string | null;
}

const initialState: InvoicesState = {
  invoices: [],
  isLoading: false,
  error: null,
};

export const fetchInvoices = createAsyncThunk(
  'invoices/fetchInvoices',
  async (_, thunkAPI) => {
    try {
      //console.log('Fetching invoices with Bearer token...');
      const token = localStorage.getItem('token');
      // if (!token) {
      //   return thunkAPI.rejectWithValue('Session expired. Please log in!');
      // }
      if (!token) {
        return thunkAPI.rejectWithValue('Unauthorized: No token provided');
      }

      const response = await fetch('http://localhost:3000/invoices', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //console.log('Response status:', response.status);
      if (!response.ok) {
        if (response.status === 401) {
          console.error('Error: Unauthorize');
          thunkAPI.dispatch(logout());
          return thunkAPI.rejectWithValue('Session expired.  Please log in.');          
        }
        throw new Error(`Failed to fetch invoices: ${response.statusText}`);
      }

      const data = await response.json();
      //console.log('Fetched invoices:', data);
      return data;

    } catch (error: any) {
      //console.error('Error fetching invoices:', error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const invoicesSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoices.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.invoices = action.payload;
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectInvoices = (state: RootState) => state.invoices;
export default invoicesSlice.reducer;
