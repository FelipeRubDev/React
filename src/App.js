import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import ShoppingCart from './components/ShoppingCart';
import RegistrationForm from './components/RegistrationForm';
function App() {
return (
<div className="App">
<Navbar />
<Container>
<Row>
<Col md={8}>
<ProductList />
</Col>
<Col md={4}>
<ShoppingCart />
</Col>
</Row>
<Row>
<Col md={12}>
<RegistrationForm />
</Col>
</Row>
</Container>
</div>
);
}
export default App;     
