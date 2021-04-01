// Add this to the top of the file
const { roles } = require("./roles");

exports.grantAccess = function (action, resource) {
  return async (req, res, next) => {
    try {
      console.log(req.body);
      const permission = roles.can(req.body.role)[action](resource);
      console.log(permission);
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
