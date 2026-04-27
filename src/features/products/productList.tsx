import { useEffect, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import { fetchProducts, Product, setPage } from "./productSlice";
import "./productList.css";
import { 
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    CircularProgress,
    Button,
    Box,
    Pagination,
} from "@mui/material";
import { addToCart } from "../cart/cartSlicte";


const ProductList = () => {
    const { data, loading, error, search, category, sort, page, limit } = useAppSelector((state) => state.products);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        dispatch(setPage(1));
    }, [dispatch, search, category, sort]);

    const filteredProducts = useMemo(() => {
        let products = [...data];

        if(search) {
            products = products.filter(product => 
                product.title.toLowerCase().includes(search.toLowerCase())
            );
        }

        if(category) {
            products = products.filter(product => product.category ===category)
        }

        if(sort === "low") {
            products = products.sort((a, b) => a.price - b.price);
        } else if(sort === "high") {
            products = products.sort((a, b) => b.price - a.price);
        }

        return products;
    }, [data, search, category, sort]);

    const paginatedProducts = useMemo(() => {
        const start = (page -1) * limit;
        const end = start + limit;
        return filteredProducts.slice(start, end);
    },[filteredProducts,page, limit]);

    if(loading) return <CircularProgress />;
    if(error) return <p>{error}</p>

    return (
        <Grid container spacing={2} style={{marginTop: '10%'}}>
            {paginatedProducts.map((product: Product) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
                    <Card>
                        <CardMedia 
                            component="img"
                            height="160"
                            image={product.thumbnail} 
                        />
                    <CardContent>
                        <Typography variant="h6">{product.title}</Typography>
                        <Typography variant="body2">₹{product.price}</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                            <Button
                                size="small"
                                variant="contained"
                                sx={{ fontSize: '0.75rem', px: 1.5, py: 0.75, minWidth: 'auto' }}
                                onClick={() =>
                                    dispatch(
                                        addToCart({
                                            id: product.id,
                                            title: product.title,
                                            price: product.price,
                                            quantity: 1,
                                            thumbnail: product.thumbnail,
                                        })
                                    )
                                }
                            >
                                Add to Cart
                            </Button>
                        </Box>
                    </CardContent>
                    </Card>
                </Grid>
            ))}
            <Box className="pagination-container">
                <Pagination
                    count={Math.ceil(filteredProducts.length / limit)}
                    page={page}
                    onChange={(event, value) => dispatch(setPage(value))}
                    size="large"
                    color="primary"
                />
            </Box>
        </Grid>
    )
}

export default ProductList;