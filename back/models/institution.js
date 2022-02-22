import mongoose from "mongoose";

const schema = mongoose.Schema;

const companySchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    city: {
      type: Number,
    },
    company: {
      type: [{ type: schema.Types.ObjectId, ref: "Company" }],
    },
  },
  { timestamps: true }
);

const companySchema = mongoose.model("Institution", companySchema);

export default companySchema;
