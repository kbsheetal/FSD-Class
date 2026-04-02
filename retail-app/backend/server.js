// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const connectDB = require("./config/db");
// const authRoutes = require("./routes/authRoutes");
// const authMiddleware = require("./middleware/authMiddleware");

// dotenv.config();
// connectDB();

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api/auth", authRoutes);


// // PROTECTED ROUTE
// app.get("/api/dashboard", authMiddleware, (req, res) => {
//  res.json({
//    message: "Welcome to Dashboard",
//    userId: req.user.id,
//  });
// });


// app.listen(process.env.PORT, () =>
//  console.log(`Server running on port ${process.env.PORT}`)
// );



const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cognitoAuth = require("./middleware/cognitoAuth");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());


// ✅ Protected Route
app.get("/api/dashboard", cognitoAuth, (req, res) => {
 res.json({
   message: "Secure Cognito Dashboard",
   user: req.user,
 });
});

app.listen(process.env.PORT, () =>
 console.log(`Server running on port ${process.env.PORT}`)
);

