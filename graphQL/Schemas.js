const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type User {
        id: ID!
        email: String!
        password: String!
        photo: String!
        deleted_at: String!
    }
    type Room {
        id: ID!
        room_name: String!
        room_capacity: String!
        photo: String!
        deleted_at: String!
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
        user_id: Int!
        room_id: Int!
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

    type RootQuery {
        login(email: String, password: String!): AuthData!
    }

    type RootMutation {
        createUser(userInput: UserDataInput): User!
        createRoom(RoomInput: RoomDataInput): Room!
        createBooking(BookingInput: BookingDataInput): Booking!
    }

    schema{
        query: RootQuery
        mutation: RootMutation
    }
`);