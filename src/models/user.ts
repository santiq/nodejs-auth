import * as mongoose from 'mongoose';

interface UserInterface {
  email: string;
  password?: string;
  salt?: string;
  name: string;
}

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  
  password: {
    type: String,
    required: true,
  },

  salt: {
    type: String,
    required: true,
  },

  name: {
    type: String
  },

  role: {
    type: String,
    default: 'user', // Possible values: user | admin 
  }

})

export default mongoose.model<UserInterface & mongoose.Document>('User', UserSchema)