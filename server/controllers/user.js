const _ = require('lodash');
const User = require('../models/user.models');
const fs = require('fs');
import extend from 'lodash/extend'
const formidable = require('formidable');




const create  = async(req,res) => {

   const userExists = await User.findOne({
       email:req.body.email
   })


   if(!userExists) return res.status(403).json({error:"Email is taken"})
    

     const user = await new User(req.body)

     await user.save()
     res.status(200).json({
         message:"Sign up is successful"
     })
   }



const userByID= async(req,res,next,id) =>{


  try{

    let user = await User.findById(id)

    if(!user){

        return res.status('400').json({

           error:"User not found"
        })
    }

    req.profile = user
    next();
  }

   catch(err){

    return res.status('400').json({

        error:"Could not retrieve user"
    })
   }

 const read = (req,res) =>{

  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;

  return res.json(req.profile);


 }


 const update = async (req, res) => {
    try {
      let user = req.profile
      user = extend(user, req.body)
      user.updated = Date.now()
      await user.save()
      user.hashed_password = undefined
      user.salt = undefined
      res.json(user)
    } catch (err) {
      return res.status(400).json({
        message:'error cannot update'
      })
    }
  }
 }


const remove = async (req,res) => {


    try{

        let user = req.profile
        let deletedUser = await user.remove()
        deletedUser.hashed_password = undefined
        deletedUser.salt = undefined
        res.json(deletedUser)
    }
    catch(err){

        return res.status(400).json({
            err:"it wasn't found/ or wasnt deleted"
        })
    }



}


const list = async (req,res) => {

    try{

        let users = await User.find().select('name email updated created')

        res.json(users)

    }
    catch(err){

        res.status(400).json({
            err:'cannot get'
        })

    }



}



export default {
    create,
    userByID,
    read,
    list,
    remove,
    update
  }
