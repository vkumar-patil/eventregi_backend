const mongoose = require("mongoose");
const MainSchema = mongoose.Schema({
  username: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
});
module.exports=mongoose.model("mainusers",MainSchema)