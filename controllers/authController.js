import { User } from "../models/UsersModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    const { email, password} = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            res.status(409).json({ message: "User already exists" });
            return;
        }
        const hashedPassword=await bcrypt.hash(password,10)
        const newUser = new User({ email, password:hashedPassword, role:'user'});
        await newUser.save();
        const token=await jwt.sign({email:newUser.email,id:newUser._id},process.env.JWT_SECRET,{expiresIn:"15d"})   
        return res.status(200).json({user:newUser,accessToken:token})
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const registerAdmin = async (req, res) => {
    const { email, password} = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            res.status(409).json({ message: "User already exists" });
            return;
        }
        const hashedPassword=await bcrypt.hash(password,10)
        const newUser = new User({ email, password:hashedPassword, role:'admin'});
        await newUser.save();
        const token=await jwt.sign({email:newUser.email,id:newUser._id},process.env.JWT_SECRET,{expiresIn:"15d"})   
        return res.status(200).json({user:newUser,accessToken:token})
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        console.log(user)
        const isMatch=await bcrypt.compare(password,user.password)
        if (user && isMatch ) {
            const token=await jwt.sign({email:user.email,id:user._id},process.env.JWT_SECRET,{expiresIn:"15d"})
            const { password, ...userWithoutPassword } = user.toObject();
            return res.status(200).json({user:userWithoutPassword,accessToken:token});
        } else {
            return res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const logoutUser = async (req, res) => {
    try {
        res.status(200).json({ message: "User logged out" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.uid);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.uid, req.body, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const userDetails=async (req,res)=>{ 
    if(req.user){
        return res.status(200).json(req.user)
    }
    return res.status(404).json({success:false,message:"User not found"})
}