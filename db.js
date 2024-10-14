const { Pool } = require("pg");

// The secret connection string you copied earlier
const connectionString =
  "postgresql://postgres:gUyfuxrZeTQyGLUeLPmVnbanucxQcTyf@autorack.proxy.rlwy.net:18192/railway";

const pool = new Pool({
  connectionString,
});

module.exports = pool;