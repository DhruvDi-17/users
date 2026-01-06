const DB = require('../config/db')


exports.CreateUsers = async (req, res) => {
    try {
        const { name, email, age, city } = req.body
        if (!name || !email || !age || !city) {
            return res.status(400).json({
                success: false,
                message: "Name, Email, age, city Is Required Field's"
            })
        }
        DB.query('select *from users where user_email = ?', [email], (err, data) => {
            if (err) { console.log("error of err"); return res.status(500).json({ success: false, message: `Internal Server ${err}` }) }
            if (data.length > 0) {
                return res.status(409).json({ success: false, message: "Email Is Alredy Exist!" })
            }
            DB.query('insert into users (user_name,user_email,user_age,user_city) values (?,?,?,?)', [name, email, age, city], (err, data) => {
                if (err) { return console.log("Error To Add User"); }

                return res.status(201).json({
                    success: true,
                    message: "User Created Successesfully!",
                    data: data
                })
            })
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: `Internal Server Error ${err}`
        })
    }
}

exports.getUsers = async (req, res) => {
    try {
        DB.query('select *from users', (err, data) => {
            if (err) { return res.status(404).json({ success: false, message: "Error To Find User", error: err.message }) }
            if (data && data.length > 0) {
                return res.status(200).json({
                    success: true,
                    message: 'User found successfully',
                    data: data
                });
            } else {
                return res.status(404).json({
                    success: false,
                    message: 'User not found',
                    data: null
                });
            }

        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: `Internal Server Error ${err}`
        })
    }
}

exports.getUsersById = async (req, res) => {
    try {
        const userId = req.params.id
        DB.query('select *from users where user_id = ?', [userId], (err, data) => {
            if (err) { return res.status(404).json({ success: false, message: "Error To Find User", error: err }) }
            if (data && data.length > 0) {
                return res.status(200).json({
                    success: true,
                    message: 'User found successfully',
                    data: data
                });
            } else {
                return res.status(404).json({
                    success: false,
                    message: 'User not found',
                    data: null
                });
            }

        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: `Internal Server Error ${err}`
        })
    }
}

exports.DeleteUser = async (req, res) => {
    try {
        const userId = req.params.id
        DB.query('delete from users where user_id = ?', [userId], (err, data) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ success: false, message: "Error deleting user from database", error: err.message });
            }


            if (data && data.affectedRows > 0) {
                return res.status(200).json({
                    success: true,
                    message: `User with ID ${userId} deleted successfully`,
                    data: { affectedRows: data.affectedRows }
                });
            } else {
                return res.status(404).json({ success: false, message: `User not found with ID ${userId}`, data: null });
            }
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: `Internal Server Error ${err}`
        })
    }
}

