import jwt from "jsonwebtoken";

const auth = (requiredRole = null) => {
  return (req, res, next) => {
    try {
      let token = req.headers.authorization;
      if (!token)
        return res.status(401).json({ message: "Access denied. No token provided." });

      token = token.split(" ")[1];
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) return res.status(400).json({ message: "Invalid or expired token." });

        req.user = decoded;

        if (requiredRole && decoded.role !== requiredRole) {
          return res.status(403).json({ message: "Access denied. Insufficient permissions." });
        }

        next();
      });
    } catch (error) {
      console.error("Auth middleware error:", error);
      res.status(500).json({ message: "Server error in authentication." });
    }
  };
};

export default auth;
