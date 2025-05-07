const User = require('../models/user');
const bcrypt = require('bcrypt');

const registereduser = async (req, res) => {
    const { name, userId, password } = req.body;

    try {
        const existinguser = await User.findOne({ userId });

        if (existinguser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashpassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            userId,
            password: hashpassword
        });

        await newUser.save();

        res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("eror in resgistration",error)

        res.status(500).json({ message: "Server Error",error: error.message });
    }0
};

module.exports = { registereduser };
