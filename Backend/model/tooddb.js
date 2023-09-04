const mongoose = require("mongoose");


console.log(process.env.PASSWORD)
const uri = `mongodb+srv://muhammadhashimsardar:${process.env.PASSWORD}@cluster0.fapwmzq.mongodb.net/ToDO-app?retryWrites=true&w=majority`;
mongoose.set("strictQuery", false);
 console.log(uri)
// Establish the MongoDB connection
const constion=mongoose.connect(uri, {useNewUrlParser: true, })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Define a schema and model (example)
const noteSchema = new mongoose.Schema({
  title: String,
 
});

const Todos = mongoose.model("todo", noteSchema);

// Export the MongoDB connection and the Note model
module.exports = {
  connection: constion,
//   mongoose.connection,
  Todo: Todos,
};
