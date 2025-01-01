const UserModel = require("../modals/User");
const bcrypt = require('bcrypt'); // Ensure bcrypt is imported
const jwt = require('jsonwebtoken');
require('dotenv').config();
require('dotenv').config()

const users = async (req, res) => {
    try {
        const users = await UserModel.find(); // Retrieve all users from the database
        res.status(200).json({
            message: 'Users retrieved successfully',
            success: true,
            data: users // Send the retrieved users as response
        });
    } catch (err) {
        res.status(500).json({
            message: 'Internal Server Error!!!',
            success: false
        });
    }
};

const signup = async (req,res)=>{
    try{
        const {name, email, password} = req.body;
        const user = await UserModel.findOne({email})

        if(user){
            return res.status(409).json(
                {
                    message: 'User Already Exist',
                    success: false
                }
            )
        }

        const newUser = new UserModel({name, email, password});
        newUser.password = await bcrypt.hash(password, 10)
        await newUser.save();
        res.status(201).json({
            message: 'User Sign-in successfully',
            success: true
        })
    }catch(err){
        res.status(500).json({
            message: 'Internal Server Error!!!',
            success: false
        })
    }
}

const login = async (req,res)=>{
    try{
        const {email, password} = req.body;
        const user = await UserModel.findOne({email})
        const message = 'Auth failed email or password is wrong'

        if(!user){
            return res.status(409).json(
                {
                    message: message,
                    success: false
                }
            )
        }

        const isPassValid = await bcrypt.compare(password, user.password)
        if(!isPassValid){
            return res.status(403).json({
                message: message,
                success: false
            })
        }

        const jwtToken = jwt.sign(
            {email: user.email, id: user.id},
            process.env.JWT_SECRET,
            {expiresIn: '48h'}
        )

        res.status(200).json({
            message: 'Login successfully',
            success: true,
            jwtToken,
            email,
            name: user.name
        })
    }catch(err){
        res.status(500).json({
            message: 'Internal Server Error!!!',
            success: false
        })
    }
}

module.exports = {
    signup,
    login, users
}