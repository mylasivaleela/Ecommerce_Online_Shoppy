import { Container, Typography } from '@mui/material';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { increment, decrement } from './features/counter/counterSlice';
import { useAppSelector, useAppDispatch } from './hooks/reduxHooks';
import ProductList from './features/products/productList';
import Header from './components/Header';
import Cart from './features/cart/cart';

function App() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <BrowserRouter>
    <Header />
      <Container sx={{ marginTop: 2}}>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </Container>
    </BrowserRouter>
    
    // <div style={{ padding: 20 }}>
    //   <h2>Count: {count}</h2>

    //   <Button
    //     variant="contained"
    //     onClick={() => dispatch(increment())}
    //   >
    //     +
    //   </Button>

    //   <Button
    //     variant="outlined"
    //     onClick={() => dispatch(decrement())}
    //     style={{ marginLeft: 10 }}
    //   >
    //     -
    //   </Button>
    // </div>
  );
}

export default App;

