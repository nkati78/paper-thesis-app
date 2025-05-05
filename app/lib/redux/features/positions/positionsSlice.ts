import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { positionState } from "../../../../types/redux_types";
import { RootState } from "../../store";

const positionsSlice = createSlice({
    name: 'positions',
    initialState: [] as positionState[],
    reducers: {
        addPosition: (state, action: PayloadAction<positionState>) => {

            const positionExists = state.some((position) => position.id === action.payload.id);

            if (!positionExists) {

                return [...state, action.payload];

            }

            return state;
        },
        updatePositionByOrderId: (state, action: PayloadAction<{ orderId: string; changes: Partial<positionState> }>) => {

            const { orderId, changes } = action.payload;
            const index = state.findIndex((pos) => pos.orderId === orderId);

            if (index !== -1) {

                state[index] = { ...state[index], ...changes };

            }

        },
        updatePositionBySymbol: (state, action: PayloadAction<{ symbol: string; changes: Partial<positionState> }>) => {

            const { symbol, changes } = action.payload;

            return state.map((position) => {

                if (position.symbol === symbol) {

                    const updatedValue = changes.currentPrice !== undefined
                        ? changes.currentPrice * position.quantity
                        : position.value;

                    return {
                        ...position,
                        ...changes,
                        value: updatedValue,
                    };
                }

                return position;

            });

        },
        removePositionByOrderId: (state, action: PayloadAction<string>) => {

            return state.filter((pos) => pos.orderId !== action.payload);

        },
        setPositions: (state, action: PayloadAction<positionState[]>) => {

            return action.payload;

        },
    },
});

export const { addPosition, updatePositionByOrderId, removePositionByOrderId, updatePositionBySymbol, setPositions } = positionsSlice.actions;
export const selectAllPositions = (state: RootState) => state.positions;
export default positionsSlice.reducer;