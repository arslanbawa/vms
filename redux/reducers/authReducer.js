import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Auth } from "aws-amplify";

// const initialState = {
//   token: "",
//   loading: false,
//   message: "",
// };

export const signinUser = createAsyncThunk("signinUser", async (body) => {
  try {
    const response = await Auth.signIn(body.email, body.password);
    return response;
  } catch (error) {
    return error;
  }
});

export const logoutUser = createAsyncThunk("logoutUser", async () => {
  try {
    const response = await Auth.signOut();
    return response;
  } catch (error) {
    return error;
  }
});

export const forgotPassword = createAsyncThunk(
  "forgotPassword",
  async (body) => {
    try {
      const response = await Auth.forgotPassword(body.email);
      return response;
    } catch (error) {
      return error;
    }
  }
);
export const sunmitNewPassword = createAsyncThunk(
  "sunmitNewPassword",
  async (body) => {
    try {
      const response = await Auth.forgotPasswordSubmit(
        body.email,
        body.code,
        body.newPassword
      );

      return response;
    } catch (error) {
      return error;
    }
  }
);
export const newPasswordRequired = createAsyncThunk(
  "forgotPassword",
  async (body) => {
    try {
      const response = await Auth.completeNewPassword(
        body.user,
        body.newPassword
      );
      return response;
    } catch (error) {
      return error;
    }
  }
);

const authReducer = createSlice({
  name: "user",
  initialState: { token: "", loading: false, message: "" },
  reducers: {},
  extraReducers: {
    [signinUser.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload.signInUserSession) {
        state.token = action.payload.signInUserSession.accessToken.jwtToken;
        state.message = "Login success";
      } else if (action.payload) {
        state.message = action.payload.message;
      }
    },
    [signinUser.pending]: (state, action) => {
      state.loading = true;
    },
    [forgotPassword.fulfilled]: (state, action) => {
      if (action.payload.CodeDeliveryDetails) {
        state.message = "Verification code send to your email!";
      } else if (action.payload) {
        state.message = action.payload.message;
      }
    },
    [sunmitNewPassword.fulfilled]: (state, action) => {
      if (action.payload === "SUCCESS") {
        state.message = "Password changed successfully";
      } else {
        state.message = action.payload.message;
      }
    },
    [newPasswordRequired.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload.signInUserSession) {
        state.message = "Password created successfully";
      } else if (action.payload) {
        state.message = action.payload.message;
      }
    },
    [logoutUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.message = "";
      state.token = action.payload;
    },
  },
});

export default authReducer.reducer;
