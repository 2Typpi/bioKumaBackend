// server/roles.js
const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function () {
  ac.grant("basic").readOwn("order").updateOwn("order");
  ac.grant("supervisor").extend("basic").readAny("order");
  ac.grant("admin").extend("basic").extend("supervisor").updateAny("order").deleteAny("order");

  ac.grant("basic").readAny("article");
  ac.grant("supervisor")
    .extend("basic")
    .updateAny("article")
    .createAny("article")
    .deleteAny("article");
  ac.grant("admin").extend("supervisor");

  return ac;
})();
