const UserModels = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Passwords do not match",
                success: false
            });
        }

        // Check if user already exists
        const user = await UserModels.findOne({ email });
        if (user) {
            return res.status(409).json({
                message: "User already exists, you can login!",
                success: false
            });
        }

        // Create a new user
        const userModel = new UserModels({ email, password , confirmPassword });
        userModel.password = await bcrypt.hash(password, 10);

        // Save the user
        await userModel.save();

        res.status(201).json({
            message: "Signup successful",
            success: true
        });

    } catch (err) {
        console.error(err);  // Log the error on the server side
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password} = req.body;

       

        // Check if user already exists
        const user = await UserModels.findOne({ email });
        if (!user) {
            return res.status(403).json({
                message: "Auth failed email or password is wrong!",
                success: false
            });
        }

        const isPassEqual = await bcrypt.compare(password,user.password);
        if (!isPassEqual) {
            return res.status(403).json({
                message: "Auth failed email or password is wrong!",
                success: false
            });
        }

        const jwToken = jwt.sign({email:user.email, _id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:'24h'}
        )
        

        res.status(200).json({
            message: "Login successful",
            success: true,
            jwToken,
            email
        });

    } catch (err) {
        console.error(err);  // Log the error on the server side
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

module.exports = {
    signup,
    login
};
