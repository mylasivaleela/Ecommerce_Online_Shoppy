import { Card, CardContent, CardMedia, Typography, Button, Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { removeCart, increaseQty, decreaseQty, clearCart } from './cartSlicte';
import { openRazorpay } from "../../services/payment";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const items = useAppSelector(state => state.cart.items);

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const roundedTotal = Math.round(total);

    const handleCheckout = async() => {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/create-order`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify( {amount: total}),
        });

        const order = await res.json();
        openRazorpay(order, () => {
            dispatch(clearCart());
            navigate("/");           
        });
    }

    return (
        <Box sx={{ pt: 8 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Typography variant="h4" sx={{ fontSize: 32 }}>
                    🛒
                </Typography>
                <Typography variant="h4">
                    Cart
                </Typography>
            </Box>

            {items.length === 0 && (
                <Typography>Your cart is empty</Typography>
            )}

            <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                {items.map((item) => (
                    <Card key={item.id} sx={{ display: 'flex' }}>
                        {item.thumbnail && (
                            <CardMedia
                                component="img"
                                sx={{ width: 120, height: 120, objectFit: 'cover' }}
                                image={item.thumbnail}
                                alt={item.title}
                            />
                        )}
                        <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="h6">{item.title}</Typography>
                            <Typography>₹ {item.price}</Typography>

                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 2 }}>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    onClick={() => dispatch(decreaseQty(item.id))}
                                >
                                    -
                                </Button>

                                <Typography>{item.quantity}</Typography>

                                <Button
                                    variant="outlined"
                                    size="small"
                                    onClick={() => dispatch(increaseQty(item.id))}
                                >
                                    +
                                </Button>

                                <Button
                                    color="error"
                                    size="small"
                                    onClick={() => dispatch(removeCart(item.id))}
                                >
                                    Remove
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                <Typography variant="h5">
                    Total: ₹ {roundedTotal}
                </Typography>
                <Button variant="contained" color="primary" disabled={items.length === 0} onClick={handleCheckout}>
                    Proceed to Checkout
                </Button>
            </Box>
        </Box>
    );
};

export default Cart;