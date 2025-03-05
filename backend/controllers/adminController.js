import db from '../config/db.js';

// Fetch Customers Information
export const getCustomers = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        CONCAT(first_name, ' ', last_name) AS Customer_Name,
        email AS Email,
        phone_number AS Phone,
        (SELECT COUNT(*) FROM orders WHERE orders.customer_id = customers.customer_id) AS Orders,
        (SELECT SUM(total_price) FROM orders WHERE orders.customer_id = customers.customer_id) AS Order_Total,
        MIN(order_date) AS Customer_Since,
        'Active' AS Status
      FROM customers
      LEFT JOIN orders ON customers.customer_id = orders.customer_id
      GROUP BY customers.customer_id;
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getShipments = async (req, res) => {
    try {
      const [rows] = await db.query(`
        SELECT 
          shipments.shipment_id AS Shipment_ID,
          shipments.order_id AS Order_ID,
          DATE(shipments.shipment_date) AS Shipment_Date, -- Extract date part
          shipments.carrier AS Carrier,
          shipments.tracking_number AS Tracking_Number,
          DATE(shipments.delivery_date) AS Delivery_Date, -- Extract date part
          shipments.shipment_status AS Shipment_Status,
          DATE(orders.order_date) AS Order_Date, -- Extract date part
          orders.customer_id AS Customer_ID,
          orders.total_price AS Total_Price
        FROM shipments
        JOIN orders ON shipments.order_id = orders.order_id LIMIT 100;
      `);
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  };

export const getOrdersByClientId = async (req, res) => {
    const { clientId } = req.params; // Extract clientId from the URL
  
    try {
      const [rows] = await db.query(
        `
        SELECT 
          orders.order_id AS Order_ID,
          DATE(orders.order_date) AS Order_Date,
          orders.total_price AS Total_Price,
          customers.customer_id AS Customer_ID,
          customers.first_name AS First_Name,
          customers.last_name AS Last_Name,
          customers.email AS Email,
          customers.phone_number AS Phone_Number
        FROM orders
        JOIN customers ON orders.customer_id = customers.customer_id
        WHERE orders.customer_id = ?;
        `,
        [clientId] // Pass clientId as a parameter to the query
      );
  
      if (rows.length === 0) {
        return res.status(404).json({ message: 'No orders found for this client.' });
      }
  
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  };