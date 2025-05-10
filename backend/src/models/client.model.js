import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      unique: [true, "Email already exists"],
      match: [
        // eslint-disable-next-line no-useless-escape
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    shoulder: {
      type: Number,
    },
    chest: {
      type: Number,
    },
    waist: {
      type: Number,
    },
    hips: {
      type: Number,
    },
    sleeveLength: {
      type: Number,
    },
    length: {
      type: Number,
    },
    neck: {
      type: Number,
    },
    cuff: {
      type: Number,
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

const Client = mongoose.model("Client", clientSchema);
export default Client;
