import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface InvoiceDetailsState {
  invoice: any | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: InvoiceDetailsState = {
  invoice: null,
  isLoading: false,
  error: null,
};

export const fetchInvoiceDetails = createAsyncThunk(
    'invoiceDetails/fetchInvoiceDetails',
    async (id: string, thunkAPI) => {
      try {
        // Retrieve the token from localStorage
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Unauthorized: Token missing');
        }
  
        const response = await fetch(`http://localhost:3000/invoices/${id}`, {
          headers: {
            // Add the Bearer token
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Unauthorized: Session expired');
          }
          throw new Error('Failed to fetch invoice details');
        }
  
        return await response.json();
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
  

const invoiceDetailsSlice = createSlice({
  name: 'invoiceDetails',
  initialState,
  reducers: {
    clearInvoiceDetails(state) {
      state.invoice = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoiceDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchInvoiceDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.invoice = action.payload;
      })
      .addCase(fetchInvoiceDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearInvoiceDetails } = invoiceDetailsSlice.actions;
export default invoiceDetailsSlice.reducer;
