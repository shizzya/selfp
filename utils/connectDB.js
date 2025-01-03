import mongoose from 'mongoose';

const mongoDB = "mongodb+srv://maxiiiii:yooo6916@cluster0.qsehi0c.mongodb.net/?retryWrites=true&w=majority";

let isConnected = false;

const ConnectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    isConnected = true;
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default ConnectDB;