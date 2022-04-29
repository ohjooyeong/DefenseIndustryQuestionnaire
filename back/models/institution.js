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
  },
  { timestamps: true }
);

const Institution = mongoose.model("Institution", institutionSchema);

export default Institution;
