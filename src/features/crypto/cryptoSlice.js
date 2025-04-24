import { createSlice } from "@reduxjs/toolkit";
import { mockCryptoData } from "./cryptoData";
import { simulatePriceChange } from "../../utils/priceSimulator";

// Initial state with mock data
const initialState = {
  cryptos: mockCryptoData,
  status: "idle",
  error: null,
  updateInterval: null,
};

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    updateCryptoPrices: (state) => {
      state.cryptos = state.cryptos.map((crypto) => {
        const updatedData = simulatePriceChange(crypto);
        return { ...crypto, ...updatedData };
      });
    },
    setInitialData: (state, action) => {
      state.cryptos = action.payload;
      state.status = "succeeded";
    },
    setUpdateInterval: (state, action) => {
      state.updateInterval = action.payload;
    },
    clearUpdateInterval: (state) => {
      if (state.updateInterval) {
        clearInterval(state.updateInterval);
        state.updateInterval = null;
      }
    },
  },
});

// Action creators
export const {
  updateCryptoPrices,
  setInitialData,
  setUpdateInterval,
  clearUpdateInterval,
} = cryptoSlice.actions;

// Thunks
export const fetchInitialData = () => (dispatch) => {
  // In a real app, we would fetch from an API here
  dispatch(setInitialData(mockCryptoData));
};

export const startLiveUpdates = () => (dispatch, getState) => {
  // Clearing any existing interval first
  const currentInterval = getState().crypto.updateInterval;
  if (currentInterval) {
    clearInterval(currentInterval);
  }

  // Creating a new interval to update prices periodically
  const intervalId = setInterval(() => {
    dispatch(updateCryptoPrices());
  }, 2000); // Updating every 2 seconds

  dispatch(setUpdateInterval(intervalId));
};

export const stopLiveUpdates = () => (dispatch) => {
  dispatch(clearUpdateInterval());
};

// Selectors
export const selectAllCryptos = (state) => state.crypto.cryptos;
export const selectCryptoById = (state, id) =>
  state.crypto.cryptos.find((crypto) => crypto.id === id);

export default cryptoSlice.reducer;
