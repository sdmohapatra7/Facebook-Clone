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
        return res.json(500).json({
            message:'Internal Server error',
            error
        });
    }
};