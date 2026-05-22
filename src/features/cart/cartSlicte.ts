import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
    id: number;
    title: string;
    price: number;
    quantity: number;
    thumbnail?: string;
}

interface CartState {
    items: CartItem[];
}

const loadCart = (): CartItem[] => {
    try {
        const data = localStorage.getItem("cart");
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

const initialState: CartState = {
    items: loadCart(),
}

const cartSlice = createSlice({
    name: 'Cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if(existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({...action.payload, quantity: 1});
            }
        },
        removeCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload
            )
        },
        increaseQty: (state, action: PayloadAction<number>) => {
            const item = state.items.find(i => i.id === action.payload);
            if(item) item.quantity += 1;
        },
        decreaseQty: (state, action: PayloadAction<number>) => {
            const item = state.items.find(i => i.id === action.payload);

            if(item && item.quantity > 1) {
                item.quantity -= 1;
            } else {
                state.items = state.items.filter(
                    i => i.id !== action.payload
                )
            }
        },
        clearCart: (state) => {
            state.items = [];
        }
    }
});

export const {
    addToCart,
    removeCart,
    increaseQty,
    decreaseQty,
    clearCart
} = cartSlice.actions;

export default cartSlice.reducer;