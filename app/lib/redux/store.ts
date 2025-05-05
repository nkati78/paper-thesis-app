import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import positionsReducer from '@/redux/positions/positionsSlice';
import watchlistReducer from '@/redux/watchlist/watchlistSlice';
import symbolReducer from '@/redux/symbols/symbolSlice';
import symbolWatchReducer from "@/redux/symbols/symbolWatchSlice";

export type PreloadedState = Partial<{
    positions: ReturnType<typeof positionsReducer>;
    user: ReturnType<typeof userReducer>;
    watchlist: ReturnType<typeof watchlistReducer>;
    symbols: ReturnType<typeof symbolReducer>;
    symbolWatch: ReturnType<typeof symbolWatchReducer>;
}>;

export const makeStore = (preloadedState?: PreloadedState) => {

    return configureStore({
        reducer: {
            user: userReducer,
            positions: positionsReducer,
            watchlist: watchlistReducer,
            symbols: symbolReducer,
            symbolWatch: symbolWatchReducer,
        },
        preloadedState,
        devTools: true
    });

};

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']