const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type User {
        id: ID!
        email: String!
        password: String
        photo: String!
        deleted_at: String!
        createdAt: String!
        updatedAt: String!
    }
    type Room {
        id: ID!
        room_name: String!
        room_capacity: String!
        photo: String!
        deleted_at: String!
        createdAt: String!
        updatedAt: String!
    }
    type Booking {
        id: ID!
        user_id: Int!
        room_id: Int!
        total_person: Int!
        booking_time: String!
        noted: String!
        check_in_time: String!
        check_out_time: String!
        deleted_at: String!
        createdAt: String!
        updatedAt: String!
    }

    input UserDataInput {
        email: String!
        password: String!
        photo: String!
    }
    input RoomDataInput {
        room_name: String!
        room_capacity: String!
        photo: String!
    }
    input BookingDataInput {
        total_person: Int!
        booking_time: String!
        noted: String!
        check_in_time: String!
        check_out_time: String!
    }
    
    type AuthData {
        token: String!
        userId: String!
    }
    type RoomData {
        rooms: [Room!]!
        totalRoom: Int!
    }
    type BookingData {
        bookings: [Booking!]!
        totalBook: Int!
    }

    type RootQuery {
        login(email: String, password: String!): AuthData!
        rooms(id: ID!): Room!
        bookings: BookingData!
        room(id: ID!): Room!
        booking(id: ID!): Booking!
        user: User!
    }

    type RootMutation {
        createUser(userInput: UserDataInput): User!
        createRoom(roomInput: RoomDataInput): Room!
        createBooking(bookingInput: BookingDataInput): Booking!
        updateRoom(id: ID!, roomInput: RoomDataInput): Room!
    }

    schema{
        query: RootQuery
        mutation: RootMutation
    }
`);