import mongoose from "mongoose";

const schema = mongoose.Schema;

const questionSchema = mongoose.Schema(
  {
    pk: {
      type: String,
      unique: 1,
    },
    content: {
      type: String,
    },
    answer: {
      type: schema.Types.Mixed,
    },
    category: {
      type: schema.Types.ObjectId,
      ref: "Category",
    },
    type: {
      type: String,
    },
    prev: {
      type: Boolean,
    },
    next: {
      type: Boolean,
    },
    score: {
      type: schema.Types.Mixed,
    },
    child_yes: {
      type: String,
    },
    child_no: {
      type: String,
    },
    check: {
      type: Boolean,
    },
    last: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);

export default Question;
