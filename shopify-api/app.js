
const express = require('express');
const app = express();
const shopifyRoutes = require('./routes/shopify');

app.use(express.json());
app.use('/api/shopify', shopifyRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(Server is running on port ${PORT});
});