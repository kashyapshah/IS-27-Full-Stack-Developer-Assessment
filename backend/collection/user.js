const UserModel = require('../models/user');
const {ObjectId} = require('mongodb');

const saveuser = async(req, res, next) => {
    console.log('called');
    try{
        const {
            name,
            username,
            email,
            address,
            phone,
            website,
            company,
          } = req.body;
      
          // Create a new instance of the UserModel
          const newUser = new UserModel({
            name,
            username,
            email,
            address,
            phone,
            website,
            company,
          });

        const saveUser = await newUser.save();
        // console.log(saveUser);
        res.status(201).json(saveUser);
    }catch(e){
        res.status(500).json({ err: 'Error creating user',message: e, });
        // console.log(e);
    }
}

const getUser = async(req, res, next) => {
    try{
        const getUser = await UserModel.find();
        res.status(201).json(getUser);
    }catch(e){
        res.status(500).json({ err: 'Error getting user', message: e });
    }
}

const updateUser = async(req, res, next) => {
    try{
       var userId = req.params.id
    const updateData = req.body
        const updatedUser = await UserModel.findOneAndUpdate(
            { _id: userId }, // Find the user by ID
            updateData, // Update with the data from the request body
            { new: true } // Return the updated document
        );
        res.status(201).json(updatedUser);
    }catch(e){
        res.status(500).json({ err: 'Error updating user', message: e });
    }
}

const deleteUser = async(req, res, next) => {
    try{
        var userId = req.params.id
        const deleteUser = await UserModel.findByIdAndDelete({_id: userId});
        res.status(200).json('user deleted sucessfully');
    }catch(e){
        res.status(500).json({err: 'Error deleting user',message: e})
    }
}

const bulkInsert = async(req, res, next) => {
    try{
        const bulkUserData = req.body
        const insertManyUsers = await UserModel.insertMany(bulkUserData);
        res.status(200).json(insertManyUsers);
    }catch(e){
        res.status(500).json({err: 'Error inserting user', message: e})
    }
}

module.exports = {
    saveuser,
    getUser,
    updateUser,
    deleteUser,
    bulkInsert
}