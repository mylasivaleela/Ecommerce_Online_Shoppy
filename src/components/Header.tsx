import { AppBar, Toolbar, Typography, Button, MenuItem, Select, TextField, InputLabel, FormControl, IconButton, InputAdornment } from "@mui/material";
import { Link } from 'react-router-dom';
import { setSearch, setCategory, setSort } from "../features/products/productSlice";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import "./Header.css";

const Header = () => {
    const [searchInput, setSearchInput] = useState("");
    const dispatch = useAppDispatch();
    const products = useAppSelector(state => state.products.data);
    const category = useAppSelector(state => state.products.category);
    const sort = useAppSelector(state => state.products.sort);
    const categories = Array.from(new Set(products.map(product => product.category))).sort();
    const items = useAppSelector((state) => state.cart.items);

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(setSearch(searchInput));
        }, 500);

        return () => clearTimeout(timer);
    }, [searchInput, dispatch]);


    return (
        <AppBar>
            <Toolbar>
                <Typography variant="h5">Riot Shoppy</Typography>
                <div className="header-controls">
                    {/* Search */}
                    <TextField
                        label="Search"
                        variant="outlined"
                        size="small"
                        className="search-field"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        slotProps={{
                            input: {
                                endAdornment: searchInput && (
                                    <InputAdornment position="end">
                                        <IconButton
                                            size="small"
                                            onClick={() => setSearchInput("")}
                                            title="Clear Search"
                                            edge="end"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 16 16">
                                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                            </svg>
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }
                        }}
                    />

                    {/* Category Filter */}
                    <div style={{ position: 'relative', display: 'inline-flex' }}>
                        <FormControl className="category-control" variant="outlined">
                            <InputLabel id="category-label">Category</InputLabel>
                            <Select
                                labelId="category-label"
                                label="Category"
                                name="Category"
                                size="small"
                                value={category}
                                className="category-select"
                                onChange={(e) => dispatch(setCategory(e.target.value))}
                            >
                                {categories.map((cat) => (
                                    <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {category && (
                            <IconButton
                                size="small"
                                onClick={() => dispatch(setCategory(""))}
                                title="Clear Category"
                                sx={{ position: 'absolute', right: '24px', top: '50%', transform: 'translateY(-50%)', zIndex: 2, padding: '4px' }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 16 16">
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                </svg>
                            </IconButton>
                        )}
                    </div>
                    {/* Sort */}
                    <div style={{ position: 'relative', display: 'inline-flex' }}>
                        <FormControl className="sort-control" variant="outlined">
                            <InputLabel id="sort-label">Sort By</InputLabel>
                            <Select
                                labelId="sort-label"
                                label="Sort By"
                                size="small"
                                value={sort}
                                className="sort-select"
                                onChange={(e) => dispatch(setSort(e.target.value))}
                            >
                                <MenuItem value="">None</MenuItem>
                                <MenuItem value="low">Price: Low to High</MenuItem>
                                <MenuItem value="high">Price: High to Low</MenuItem>
                            </Select>
                        </FormControl>
                        {sort && (
                            <IconButton
                                size="small"
                                onClick={() => dispatch(setSort(""))}
                                title="Clear Sort"
                                sx={{ position: 'absolute', right: '24px', top: '50%', transform: 'translateY(-50%)', zIndex: 2, padding: '4px' }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 16 16">
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                </svg>
                            </IconButton>
                        )}
                    </div>
                </div>
                <Button color="inherit" component={Link} to="/">Home</Button>
                <Button color="inherit" component={Link} to="/cart" className="cart-button">
                    <span className="cart-icon-wrap">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                        </svg>
                        {items.length > 0 && <span className="cart-count-badge">{items.length}</span>}
                    </span>
                </Button>
            </Toolbar>
        </AppBar>
    )
}

export default Header;