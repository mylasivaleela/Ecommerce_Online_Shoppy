import { Container } from '@mui/material';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import ProductList from './features/products/productList';
import Header from './components/Header';
import Cart from './features/cart/cart';

function App() {

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
  );
}

export default App;

