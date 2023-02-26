const dynamic_db = require("./dynamic_dbconn");

let db_name = "node_assignment";

let connection = dynamic_db.connection(db_name);

connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log(`Connected to the ${db_name} database.`);
  });

  module.exports = connection;