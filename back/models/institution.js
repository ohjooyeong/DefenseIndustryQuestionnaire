import mongoose from "mongoose";

const schema = mongoose.Schema;

const institutionSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    city: {
      type: String,
    },
    company: {
      type: [{ type: schema.Types.ObjectId, ref: "Company" }],
    },
  },
  { timestamps: true }
);

const Institution = mongoose.model("Institution", institutionSchema);

export default Institution;
