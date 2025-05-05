import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { symbolState } from "../../../../types/redux_types";

const symbolSlice = createSlice({
    name: 'symbols',
    initialState: [] as symbolState[],
    reducers: {
        addSymbolById: (state, action: PayloadAction<symbolState>) => {

            state.push(action.payload);

        },
        removeSymbolById: (state, action: PayloadAction<string>) => {

            return state.filter((smbl) => smbl.id !== action.payload);

        },
        setSymbols: (state, action: PayloadAction<symbolState[]>) => {

            return action.payload;

        },
    },
});

export const { addSymbolById, removeSymbolById, setSymbols } = symbolSlice.actions;
export const selectSymbols = (state: { symbols: symbolState[] }) => state.symbols;
export default symbolSlice.reducer;