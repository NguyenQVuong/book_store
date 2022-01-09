const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const path = require('path');

const registerSchema = Joi.object({
    username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
    email: Joi.string()
    .email()
    .required(),
    password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required(),
    confirmationPassword: Joi.any().valid(Joi.ref('password')).required()
});

const loginSchema = Joi.object({
    email: Joi.string().email().min(5).required(),
    password: Joi.string().min(5).required()
});

class UserController {
    register (req, res) {
        res.sendFile(path.join(__dirname, '../views/register.html'))
    }
    async registerUser(req, res) {
        let error = registerSchema.validate(req.body);
        if(error) {
            console.log("loi: ", error);
        }
        const checkEmail = await User.findOne({email: req.body.email})
        if(checkEmail) {
            res.status(400).send("Email already exists").redirect('/register');
        }
        const salt = await bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(req.body.password, salt);

        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword
        });
        try{
            const saveUser = await user.save();
            res.json(saveUser);
        }
        catch(err) {
            res.status(501).send()
        }
    };
    
    async loginUser(req, res) {
        // let error = loginSchema.validate(req.body);
        // if(error) {
        //     console.log("loi:", error);
        // }       
        try{
            const user = await User.findOne({email: req.body.email})   
            if(!user) {
                    return res.send("email not found");
                };
                const checkPassword = await bcrypt.compareSync(req.body.password, user.password);
                    if(!checkPassword) {
                        return res.send("password was wrong").redirect('/dang-nhap')
                    }
                    else {
                        const token = jwt.sign({ _id: user._id }, 'nguyenvuong', {
                            expiresIn: '30m',
                        });
                            res.header('auth-token', token).send(token);
                }
        }
        catch(err){
            res.send(err)
        }
    }

    async confimPassword(req, res) {

    }

    async logOut(req, res) {
        res.cookie('auth-token','', {maxAge: 1});
        res.send('logout')
    }
}
module.exports = new UserController;