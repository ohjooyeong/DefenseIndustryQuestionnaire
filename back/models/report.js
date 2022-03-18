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
    solution: {
      type: Array,
    },
    support: {
      type: Array,
    },
    question: {
      type: Object,
    },
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", reportSchema);

export default Report;
