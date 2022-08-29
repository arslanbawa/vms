import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { REACT_APP_BASE_URL } from "@env";

export const getAllSeries = createAsyncThunk("getAllSeries", async (body) => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_URL}/series`, {
      headers: { Authorization: `Bearer ${body.token}` },
    });
    return response;
  } catch (error) {
    return error;
  }
});
export const getSeriesById = createAsyncThunk("getSeriesById", async (body) => {
  try {
    const response = await axios.get(
      `${REACT_APP_BASE_URL}/series/${body.id}`,
      {
        headers: { Authorization: `Bearer ${body.token}` },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
});
export const postSeries = createAsyncThunk("postSeries", async (body) => {
  try {
    const response = await axios.post(
      `${REACT_APP_BASE_URL}/series`,
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
});
export const editSeries = createAsyncThunk("editSeries", async (body) => {
  try {
    const response = await axios.put(
      `${REACT_APP_BASE_URL}/series/${body.id}`,
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
});
export const validateSlug = createAsyncThunk("validateSlug", async (body) => {
  try {
    const response = await axios.get(
      `${REACT_APP_BASE_URL}/series/validate-slug/${body.slug}`,
      {
        headers: { Authorization: `Bearer ${body.token}` },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
});

const seriesReducer = createSlice({
  name: "user",
  initialState: {
    series: [],
    loading: false,
    message: "",
    selectedSeries: {},
    selectedSeriesVideos: [],
    selectedSeriesRegions: {},
  },
  reducers: {},
  extraReducers: {
    [getAllSeries.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload.data.body) {
        state.series = action.payload.data.body;
      }
    },
    [getSeriesById.fulfilled]: (state, action) => {
      if (action.payload.data.body) {
        state.selectedSeries = action.payload.data.body.series[0];
        state.selectedSeriesVideos = action.payload.data.body.videos;
        state.selectedSeriesRegions = action.payload.data.body.seriesRegions[0];
      }
    },
  },
});

export default seriesReducer.reducer;
