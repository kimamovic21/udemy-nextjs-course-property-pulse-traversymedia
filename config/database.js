import mongoose from "mongoose";
import colors from "colors";

const MONGODB_URI = process.env.MONGODB_URI;
let connected = false;

const connectDB = async () => {
    mongoose.set('strictQuery', true);

    // If the database is already connected, don't connect again
    if (connected) {
        console.log(colors.green('MongoDB is already connected...'));
        return;
    };

    // Connected to MongoDB
    try {
        await mongoose.connect(MONGODB_URI);
        connected = true;
        console.log(colors.green('MongoDB successfully connected!'));
    } catch (error) {
        console.log(colors.red(error));
    };
};

export default connectDB;
