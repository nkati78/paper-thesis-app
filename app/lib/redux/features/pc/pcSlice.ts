import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface pcState {
    value: number;
}

const initialState: pcState = {
    value: 0,
};

const pcSlice = createSlice({
    name: 'pc',
    initialState,
    reducers: {
        incrementedByAmountPC: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        },

    },
});

export const {  incrementedByAmountPC } = pcSlice.actions;
export const selectCountPC = (state) => state.pc.value;
export default pcSlice.reducer;