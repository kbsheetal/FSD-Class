const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");

const client = jwksClient({
 jwksUri: "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_rnVCWkh1q/.well-known/jwks.json",
});

function getKey(header, callback) {
 client.getSigningKey(header.kid, function (err, key) {
   const signingKey = key.getPublicKey();
   callback(null, signingKey);
 });
}

const cognitoAuth = (req, res, next) => {
 const token = req.header("Authorization");

 if (!token) {
   return res.status(401).json({ message: "No token provided" });
 }

 jwt.verify(token, getKey, { algorithms: ["RS256"] }, (err, decoded) => {
   if (err) {
     console.error("JWT error:", err);
     return res.status(401).json({ message: "Invalid token" });
   }

   req.user = decoded;
   next();
 });
};

module.exports = cognitoAuth;
