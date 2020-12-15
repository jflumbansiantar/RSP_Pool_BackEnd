const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const {uploader} = require('../middlewares/multer')

const User = require('../models/users');
const Room = require('../models/rooms');
const Book = require('../models/bookings');

module.exports = {
	//CRUD USERS
	createUser: async function ({ userInput }, req) {
		const found = await User.findOne({
			where: {
				email: userInput.email
			}
		})
		if (found) {
			res.status(409).json({
				status: false,
				msg: "Thats email already registered! Input another email account, thanks!"
			})
		} else {
			const hashPassword = await bcrypt.hash(userInput.password, 12)
			const user = new User({
				email: userInput.email,
				password: hashPassword,
				photo: userInput.photo,
			});
		}
		//Validating email and password
		const errors = [];
		if (!validator.isEmail(userInput.email)) {
			errors.push({
				status: false,
				message: "Invalid email!",
			})
		}
		if (validator.isEmpty(userInput.password) || !validator.isLength(userInput.password, { min: 6 })) {
			errors.push({
				status: false,
				message: "Password is too short!",
			})
		}

		const newUser = await user.save();
		return {
			...newUser._document,
			id: newUser.id.toString(),
		}
	},
	login: async function ({ email, password }) {
		const found = await User.find({
			where: {
				email: email,
			}
		})
		if (!found) {
			
		}
	}
}