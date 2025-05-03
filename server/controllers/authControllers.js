const User = require('../Model/user')
const brypt = require('bcrypt')

const registereduser = async (req, res) => {
    const { userId, password } = req.body
    try {
        const existinguser = User.findOne({ userId })
        if (existinguser) {
            return res.status(400).json({ message: "user aleready exist" })
        }
        const hashpasword = await brypt.hash(password, 10);
        const newUser = new User({
            userId,
            password: hashpasword
        })
        await newUser.save();
        res.status(200).json({ message: "user registred scuccefully" })
    }

    catch (eror) {
        res.status(500).josn({ message: "Server Eror" })
    }

}
module.exports = { registereduser };
