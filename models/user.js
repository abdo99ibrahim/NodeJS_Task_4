//1- make require of mongoose package
const mongoose = require("mongoose");
//1- make require of mongoose package
const Joi = require("joi");

//2-user model  بعرف ال
// schema==> creations الخريطه الل هعمل بيها
// transfer schema into model
// UserSchema ==> Object
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    min: 3,
    max: 50,
    required: true,
  },
  password: {
    type: String,
    min: 6,
    max: 12,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);

// to make validate ==> send validationSchema with object user
const validationSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(16).required(),
});

const validateUser = (user)=>{
    return validationSchema.validate(user);   
}
module.exports = {User,validateUser};
