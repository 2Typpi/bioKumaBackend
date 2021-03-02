// server/roles.js
const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function () {
  ac.grant("basic").readOwn("order").updateOwn("order");

  ac.grant("supervisor").extend("basic").readAny("order");

  ac.grant("admin").extend("basic").extend("supervisor").updateAny("order").deleteAny("order");

  return ac;
})();
