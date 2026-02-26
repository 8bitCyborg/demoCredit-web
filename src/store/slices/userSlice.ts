import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  user: any | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: any }>
    ) => {
      const { user } = action.payload;
      state.user = user;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setCredentials, logout } = userSlice.actions;

export default userSlice.reducer;

export const selectCurrentUser = (state: { user: UserState }) => state.user.user;
export const selectIsLoggedIn = (state: { user: UserState }) => state.user.isLoggedIn;
