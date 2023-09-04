const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 80; // Use the provided port or default to 3000
const cors = require("cors");
const { Todo, connection } = require("./model/tooddb");

app.use(express.json());

app.use(cors());

app.get("/", async (req, res) => {
  try {
    todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Error fetching todos" });
  }
});

app.post("/", (req, res) => {
  const todo = new Todo({
    title: req.body.input,
  });
  todo
    .save()
    .then(() => res.json("Todo added!"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});
app.delete('/delete/:id',async(req,res)=>{
  id = req.params.id;
  try {
       const deletTodo= await Todo.findByIdAndDelete({_id:id})
        res.json({ message: "Todo deleted successfully" });
  } catch (error) {
      console.log(error)
      res.status(500).json({ error: "Error deleting tod'" });
  }
})


app.put('/:id',async(req,res)=>{
    
    
  const taskId = req.params.id;
  const updatedTaskData = req.body; 

  try {
    const task = await Todo.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    task.title = updatedTaskData.newtask;
    await task.save();

    res.json(task);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Error updating task" });
  }

})


connection;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
