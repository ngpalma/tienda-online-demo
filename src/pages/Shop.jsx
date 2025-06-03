import { useState, useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

function Shop() {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/products').then(res => setProducts(res.data)).catch(() => alert('Error fetching products'));
  }, []);

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <Helmet>
        <title>Sol Moda - Shop</title>
        <meta name="description" content="Browse clothing at Sol Moda." />
      </Helmet>
      <h1 className="text-3xl font-bold text-center">Shop</h1>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mt-4 w-full p-3 rounded mx-auto max-w-md"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white p-4 rounded shadow">
            <img src={product.image} alt={product.name} className="h-40 w-full object-cover rounded" />
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p>${product.price.toFixed(2)}</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-2 bg-purple-600 text-white px-4 py-2 rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Shop;