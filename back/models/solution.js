import mongoose from "mongoose";

const schema = mongoose.Schema;

const solutionSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    content: {
      type: Object,
    },
  },
  { timestamps: true }
);

const Solution = mongoose.model("Solution", solutionSchema);

export default Solution;
