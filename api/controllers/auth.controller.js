import bcryptjs from 'bcryptjs'
import User from '../model/UserModel.js';
import jwt from 'jsonwebtoken';

export const signup = async (req,res) => {
    const {username, email, password} = req.body;
    console.log(username);
    console.log(email);
    console.log(password);
    
    const hashedPassword = bcryptjs.hashSync(password,10);
    const newUser = new User({username,email,password:hashedPassword});
    try {
       await newUser.save();
       res.status(200).json('User inserted successfully');
    } catch (error) {
        res.status(401).json(error);
        console.log(error);
    }
}

export const signin = async (req,res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email:email});
        if(!user){
           res.json('User Not Found!');
           return;
        }

        const validPassword = bcryptjs.compareSync(password,user.password);
        if(!validPassword){
            res.json('Incorrect Credentials!');
            return;
        }
        
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
        const {password:pass, ...rest} = user._doc;
        res.cookie('blog-cookie',token,{httpOnly: true})
        .status(200)
        .json(rest);
    } 
    catch (error) {
        res.status(402).json(error);
    }
}