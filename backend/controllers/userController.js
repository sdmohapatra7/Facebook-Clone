const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports.createUser = async (req, res) => {
    try {
        const existUser = await User.findOne({email:req.body.email});
        if (existUser) {
            return res.status(400).json({
                success:false,
                message: 'User Already Exist On this Mail'
            });
        }
        const user = await User.create(req.body);
        return res.status(201).json({
            success:true,
            message: 'user created successfully',
            user,
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'Internal Server error',
            error
        });
    }
};

module.exports.loginUser = async(req,res)=>{
    try {
        const {email,password,confirmPassword} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:'Please Enter Email And password'
            });
        }
        if(confirmPassword !== password){
            return res.status(400).json({
                success:false,
                message:'Invalid Username Password'
            });
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:'User Not found Please SignUp'
            });
        }
        const isMatchPassword = await user.comparePassword(password);
        if(!isMatchPassword){
            return res.status(400).json({
                success:false,
                message:'Invalid Username Password'
            });
        }
        const token = jwt.sign({
            data:{email:user.email}
        },'secret', { expiresIn: '0.2h' });
        //store the token in cookie
        res.cookie("token",token,{
            httpOnly:true,   // Allow only server-side access
            maxAge:3600,     // Cookie expires after one hour (in seconds)
            path: '/',       // Valid for the entire domain
        });
        return res.status(200).json({
            success:true,
            message:'Now You Assess What you need',
            token,
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'Internal Server error',
            error
        });
    }
}