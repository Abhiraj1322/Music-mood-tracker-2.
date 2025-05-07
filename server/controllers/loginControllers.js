const User = require("../models/user")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET;
const loginUser = async (req, res) => {
    const { userId, password } = req.body;

    try {
        const user = await User.findOne({ userId });
        if (!user) {
            return res.status(400).json({ message: "user not found" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: 'invalid pasword' })
        }
        const token = jwt.sign({ userId: user.userId }, JWT_SECRET, { expiresIn: '1h' })
        res.status(200).json({ message: "Login Succesfull", token })
    }
    catch (eror) {
        console.error(eror);
        res.status(500).json({ message: "server eror" })
    }



}
module.exports={loginUser};