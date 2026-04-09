import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userState } from "../../../../types/redux_types";

const initialState: userState = {
    id: '',
    fn: '',
    ln: '',
    email: '',
    avatar: '',
    dark_mode: true,
    current_path: '',
    previous_path: '',
    username: '',
    wallet: 0
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateFirstName: (state, action: PayloadAction<string>) => {

            state.fn = action.payload;

        },
        updateLastName: (state, action: PayloadAction<string>) => {

            state.ln = action.payload;

        },
        updateEmail: (state, action: PayloadAction<string>) => {

            state.email = action.payload;

        },
        updateAvatar: (state, action: PayloadAction<string>) => {

            state.avatar = action.payload;

        },
        updateCurrentPath: (state, action: PayloadAction<string>) => {

            state.current_path = action.payload;

        },
        updatePreviousPath: (state, action: PayloadAction<string>) => {

            state.previous_path = action.payload;

        },
        updateUserName: (state, action: PayloadAction<string>) => {

            state.username = action.payload;

        },
        updateWallet: (state, action: PayloadAction<number>) => {

            state.wallet = action.payload;

        },
        updateDarkMode: (state, action: PayloadAction<boolean>) => {

            state.dark_mode = action.payload;

        },
        updateUser: (state, action: PayloadAction<userState>) => {

            return action.payload;

        },
    },
});

export const { updateFirstName, updateLastName, updateEmail, updateAvatar, updateCurrentPath, updateUserName, updateDarkMode, updateWallet, updatePreviousPath, updateUser } = userSlice.actions;
export const selectUser = (state) => state.user;
export const selectDarkMode = (state) => state.user.dark_mode;
export const selectWallet = (state) => state.user.wallet;
export const selectCurrentPath = (state) => state.user.current_path;
export default userSlice.reducer;