import { configureStore } from '@reduxjs/toolkit'
import pcReducer from './features/pc/pcSlice';
import tcReducer from './features/tc/tcSlice'
import userReducer from './features/user/userSlice'

export const makeStore = () => {

    return configureStore({
        reducer: {
            pc: pcReducer,
            tc: tcReducer,
            user: userReducer,
        },
        devTools: true
    })

}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']