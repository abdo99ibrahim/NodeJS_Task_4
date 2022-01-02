






const express = require("express");

// object // user model
const { Todo, validateToDo } = require("../models/todolist");
//const { catchAsyncErrors } = require("../middleware");
const router = express.Router();

router.get("/", async (req, res) => {
  throw new Error("unable to conect to database");
  const todos = await Todo.find();
  // print users
  res.json(todos);
});
router.post("/", async (req, res) => {
  const { error } = validateToDo(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  const todos = new Todo(req.body);
  await todos.save();
  res.json(todos);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const todos = await Todo.findById(id);
  if (!todos) return res.status(404).json({ message: "user not found" });
  res.json(todos);
});
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const todos = await Todo.findByIdAndDelete(id);
  if (!todos) return res.status(404).json({ message: "user not found" });
  res.json(todos);
});

router.put("/:id", async (req, res) => {
  // 1- validate on req.body
  const { error } = validateToDo(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  const { id } = req.params;
  const { Faculity } = req.body;
  const todos = await Todo.findById(id);
  // 2- validate if enter corrective id
  if (!todos) return res.status(404).json({ message: "user not found" });

  todos.Faculity = Faculity;
  await todos.save();
  // print users
  res.json(todos);
});
// export router
module.exports = router;
