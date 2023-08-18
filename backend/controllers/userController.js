const User = require('../models/user');

module.exports.createUser = async (req, res) => {
    try {
        const existUser = await User.findOne({email:req.body.email});
        if (existUser) {
            return res.status(400).json({
                message: 'User Already Exist On this Mail'
            });
        }
        const user = await User.create(req.body);
        return res.status(201).json({
            message: 'user created successfully',
            user,
        });
    } catch (error) {
        return res.status(500).json({
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
                message:'Please Enter Email And password'
            });
        }
        if(confirmPassword !== password){
            return res.status(400).json({
                message:'Invalid Username Password'
            });
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message:'User Not found Please SignUp'
            });
        }
        const isMatchPassword = await user.comparePassword(password);
        if(!isMatchPassword){
            return res.status(400).json({
                message:'Invalid Username Password'
            });
        }
        return res.status(200).json({
            message:'Now You Assess What you need',
        });
    } catch (error) {
        return res.status(500).json({
            message:'Internal Server error',
            error
        });
    }
}