const mongoose = require('mongoose');

// Define the Geo schema for the nested geo object
const GeoSchema = new mongoose.Schema({
  lat: String,
  lng: String,
});

// Define the Address schema for the nested address object
const AddressSchema = new mongoose.Schema({
  street: String,
  suite: String,
  city: String,
  zipcode: String,
  geo: GeoSchema, // Embed the Geo subdocument
});

// Define the Company schema for the nested company object
const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  catchPhrase: String,
  bs: String,
});

// Define the User schema
const UserSchema = new mongoose.Schema({
  id: String,
  name: {
    type: String,
    required: true,
  },
  username: String,
  email: {
    type: String,
    required: true,
  },
  address: AddressSchema, // Embed the Address subdocument
  phone: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  company: CompanySchema, // Embed the Company subdocument
});

// Create and export the Mongoose model based on the User schema
const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
