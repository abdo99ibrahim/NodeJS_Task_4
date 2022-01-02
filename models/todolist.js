//1- make require of mongoose package
const mongoose = require("mongoose");
const Joi = require("joi");
//2-user model  بعرف ال 
// schema==> creations الخريطه الل هعمل بيها 
// transfer schema into model
// UserSchema ==> Object
const ToDoSchema = new mongoose.Schema({
    Faculity: {
      type: String,
      min: 10,
      max: 80,
      required: true,
    }
  });
  
  const Todo =mongoose.model("Todo",ToDoSchema) ;

  // to make validate ==> send validationSchema with object user
  const validationSchema = Joi.object({
      Faculity:Joi.string().min(10).max(70).required(),
  });
  
  const validateToDo = (todos)=>{
      return validationSchema.validate(todos);   
  }

module.exports = {Todo,validateToDo};