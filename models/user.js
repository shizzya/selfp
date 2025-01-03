import pkg from 'mongoose';
const { mongoose, Schema, models } = pkg;

const userSchema = new Schema(
  {
    phoneNumber: {
      type: String,
      unique: [true, 'Phone Number Already Registreted'],
      required: [true, 'Required'],
    },
    sessionId: {
      type: String,
      required: true,
    },
    statusReadMessage: {
      type: String,
      default: "Yoo Mf I read Your Status don't forget to do the same idiot 👀", 
    },
    statusReadEnabled: {
      type: Boolean,
      default: true, 
    },
    autoReactEnabled: {
      type: Boolean,
      default: false,
    },
    autoTyping: {
    type: Boolean,
    default: false,
    },
    autoRead: {
    type: Boolean,
    default: false,
    },
    alwaysOnline: {
    type: Boolean,
    default: false,
    },
    autoRecording: {
    type: Boolean,
    default: false,
    },
    antiCall: {
    type: Boolean,
    default: false,
    },
    antiLink: {
    type: Boolean,
    default: false,
    },
    prefix: {
    type: String,
    default: '.',
    },
    statusReactNotify: {
    type: Boolean,
    default: true,
    },
  },
  { timestamps: true }
);

const Users = models.Users || mongoose.model("Users", userSchema);
export default Users;
