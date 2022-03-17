import mongoose from "mongoose";

const schema = mongoose.Schema;

const solutionSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    field: { type: Number },
    level: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Solution = mongoose.model("Solution", solutionSchema);

export default Solution;
