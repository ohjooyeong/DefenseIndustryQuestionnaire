import mongoose from "mongoose";

const schema = mongoose.Schema;

const reportSchema = mongoose.Schema(
  {
    company: {
      type: schema.Types.ObjectId,
      ref: "Company",
    },
    score: { type: Number },
    result: { type: schema.Types.ObjectId, ref: "Result" },
    consulting: {
      type: Array,
    },
    question: {
      type: Array,
    },
    foundation: {
      type: Array,
    },
  },
  { timestamps: true }
);

const reportSchema = mongoose.model("Result", reportSchema);

export default reportSchema;
