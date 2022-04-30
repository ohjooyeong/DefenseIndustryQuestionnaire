import mongoose from "mongoose";

const schema = mongoose.Schema;

const centerSolutionSchema = mongoose.Schema(
  {
    desc: {
      type: String,
    },
    level: {
      type: Number,
    },
  },
  { timestamps: true }
);

const CeterSolution = mongoose.model("CeterSolution", centerSolutionSchema);

export default CeterSolution;
