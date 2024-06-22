const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

const shopifyBaseUrl = https://${process.env.SHOPIFY_API_KEY}:${process.env.SHOPIFY_API_PASSWORD}@${process.env.SHOPIFY_STORE_NAME}.myshopify.com/admin/api/2021-07;

// POST API to create a customer and place an order
router.post('/order', async (req, res) => {
    const { customer, order } = req.body;

    try {
        // Create customer
        const customerResponse = await axios.post(${shopifyBaseUrl}/customers.json, { customer });
        const newCustomer = customerResponse.data.customer;

        // Create order for the new customer
        order.customer_id = newCustomer.id;
        const orderResponse = await axios.post(${shopifyBaseUrl}/orders.json, { order });
        const newOrder = orderResponse.data.order;

        res.status(201).json({ customer: newCustomer, order: newOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// GET API to fetch all customers and their orders
router.get('/customers-orders', async (req, res) => {
    try {
        // Fetch all customers
        const customersResponse = await axios.get(${shopifyBaseUrl}/customers.json);
        const customers = customersResponse.data.customers;

        // Fetch all orders
        const ordersResponse = await axios.get(${shopifyBaseUrl}/orders.json);
        const orders = ordersResponse.data.orders;

        // Map orders to customers
        const customersWithOrders = customers.map(customer => {
            customer.orders = orders.filter(order => order.customer && order.customer.id === customer.id);
            return customer;
        });

        res.status(200).json(customersWithOrders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;