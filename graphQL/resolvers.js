const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const { uploader } = require('../middlewares/multer')

const User = require('../models/users');
const Room = require('../models/rooms');
const Book = require('../models/bookings');

module.exports = {
	//CRUD USERS
	createUser: async function ({ userInput }, req, res) {
		const found = await User.findOne({
			where: {
				email: userInput.email
			}
		})
		if (found) {
			res.status(400).json({
				status: 'failed',
				msg: "Email already registered!"
			})
		}
		const hashPassword = await bcrypt.hash(userInput.password, 20)
		const user = new User({
			email: userInput.email,
			password: hashPassword,
			photo: userInput.photo,
		});

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
		if (errors.length > 0) {
			const error = new Error('Invalid input');
			error.data = errors;
			throw error;
		}

		const newUser = await user.save();
		res.status(200).json({
			status: 'success',
			message: 'User successfully created.',
			data: {
				...newUser._document,
				id: newUser.id.toString(),
			}
		})

	},
	login: async function ({ email, password }, req, res) {
		const found = await User.findOne({
			where: {
				email: email
			}
		});
		if (!found) {
			const error = new Error('User not found');
			throw error;
		}
		//check password
		bcrypt.compare(password, user.password);
		if (!isEqual) {
			const error = new Error('Incorrect password');
			throw error;
		}

		const token = jwt.sign({
			userId: user.id.toString(),
			email: user.email,
		})

		res.status(200).json(
			{
				status: 'success',
				message: 'User successfully login.',
				data: {
					token: token,
					userId: user.id.toString()
				}
			}
		)
	},
	getAllUsers: async function ( req, res ) {
		const user = await User.find().sort({ createdAt: -1 })
		res.status(200).json({
			users: users.map(element => {
				return {
					...element._document,
					_id: element._id.toString(),
					createdAt: element.createdAt.toISOString(),
					updatedAt: element.updatedAt.toISOString(),
				}
			})
		})
	},
	getUser: async function ({ id }, req) {
		const user = await User.findOne({
			where: { id }
		})
		if (!user) {
			res.status(400).json({
				status: 'failed',
				message: 'User not found.'
			})
		} else {
			res.status(200).json({
				users: users.map(element => {
					return {
						...element._document,
						_id: element._id.toString(),
						createdAt: element.createdAt.toISOString(),
						updatedAt: element.updatedAt.toISOString(),
					}
				})
			})
		}
	},

	//CRUD Room
	createRoom: async function ({ roomInput }, req, res) {
		const errors = [];
		if (!validator.isEmpty(roomInput.room_name)) {
			errors.push({
				status: false,
				message: "Invalid Room",
			})
		}
		if (!validator.isEmpty(roomInput.room_capacity)) {
			errors.push({
				status: false,
				message: "Invalid Room",
			})
		}
		if (!validator.isEmpty(roomInput.photo)) {
			errors.push({
				status: false,
				message: "Invalid Room",
			})
		}
		if (errors.length > 0) {
			const error = new Error('Invalid input');
			error.data = errors;
			throw error;
		}

		const room = new Room({
			room_name: roomInput.room_name,
			room_capacity: roomInput.room_capacity,
			photo: roomInput.photo,
		})

		const createdRoom = await room.save();
		res.status(200).json({
			status: 'success',
			message: 'Room created successfully.',
			data: {
				...createdRoom, id: createdRoom.id.toString(),
				createdAt: createdRoom.createdAt.toISOString(),
				updatedAt: createdRoom.updatedAt.toISOString(),
			}
		})
	},
	getAllRooms: async function ({ page }, req, res) {
		if (!page) {
			page = 1;
		}
		const perPage = 10;
		const totalRoom = await Room.find().countDocuments();
		const rooms = await Room.find()
			.sort({ createdAt: -1 })
			.skip((page - 1) * perPage)
			.limit(perPage);

		res.status(200).json({
			rooms: rooms.map(element => {
				return {
					...element._document,
					_id: element._id.toString(),
					createdAt: element.createdAt.toISOString(),
					updatedAt: element.updatedAt.toISOString(),
				};
			}),
			totalRoom: totalRoom
		})
	},
	getRoom: async function ({ id }, req) {
		const room = await Room.findOne({
			where: {
				id: room_id
			}
		})
		if (!room) {
			res.status(400).json({
				status: 'failed',
				message: 'Room not found.'
			})
		} else {
			res.status(200).json({
				status: 'success',
				message: 'Room successfully retrieved.',
				data: {
					...room._document,
					id: room.id.toString(),
					createdAt: element.createdAt.toISOString(),
					updatedAt: element.updatedAt.toISOString(),
				}
			})
		}
	},
	updateRoom: async function ({ id, roomInput }, req, res) {
		const errors = [];
		if (!validator.isEmpty(roomInput.room_name)) {
			errors.push({
				status: false,
				message: "Invalid Room",
			})
		}
		if (!validator.isEmpty(roomInput.room_capacity)) {
			errors.push({
				status: false,
				message: "Invalid Room",
			})
		}
		if (!validator.isEmpty(roomInput.photo)) {
			errors.push({
				status: false,
				message: "Invalid Room",
			})
		}
		if (errors.length > 0) {
			const error = new Error('Invalid input');
			error.data = errors;
			throw error;
		}
		const room = await Room.find(id);
		if (!room) {
			const error = new Error('Room not found');
			error.data = errors;
			throw error;
		}

		room.room_name = roomInput.room_name;
		room.room_capacity = roomInput.room_capacity;
		room.photo = roomInput.photo;
		if (roomInput.photo !== "undefined") {
			room.photo = roomInput.photo;
		}
		const updateRoom = await Room.save();
		res.status(200).json({
			status: 'success',
			message: 'Room successfully updated.',
			data: {
				...updateRoom._doc,
				id: updateRoom.id.toString(),
				createdAt: updateRoom.createdAt.toISOString(),
				updatedAt: updateRoom.updatedAt.toISOString(),
			}
		})

	},
	deleteRoom: async function ({ id }, req, res) {
		const room = await Room.findOne({
			where: {
				id
			}
		});
		if (!room) {
			const error = new Error('Room not found!');
			error.code = 404;
			throw error;
		} else {
			const result = await Room.destroy(id);
			res.status(200).json({
				status: 'success',
				msg: 'Room deleted',
				data: result,
				deleted_at: new Date(),
			})
		}
	},

	//CRUD Booking
	createBook: async function ({ bookingInput }, req) {
		const errors = [];
		//validator for room
		if (!validator.isEmpty(bookingInput.room_id)) {
			errors.push({
				status: false,
				message: "Invalid Room",
			})
		}
		//validator for total person (if >, send error message)
		if (!validator.isEmpty(bookingInput.room_id)) {
			errors.push({
				status: false,
				message: "Invalid Room",
			})
		}
		//validator noted (do not empty)
		if (!validator.isEmpty(bookingInput.noted)) {
			errors.push({
				status: false,
				message: "Invalid Room",
			})
		}
		//validator check_in/out_time
		if (!validator.isEmpty(bookingInput.check_in_time)) {
			errors.push({
				status: false,
				message: "Invalid Room",
			})
		}
		if (!validator.isEmpty(bookingInput.check_out_time)) {
			errors.push({
				status: false,
				message: "Invalid Room",
			})
		}

		//collect all the errors 
		if (errors.length > 0) {
			const error = new Error('Invalid input');
			error.data = errors;
			throw error;
		}
		//User check
		const user = await User.findOne(req.userData.id);
		const room = await Room.findOne(req.params.id);
		if (!user) {
			const error = new Error('Invalid user');
			throw error;
		}
		if (!room) {
			const error = new Error('Invalid room');
			throw error;
		}
		if (user && room) {
			const error = new Error('You already had book this room.');
			throw error;
		}
		//create Booking
		const book = new Book({
			total_person: bookingInput.total_person,
			booking_time: bookingInput.booking_time,
			noted: bookingInput.noted,
			check_in_time: bookingInput.check_in_time,
			check_out_time: bookingInput.check_out_time,

		})

		const createdBooking = await book.save();
		res.status(200).json({
			status: 'success',
			message: 'You booking successfully created!',
			data: {
				...createdBooking, id: createdBooking.id.toString(),
				updatedAt: createdBook.updatedAt.toISOString(),
				createdAt: createdBook.createdAt.toISOString(),
			}
		})
	},
	getAllBookings: async function () {
		if (!page) {
			page = 1;
		}
		const perPage = 20;
		const totalBook = await Book.find().countDocuments();
		const books = await Book.find()
			.sort({ createdAt: -1 })
			.skip((page - 1) * perPage)
			.limit(perPage);
		res.status(200).json({
			bookings: books.map(element => {
				return {
					...element._document,
					_id: element._id.toString(),
					createdAt: room.createdAt.toISOString(),
					updatedAt: room.updatedAt.toISOString(),
				};
			}),
			totalBook: totalBook
		})
	},
	getBookings: async function ({ id }, req, res) {
		const user = await User.findOne(req.userData.id);
		if (!user) {
			const error = new Error('Invalid user');
			throw error;
		}
		const book = await Bookings.findOne({ id })
		res.status(200).json({
			success: 'success',
			message: 'Here is all your bookings.',
			data: {
				...book._document,
				id: booking.id.toString(),
				createdAt: book.createdAt.toISOString(),
				updatedAt: book.updatedAt.toISOString(),
			}
		})
	},
	bookingApproved: async function ({ id }, req, res) {
		const book = await Booking.findOne(req.params.id);
		if (!book) {
			res.status(400).json({
				status: 'failed',
				msg: "Booking not found."
			})
		}
		const approved = await Book.update({
			where: {
				updatedAt: new Date(),
			}
		})
		res.status(200).json({
			success: 'success',
			message: 'Your booking had been approved.',
			data: {
				...book._document,
				id: booking.id.toString(),
				createdAt: book.createdAt.toISOString(),
				updatedAt: book.updatedAt.toISOString(),
			}
		})
	},
	bookingRejected: async function ({ id }, req, res) {
		const book = await Booking.findOne(req.params.id);
		if (!book) {
			res.status(400).json({
				status: 'failed',
				msg: "Booking not found."
			})
		}
		const rejected = await Book.update({
			where: {
				updatedAt: new Date(),
			}
		})
		res.status(200).json({
			success: 'success',
			message: 'Your booking had been rejected.',
			data: {
				...book._document,
				id: booking.id.toString(),
				createdAt: book.createdAt.toISOString(),
				updatedAt: book.updatedAt.toISOString(),
			}
		})
	}
}