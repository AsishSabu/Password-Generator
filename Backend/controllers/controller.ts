import { Request, Response, NextFunction } from "express"
import User from "../models/userSchema"
import CustomError from "../utils/customError"
import bcrypt from "bcrypt"
import generateTokens from "../utils/generateTokens"
import paswordSchema from "../models/paswordSchema"

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email,name, password } = req.body 
    console.log(req.body);
      
    const isEmailExist = await User.findOne({ email })
    if (isEmailExist) {
      throw new CustomError("Email already exists", 401)
    }
      const newUser= await User.create({
      name,
      email,
      password
    })
    console.log(newUser);
    
    return res
      .status(200)
      .json({ success: true, message: "User registration successful" })
  } catch (error) {
    console.log(error);
    
    next(error)
  }
}

export const loginUser=async(req:Request,
    res:Response,
    next:NextFunction
  )=>{
    try{
const {email,password}=req.body
console.log(req.body);

const isEmailExist=await User.findOne({email})

if (!isEmailExist) {
    throw new CustomError("Email not exist", 401);
}
const isPasswordMatch = await bcrypt.compare(
  password,
  isEmailExist.password
);

if(!isPasswordMatch) throw new CustomError("invalid credentials",401)
    const payload={
        id:isEmailExist._id,
        username:isEmailExist.name,
        email:isEmailExist.email  
    }
    const{access_token}=generateTokens(payload);
    return res.status(200).json({
      success:true,
      message:"User LoggedIn Succesfully",
      access_token
    })
    }catch(error){
      next(error)
    }
  }

  export const savePassword=async(
    req:Request,
    res:Response,
    next:NextFunction
  )=>{
    try {
      const {passwordName,id,password}=req.body;
      await paswordSchema.create({user:id,name:passwordName,password:password});
      return res.status(200).json({ success: true, message: "Password saved successfully" });
    } catch (error) {
      next (error)
    }
  }

  export const getPassword = async(
    req: Request,
    res: Response,
    next: NextFunction
  ) =>{
   try {
    const { userId } = req.query;  // Extract userId from the query parameters
    const passwords = await paswordSchema.find({ user:userId });
    return res
    .status(200)
    .json({ success: true,passwords:passwords });
   } catch (error) {
      next(error)
   }
  }

  export const editPassword = async(
    req: Request,
    res: Response,
    next: NextFunction
  ) =>{
   try {
   
   const {name,password,userId} = req.body
   
   if (!name.trim() || !password.trim()) {
    return res.status(400).json({ success: false, message: 'Name and password cannot be empty or just whitespace' });
  }

   const updatedPassword = await paswordSchema.findOneAndUpdate(
    { user: userId }, 
    { name: name, password: password }, 
    { new: true } 
  ); 
    return res
    .status(200)
    .json({ success: true});
   } catch (error) {
      next(error)
   }
  }

  export const deletePassword = async(
    req: Request,
    res: Response,
    next: NextFunction
  ) =>{
   try {
   
   const {id} = req.params;
    const deletePassword = await paswordSchema.findByIdAndDelete({_id:id});
    return res
    .status(200)
    .json({ success: true});
   } catch (error) {
      next(error)
   }
  }
  
