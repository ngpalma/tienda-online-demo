import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { useContext } from 'react';

function Cart() {
    const { cart, updateQuantity, removeFromCart } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <Helmet>
        <title>Sol Moda - Cart</title>
        <meta name="description" content="View your cart at Sol Moda." />
      </Helmet>
      <h1 className="text-3xl font-bold text-center">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="mt-4 text-center">Your cart is empty.</p>
      ) : (
        <div className="max-w-4xl mx-auto mt-6">
          {cart.map(item => (
            <div key={item.id} className="bg-white p-4 mb-4 rounded shadow flex justify-between items-center">
              <div>
                <h3 className="font-bold">{item.name}</h3>
                <p>${item.price.toFixed(2)} x {item.quantity}</p>
              </div>
              <div className="flex items-center">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  className="w-16 p-2 border rounded mr-2"
                />
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <p className="text-xl font-bold mt-4">Total: ${total.toFixed(2)}</p>
          <Link to="/checkout" className="mt-4 inline-block bg-purple-600 text-white px-6 py-2 rounded">
            Proceed to Checkout
          </Link>
        </div>
      )}
    </div>
  );
}
export default Cart;