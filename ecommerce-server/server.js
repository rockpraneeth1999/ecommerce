const express = require('express');
const app = express();
const { sequelize } = require('./models');
require('dotenv').config();
const routes = require('./routes');
const cors = require("cors");

// OR (Better) Restrict to frontend URL:
app.use(
    cors({
        origin: "http://localhost:5173", // React frontend URL
        credentials: true,
    })
);

app.use(express.json());
app.use('/api', routes);

app.get('/', (req, res) => res.send('E-commerce API is running...'));

const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
}).catch(err => console.error('❌ DB Sync Error:', err));
