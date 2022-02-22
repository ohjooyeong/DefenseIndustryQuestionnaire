import mongoose from "mongoose";

const schema = mongoose.Schema;

const foundationSchema = mongoose.Schema(
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
    number: {
      type: Boolean,
    },
    unit: {
      type: String,
    },
    check_date: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const foundationSchema = mongoose.model("Foundation", foundationSchema);

export default foundationSchema;
