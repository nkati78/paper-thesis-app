import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface tcState {
    value: number;
}

const initialState: tcState = {
    value: 0,
};

const tcSlice = createSlice({
    name: 'tc',
    initialState,
    reducers: {
        incrementedByAmountTC: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        },

    },
});

export const { incrementedByAmountTC } = tcSlice.actions;
export const selectCountTC = (state) => state.tc.value;
export default tcSlice.reducer;