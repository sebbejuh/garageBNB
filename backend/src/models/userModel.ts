import User from '../schemas/userSchema';
import bcrypt from 'bcryptjs';
import { generateToken } from '../authentication/auth';
import { Request, Response, NextFunction } from 'express';
import { RequestWithUserData } from '../types/types';

// REGISTER USER
const registerUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if(!email || !password) {
    return res.status(400).json({
      message: 'You need to enter all the fields'
    })
  }

  // Check if email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'Email already in use' });
  }

  const salt = bcrypt.genSaltSync(10);

  bcrypt.hash(password, salt, (err, hash) => {
    if(err) {
      return res.status(500).json({
        message: 'Failed when encrypting the password'
      })
    }
    User.create({
      email,
      passwordHash: hash
    })
    .then(user => {
      res.status(201).json({
        token: generateToken(user)
      })
    })
  })
}
// END
// LOGIN USER
const loginUser = (req: Request, res: Response) => {
  const { email, password } = req.body;

  if(!email || !password) {
    return res.status(400).json({
      message: 'You need to enter all the fields'
    })
  }
  User.findOne({email})  //finds email and sends it on
  .then(user => {
    if(!user) {
      return res.status(401).json({
        message: 'Incorrect credentials'
      })
    }
    bcrypt.compare(password, user.passwordHash, (err, result) => {  //compares the sent password with the passwordHash
      if(err) {
        return res.status(500).json({
          message: 'Something went wrong when decrypting the password'
        })
      }
      if(!result) {
        return res.status(401).json({
          message: 'Incorrect credentials'
        })
      }
      res.status(200).json({ token: generateToken(user) }) //sends token
    })
  })
}
// END
// GET USER DATA
const getUserData = (req: RequestWithUserData, res: Response, next: NextFunction) => {
  if (req.userData) {
    const { _id, email } = req.userData;

    User.findById(_id).select('-passwordHash')  //excludes the passwordHash from the response
      .then(user => {
        res.status(200).json(user)
      })
      .catch(err => {
        next(err);
      });
  } else {
    res.status(401).json({
      message: 'User data not found'
    });
  }
}
// END
// EXPORTS
export default {
  registerUser,
  loginUser,
  getUserData
};