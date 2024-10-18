const mongoose = require('mongoose');
const validator = require('validator')

const userSchema = new mongoose.Schema(
    {
        firstName: { 
            type: String,
            required: true,
            minLength:4,
            maxLength:50,
            trim:true
            },
        lastName: { 
            type: String, 
            required: true ,
            trim:true
        },
        email: { 
            type: String, 
            required: true, 
            unique: true,
            lowercase: true,
            trim:true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error("invalid Email address: " + value)
                }
            }
        },
        password: { 
            type: String,
            required: true ,
            trim:true,
            validate(value){
                if(!validator.isStrongPassword(value)){
                    throw new Error("Enter Strong password "+ value + `
                       suggestions for strong password => { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}`)
                }
            }
            },
        age: {
            type: Number,
            min:18,
            max:99
            },
        gender: { 
            type: String,
            validate(value){ //by default validate method is only called when new object is created ( wont run while patching by default)
                if(!["male","female","others"].includes(value)){
                    throw new Error("Gender Data is not valid")
                }
            }
        },
        photoUrl:{
            type:String,
            default:"https://avatars.githubusercontent.com/u/40992581?v=4",
            validate(value){
                if(!validator.isURL(value)){
                    throw new Error("Invalid photo URL address: " + value)
                }
            }

        },
        about:{
            type:String,
            default:"Write your about here..."
        },
        skills:{
            type:[String],
        }
    },
    {timestamps:true}
);

// creating mongoose model 
const User = mongoose.model("User", userSchema);

module.exports = User;  // Export the model properly
