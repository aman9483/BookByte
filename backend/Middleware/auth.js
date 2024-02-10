const jwt = require("jsonwebtoken");
const User = require('../Model/userModel');

exports.isAuthenticatedUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(

      res.status(401).json({

        message: "please login to access this resource"
    })
    );
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.id);

  next();
};

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        
             res.status(403).json({

                 roles: `${req.user.role} not allowed to access this resource`
             })
        )
      
    }

    next();
  };
};