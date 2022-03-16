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
    period: {
      type: Array,
    },
    period_target: {
      type: Number,
    },
    field_target: {
      type: Number,
    },
    level: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Solution = mongoose.model("Solution", solutionSchema);

export default Solution;
