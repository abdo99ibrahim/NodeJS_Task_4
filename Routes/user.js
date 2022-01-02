







// app represent => server

const express = require("express");

// object // user model
const { User, validateUser } = require("../models/user");
const { catchAsyncErrors } = require("../middleware");
// create router عشان اقدر احطة عل السيرفر
const router = express.Router();

// database من ال users عايز اجيب كل ال
//aync operation واي تعامل مع الداتا بيز عباره عن
router.get("/", catchAsyncErrors( async (req, res, next) => {
//  try {
    throw new Error("unable to conect to database");
    const users = await User.find();
    // print users
    res.json(users);
  //} catch (error) {
    // log of server errors logic
    // res.status(500).json({message: error.message})
  //  next(error);
 // }
}));

// database معين ال user عايز اجيب
//aync operation واي تعامل مع الداتا بيز عباره عن
router.get(
  "/:id",
  catchAsyncErrors(async (req, res) => {
    // get id using id.params
    const { id } = req.params;
    const users = await User.findById(id);
    if (!users) return res.status(404).json({ message: "user not found" });
    // print users
    res.json(users);
  })
);

// database معين ال user عايز امسح
//aync operation واي تعامل مع الداتا بيز عباره عن
router.delete("/:id", catchAsyncErrors( async (req, res) => {
  // get id using id.params
  const { id } = req.params;
  const users = await User.findByIdAndDelete(id);
  if (!users) return res.status(404).json({ message: "user not found" });
  // print users
  res.json(users);
}));

// register end point
// post on /users لو جالك
//function نفد ال
router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  const newUser = new User(req.body);
  await newUser.save();
  res.json(newUser);
});

// database معين ال user عايز اعدل
//aync operation واي تعامل مع الداتا بيز عباره عن
router.put("/:id", catchAsyncErrors( async (req, res) => {
  // 1- validate on req.body
  const { error } = validateUser(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  // get id using id.params
  const { id } = req.params;
  const { name, email, password } = req.body;
  const users = await User.findById(id);
  // 2- validate if enter corrective id
  if (!users) return res.status(404).json({ message: "user not found" });
  users.name = name;
  users.email = email;
  users.password = password;
  await users.save();
  // print users
  res.json(users);
}));

// export router
module.exports = router;
