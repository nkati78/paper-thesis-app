import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userState } from "../../../../types/redux_types";

const initialState: userState = {
    fn: 'Ron',
    ln: 'Ham',
    email: 'RonHam@ron.com',
    dark_mode: true,
    current_path: '/',
    previous_path: '/'
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
        updateCurrentPath: (state, action: PayloadAction<string>) => {
            state.ln = action.payload;
        },
        updatePreviousPath: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        updateUser: (state, action: PayloadAction<any>) => {

            console.log(state, action);
            // state = {
            //     ...state,
            //     action.payload
            // };
        },
    },
});

export const { updateFirstName, updateLastName, updateEmail, updateCurrentPath, updatePreviousPath, updateUser } = userSlice.actions;
export const selectUser = (state) => state.user;
export default userSlice.reducer;