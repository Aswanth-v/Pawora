import JWT from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const authHeader = req?.headers?.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({
      success: "failed",
      message: "Authentication failed: No token provided",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const userToken = JWT.verify(token, process.env.JWT_SECRET_KEY);

    // ✅ Make sure req.body exists
    if (!req.body) {
      req.body = {};
    }

    req.body.user = {
      userId: userToken.userId,
    };

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: "failed",
      message: "Authentication failed: Invalid token",
    });
  }
};

export default userAuth;
