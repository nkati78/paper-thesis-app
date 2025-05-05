import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { watchlistState } from "../../../../types/redux_types";
import { RootState } from "../../store";

const watchlistSlice = createSlice({
    name: 'watchlist',
    initialState: [] as watchlistState[],
    reducers: {
        addWatchlistSymbolById: (state, action: PayloadAction<watchlistState>) => {
            state.push(action.payload);
        },
        removeWatchlistSymbolBySymbol: (state, action: PayloadAction<string>) => {
            return state.filter((wl) => wl.symbol !== action.payload);
        },
        setWatchlist: (state, action: PayloadAction<watchlistState[]>) => {
            return action.payload;
        },
    },
});

export const { addWatchlistSymbolById, removeWatchlistSymbolBySymbol, setWatchlist } = watchlistSlice.actions;
export const selectWatchlist = (state: RootState) => state.watchlist;
export default watchlistSlice.reducer;