// middleware/dummyUser.js
const dummyUser = (req, res, next) => {
    // Temporary dummy user
    req.user = {
        _id: "642f1b5c1234567890abcdef", // fake MongoDB ObjectId
        name: "Test User",
        email: "test@example.com"
    };
    next();
};

module.exports = dummyUser;