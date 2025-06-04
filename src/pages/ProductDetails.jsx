import {Helmet} from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { useContext } from 'react';
import products from '../data/products';

function ProductDetails() {
    const { addToCart } = useContext(CartContext);

  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  if (!product) return <div>Product not found</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <Helmet>
        <title>Sol Moda - {product.name}</title>
        <meta name="description" content={`View ${product.name} at Sol Moda.`} />
      </Helmet>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <img src={product.image} alt={product.name} className="h-64 w-full object-cover rounded" />
        <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
        <p className="mt-2">${product.price.toFixed(2)}</p>
        <p className="mt-2">{product.description}</p>
        <button
          onClick={() => addToCart(product)}
          className="mt-4 bg-purple-600 text-white px-6 py-2 rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
export default ProductDetails;