import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { forgotPasswordSchema, resetPasswordSchema, signinSchema, signupSchema } from "@abhiram2k03/input-validation";
import { sendEmail } from "../utils/email"
import { AuthenticatedRequest } from "../utils/types";

const prisma = new PrismaClient();

const User = prisma.user;

export const signup = async (req: Request, res: Response)=>{
    try{
        const {username, email, password, cPassword} = signupSchema.parse(req.body);

        if (password !== cPassword) {
            return res.json({ msg: "Passwords do not match" });
        }

        const user = await User.findFirst({ 
            where: {
                email
            }
        })
        if(user){
            return res.json({msg: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const saveUser = await User.create({
            data:{
                username,
                email,
                password: hashedPassword
            }
        })

        const token = jwt.sign({ userId: saveUser.id }, process.env.JWT_SECRET!, { expiresIn: "1d" });
        res.cookie('token', token, { httpOnly: true });
        
        return res.json({msg: "User created Successfully"})
    }
    catch (error: any) {
        // If validation fails, return error message
        if (error.errors && error.errors[0].message) {
          const message = error.errors[0].message;
          return res.json({ msg: message });
        }
      
        // For any other errors, print "Internal Server Error"
        console.error(error); // Log the error for debugging purposes
        return res.json({ msg: "Internal Server Error" });
    }
}

export const signin = async (req: Request, res: Response)=>{
    try{
        const {email, password} = signinSchema.parse(req.body);

        const user = await User.findFirst({ 
            where: {
                email
            }
        })

        if(!user){
            return res.json({msg: "Email doesn't exist"});
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            return res.json({msg: "Invalid Credentials"});
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);
        res.cookie('token', token, { httpOnly: true });
        return res.json({msg: "Signin successful"})
    }
    catch (error: any) {
        // If validation fails, return error message
        if (error.errors && error.errors[0].message) {
          const message = error.errors[0].message;
          return res.json({ msg: message });
        }
      
        // For any other errors, print "Internal Server Error"
        console.error(error); // Log the error for debugging purposes
        return res.json({ msg: "Internal Server Error" });
    }
}


export const forgotPassword = async(req: Request, res:Response)=>{
    try{
        const {email} = forgotPasswordSchema.parse(req.body);

        const existingUser = await User.findFirst({
            where:{
                email
            }
        })

        if(!existingUser){
            return res.json({msg: "User not found"})
        }


        // Generate token
        const token = jwt.sign({ userId: existingUser.id }, process.env.JWT_SECRET!, { expiresIn: "1d" });
        res.cookie('token', token, { httpOnly: true });
        const text = `'http://localhost:5173/resetPassword/${token}`;
        const emailResult = await sendEmail(email, "Reset password", text);

        // Send email
        if (emailResult.success) {
            return res.json({ msg: "Email sent successfully" });
        } else {
            return res.json({ msg: emailResult.error });
        }
    }
    catch (error: any) {
        // If validation fails, return error message
        if (error.errors && error.errors[0].message) {
          const message = error.errors[0].message;
          return res.json({ msg: message });
        }
      
        // For any other errors, print "Internal Server Error"
        console.error(error); // Log the error for debugging purposes
        return res.json({ msg: "Internal Server Error" });
    }
}

export const profile = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const user = req.user;
      if (!user) {
        return res.status(401).json({ msg: 'Unauthorized' });
      }
      return res.json({ username: user.username, email: user.email });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ msg: 'Server error' });
    }
};

// export const resetPassword = async(req:AuthenticatedRequest, res:Response)=>{
//     try{
//         const { password, cPassword} = resetPasswordSchema.parse(req.body);
//         const user = req.user;

//         if (!user) {
//             return res.status(401).json({ msg: 'Unauthorized' });
//         }

//         if (password !== cPassword) {
//             return res.json({ msg: "Passwords do not match" });
//         }
        
//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Update the user's password in the database
//         await User.update({
//             where: { id: user.id },
//             data: { password: hashedPassword },
//         });

//         return res.json({msg: "password updated"});
//     }
//     catch (error: any) {
//         // If validation fails, return error message
//         if (error.errors && error.errors[0].message) {
//           const message = error.errors[0].message;
//           return res.json({ msg: message });
//         }
      
//         // For any other errors, print "Internal Server Error"
//         console.error(error); // Log the error for debugging purposes
//         return res.json({ msg: "Internal Server Error" });
//     }
// }


export const resetPassword = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { password, cPassword } = resetPasswordSchema.parse(req.body);
    const user = req.user;

    console.log('User object before update:', user); // Log the user object

    if (!user) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    if (password !== cPassword) {
      return res.json({ msg: "Passwords do not match" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed password:', hashedPassword); // Log the hashed password

    // Update the user's password in the database
    await User.update({ where: { id: user.id }, data: { password: hashedPassword } });

    // Fetch the updated user object
    const updatedUser = await User.findUnique({ where: { id: user.id } });
    console.log('Updated user object:', updatedUser); // Log the updated user object

    return res.json({ msg: 'Password updated successfully', user: updatedUser });
  } catch (error: any) {
    // If validation fails, return error message
    if (error.errors && error.errors[0].message) {
      const message = error.errors[0].message;
      return res.json({ msg: message });
    }

    // For any other errors, print "Internal Server Error"
    console.error(error); // Log the error for debugging purposes
    return res.json({ msg: "Internal Server Error" });
  }
};



export const logout = async(req: Request, res: Response)=>{
    // Clear token cookie
    res.clearCookie('token');
    return res.json({ msg: "Logged out successfully" });
}