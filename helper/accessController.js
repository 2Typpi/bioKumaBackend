const jwt_decode = require("jwt-decode");

// Add this to the top of the file
const { roles } = require("./roles");

exports.grantAccess = function (action, resource) {
  return async (req, res, next) => {
    try {
      let token = req.headers.authorization.split(" ")[1];
      console.log("HAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
      let decodedToken = jwt_decode(token);
      const permission = roles.can(decodedToken.role)[action](resource);
      if (!permission.granted) {
        return res.status(401).json({
          error: "You don't have enough permission to perform this action",
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
