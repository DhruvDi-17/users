const DB = require('../config/db')
const jwt = require('jsonwebtoken')
const jwtconfig = require('../config/Jwt')
const { HashPassword, ComparePassword } = require('../utils/hash')
const bcypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')
exports.singup = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name,Email And password Is Required Field's"
            })
        }
        DB.query('select user_id from users_auth where user_email = ? ', [email],async (err, data) => {
            if (err){console.log("error of err"); return res.status(500).json({ success: false, message: `Internal Server ${err}` })}
            // console.log(data)
            if (data.length > 0) {
                return res.status(409).json({ success: false, message: "Email Is Alredy Exist!" })
            }
        })
        const userid = uuidv4()
        const hashpassword = await bcrypt.hash(password,10)
        DB.query(
            'insert into users_auth (user_id,user_name,user_email,user_password) values (?,?,?,?)', [userid, name, email, hashpassword], (err, data) => {
                if (err) return res.status(500).json({ success: false, message: `Internal Server ${err}` })

                return res.status(201).json({
                    success: true,
                    message: "User Created Successesfully!",
                    data: data
                })
            })


    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "internal Server Error",
        })
    }
}

