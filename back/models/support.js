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
    period: {
      type: Array,
    },
    period_target: {
      type: Array,
    },
    support_target: {
      type: String,
    },
  },
  { timestamps: true }
);

const Support = mongoose.model("Support", supportSchema);

export default Support;
