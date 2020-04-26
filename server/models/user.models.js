const mongoose = require('mongoose');
const crypto = require('crypto');



const UserSchema = new mongoose.Schema({

  name:{
      type:String,
      trim: true,
      required: 'Name is required'
  },

  email:{
      type:String,
      trim:true,
      unique:'Email already exists',
      match: [/.+\@.+\..+/, 'Please fill a valid email address'],
      required: 'Email is required'
  },
  hashed_password:{
      type: String,
      required:"Password is required"
  },
  salt:String,
  created:{
      type:Date,
      default:Date.now
  }
})

// Virtual fields are additonals fields for a given model
//  Their values can be set manually or automatically with defined functionality.
//  Keep in mind: virtual properties (password) dont get persisted in the database.
//  They only exist logically and are not written to the document's collection


UserSchema.virtual('password')
  .set(function(password){
        // create tempory variable called passowrd

        this._password = password
        // generates a timestamp

        this.salt = uuidv1()
        //encrypt password

        this.hashed_password = this.encryptedPassword(password)
  })
  .get(function(){

    return this._password
  })

  // methods needed


  UserSchema.methods ={
    authenticate:function(plainText){
   
        return this.encryptedPassword(plainText) === this.hashed_password;

    },
    //
    encryptedPassword:function(password){
        if(!password) return"";
        try{
         return crypto.createHmac('sha1',this.salt)
         .update(password)
         .digest('hex');
        }
        catch(err){
           return " "
        }
    }

  }


  module.exports = mongoose.model("User",userSchema)