import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

function Success() {
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <Helmet>
        <title>Sol Moda - Order Success</title>
        <meta name="description" content="Order successfully placed at Sol Moda." />
      </Helmet>
      <h1 className="text-3xl font-bold text-center">Order Placed!</h1>
      <p className="mt-4 text-center">Thank you for your purchase.</p>
      <Link to="/shop" className="mt-4 inline-block mx-auto bg-purple-600 text-white px-6 py-2 rounded">
        Continue Shopping
      </Link>
    </div>
  );
}
export default Success;