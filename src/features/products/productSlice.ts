import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface Product {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
    category: string;
}

interface ProductState {
    data: Product[];
    loading: boolean;
    error: string | null;
    search: string;
    category: string;
    sort: string;
    page: number;
    limit: number;
}

const initialState: ProductState = {
    loading: false,
    data: [],
    error: null,
    search: '',
    category: '',
    sort: '',
    page: 1,
    limit: 6,
}

export const fetchProducts = createAsyncThunk<Product[]>(
    "products/fetch",
    async () => {
        const res = await fetch("https://dummyjson.com/products");
        const data = await res.json();
        return data.products;
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setSearch: (state, action) => {
            state.search = action.payload;
        },
        setCategory: (state, action) => {
            state.category = action.payload;
        },
        setSort: (state, action) => {
            state.sort = action.payload;
        },
        resetFilters: (state) => {
            state.search = "";
            state.category = "";
            state.sort = "";
        },
        setPage: (state, action) => {
            state.page = action.payload;
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.loading = false;
                state.error = "Failed to fetch products";
            })
    }
});

export const { setSearch, setCategory, setSort, setPage } = productSlice.actions;
export default productSlice.reducer;