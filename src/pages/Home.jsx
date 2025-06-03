import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Helmet>
        <title>Sol Moda - Home</title>
        <meta name="description" content="Shop trendy clothing at Sol Moda." />
      </Helmet>
      <section className="bg-purple-600 text-white p-10 text-center">
        <h1 className="text-4xl font-bold">Welcome to Sol Moda</h1>
        <p className="mt-4">Discover the latest fashion in Argentina.</p>
        <Link to="/shop" className="mt-4 inline-block bg-white text-purple-600 px-6 py-2">Shop Now</Link>
      </section>
    </div>
  );
}
export default Home;