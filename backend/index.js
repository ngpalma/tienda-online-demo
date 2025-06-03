require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(cors({ origin: ['http://localhost:5173', 'https://tienda-online-demo.vercel.app'] }));
app.use(express.json());

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
});

// Models
const Product = sequelize.define('Product', {
  name: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  description: { type: DataTypes.TEXT },
  image: { type: DataTypes.STRING },
  category: { type: DataTypes.STRING },
}, { timestamps: false });

const Order = sequelize.define('Order', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING, allowNull: false },
  total: { type: DataTypes.FLOAT, allowNull: false },
  items: { type: DataTypes.JSON, allowNull: false },
}, { timestamps: true, createdAt: 'created_at', updatedAt: false });

// Sync database
(async () => {
  try {
    await sequelize.sync({ force: false });
    // Seed products
    const products = [
      { name: 'T-Shirt', price: 5000, description: 'Cotton t-shirt', image: 'https://cdn.pixabay.com/photo/2017/05/23/10/53/t-shirt-design-2336850_1280.jpg', category: 'Clothing' },
      { name: 'Jeans', price: 8000, description: 'Slim-fit jeans', image: 'https://cdn.pixabay.com/photo/2015/03/16/15/24/pants-676119_1280.jpg', category: 'Clothing' },
      { name: 'Jacket', price: 12000, description: 'Leather jacket', image: 'https://source.unsplash.com/random/300x200/?jacket', category: 'Clothing' },
    ];
    await Product.bulkCreate(products, { ignoreDuplicates: true });
    console.log('Database synced and seeded');
  } catch (error) {
    console.error('Database sync error:', error);
  }
})();

// Endpoints
app.get('/products', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

app.post('/orders', async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(200).json({ message: 'Order placed successfully', order });
  } catch (error) {
    console.error('Order error:', error);
    res.status(500).json({ error: 'Failed to place order' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));