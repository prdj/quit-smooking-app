import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BkEndProfilePoint =
  "https://quit-smoking-app.onrender.com/api/users";

export const getUserProfileAsync = createAsyncThunk(
  "profile/getProfileAsync",
  async () => {
    const response = await fetch(BkEndProfilePoint);
    if (response.ok) {
      const profile = await response.json();
      return { profile };
    }
  }
);

export const registerProfileAsync = createAsyncThunk(
  "register/registerProfileAsync",
  async (payload) => {
    const response = await fetch(`${BkEndProfilePoint}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/jason",
      },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        password: payload.password,
      }),
    });
    if (response.ok) {
      const newProfile = await response.json();
      return { newProfile };
    }
  }
);

export const handleLoginAsync = createAsyncThunk(
"login/handleLoginAsync",
async (payload) => {
  const response = await fetch(`${BkEndProfilePoint}/login`, {
    method: "POST",
    headers:{
      "Content_Type": "Application/Jason",
    },
    body: JSON.stringify({
      email: payload.email,
      password: payload.password,
    }),
  });
  if (response.ok){
    const 
  }
}
)

const profileSlice = createSlice({
  name: "profile",
  initialState: [
    {
      isLoggedIn: false,
      hastToken: localStorage.getItem("token"),
      isLoading: true,
      
    },
  ],
  reducers: {
    registerProfile: (state, action) => {
      const newProfile = {
        id: Date.now(),
        name: action.payload.title,
        email: action.payload.email,
        password: action.payload.password,
      };
      state.push(newProfile);
    },
  },
  extraReducers: {
    [getUserProfileAsync.pending]: (state, action) => {
      console.log("Fetching data...");
    },
    [getUserProfileAsync.fulfilled]: (state, action) => {
      console.log("Fetched data successfully...");

      return action.payload.profile;
    },
    [registerProfileAsync.fulfilled]: (state, action) => {
      state.push(action.payload.profile);
    },
  },
});

export const { registerProfile } = profileSlice.actions;

export default profileSlice.reducer;
