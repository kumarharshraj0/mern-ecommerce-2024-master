import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// 🔹 Initial state
const initialState = {
  isLoading: false,
  featureImageList: [],
};

// 🔹 Get all feature images
export const getFeatureImages = createAsyncThunk(
  "/order/getFeatureImages",
  async () => {
    const response = await axios.get(
      "http://localhost:5000/api/common/feature/get",
      {
        withCredentials: true, // Optional: needed if backend uses cookies
      }
    );
    return response.data;
  }
);

// 🔹 Add a new feature image
export const addFeatureImage = createAsyncThunk(
  "/order/addFeatureImage",
  async (image) => {
    const response = await axios.post(
      "http://localhost:5000/api/common/feature/add",
      { image },
      {
        withCredentials: true, // Include cookies if authentication is required
      }
    );
    return response.data;
  }
);

// 🔹 Delete a feature image
export const deleteFeatureImage = createAsyncThunk(
  "/order/deleteFeatureImage",
  async (id) => {
    const response = await axios.delete(
      `http://localhost:5000/api/common/feature/delete/${id}`,
      {
        withCredentials: true, // Ensure cookies are sent with the request
      }
    );
    return response.data;
  }
);

// 🔹 Slice definition
const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 🧩 Get Feature Images
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = action.payload.data;
      })
      .addCase(getFeatureImages.rejected, (state) => {
        state.isLoading = false;
        state.featureImageList = [];
      })

      // 🧩 Add Feature Image
      .addCase(addFeatureImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addFeatureImage.fulfilled, (state, action) => {
        state.isLoading = false;
        // Push new image to the list (if backend returns it)
        if (action.payload?.data) {
          state.featureImageList.push(action.payload.data);
        }
      })
      .addCase(addFeatureImage.rejected, (state) => {
        state.isLoading = false;
      })

      // 🧩 Delete Feature Image
      .addCase(deleteFeatureImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFeatureImage.fulfilled, (state, action) => {
        state.isLoading = false;
        // Remove deleted item if backend returns its ID
        const deletedId = action.meta.arg; // we passed id when calling deleteFeatureImage(id)
        state.featureImageList = state.featureImageList.filter(
          (item) => item._id !== deletedId
        );
      })
      .addCase(deleteFeatureImage.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default commonSlice.reducer;
