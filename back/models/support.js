import mongoose from "mongoose";

const schema = mongoose.Schema;

const supportSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    content: {
      type: Object,
    },
    start_date: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Support = mongoose.model("Support", supportSchema);

export default Support;
