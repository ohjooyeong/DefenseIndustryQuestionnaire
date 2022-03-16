import mongoose from "mongoose";

const schema = mongoose.Schema;

const resultSchema = mongoose.Schema(
  {
    level: {
      type: Number,
    },
    name: {
      type: String,
    },
    step: { type: String },
    summary: { type: String },
    problem: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Result = mongoose.model("Result", resultSchema);

export default Result;
