const express = require("express");
const app = express();

app.use(express.json());

// Sample API
app.get("/", (req, res) => {
 res.send("Retail Order API is running...staging");
});

// Real-world endpoint
app.get("/orders", (req, res) => {
 res.json([
   { id: 1, product: "Laptop", status: "Shipped" },
   { id: 2, product: "Phone", status: "Processing" }
 ]);
});

const PORT = 3000;

app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`);
});
