import mongoose from "mongoose";

const schema = mongoose.Schema;

const companySchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    phone: {
      type: Number,
    },
    charge_person: {
      type: String,
    },
    email: {
      type: String,
    },
    agree: {
      type: Array,
    },
  },
  { timestamps: true }
);

const companySchema = mongoose.model("Company", companySchema);

export default companySchema;
