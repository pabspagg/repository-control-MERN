require("dotenv").config();
const mongoose = require("mongoose");
const UserModel = require("./models/User");
const app = require("./server/server.js");
const port = process.env.SERVER_PORT || 8000;
const uri = process.env.MONGO_URI;

async function main() {
  try {
    app.listen(port, () => {
      console.log("listening on port", port);
    });
  } catch (e) {
    console.log("Error listening on port :" + port + " " + e.message);
  }

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (e) {
    console.log("Error connecting to MongoDB :" + e.message);
  }
}

main();
