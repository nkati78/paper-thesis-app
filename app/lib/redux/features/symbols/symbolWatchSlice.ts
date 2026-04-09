import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { symbolWatchState } from "../../../../types/redux_types";

const symbolWatchSlice = createSlice({
    name: 'symbolWatch',
    initialState: [] as symbolWatchState[],
    reducers: {
        addSymbolToWatch: (state, action: PayloadAction<symbolWatchState>) => {

            state.push(action.payload);

        },
        updateSymbolToWatchById: (state, action: PayloadAction<{ id: string; changes: Partial<symbolWatchState> }>) => {

            const { id, changes } = action.payload;
            const index = state.findIndex((smbl) => smbl.id === id);

            if (index !== -1) {

                state[index] = { ...state[index], ...changes };

            }

        },
        removeSymbolFromWatch: (state, action: PayloadAction<string>) => {

            return state.filter((smbl) => smbl.symbol !== action.payload);

        },
        setSymbolWatch: (state, action: PayloadAction<symbolWatchState[]>) => {

            return action.payload;

        },
    },
});

export const { addSymbolToWatch, updateSymbolToWatchById, removeSymbolFromWatch, setSymbolWatch } = symbolWatchSlice.actions;
export const selectSymbolsToWatch = (state: { symbolWatch: symbolWatchState[] }) => state.symbolWatch;
export default symbolWatchSlice.reducer;