import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { REACT_APP_BASE_URL } from "@env";

export const getAllCountries = createAsyncThunk(
  "getAllCountries",
  async (body) => {
    try {
      const response = await axios.get(`${REACT_APP_BASE_URL}/country`, {
        headers: { Authorization: `Bearer ${body.token}` },
      });
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const postGeoblocking = createAsyncThunk(
  "postGeoblocking",
  async (body) => {
    try {
      const response = await axios.post(
        `${REACT_APP_BASE_URL}/series/${body.id}/regions`,
        body.data,
        {
          headers: {
            Authorization: `Bearer ${body.token}`,
          },
        }
      );
      return response;
    } catch (error) {
      return error;
    }
  }
);

const geoblockingReducer = createSlice({
  name: "user",
  initialState: {
    countries: [],
    loading: false,
    message: "",
  },
  reducers: {},
  extraReducers: {
    [getAllCountries.fulfilled]: (state, action) => {
      state.loading = false;

      if (action.payload.data.body) {
        let countryOptions = [];
        let data = action.payload.data.body;
        data.forEach((element) => {
          let obj = {
            value: element.series_alpha_2,
            label: element.series_name,
          };
          countryOptions.push(obj);
        });
        state.countries = countryOptions;
      }
    },
  },
});

export default geoblockingReducer.reducer;
