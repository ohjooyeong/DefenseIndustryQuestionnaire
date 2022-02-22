import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    name: {
      type: string,
    },
  },
  { timestamps: true }
);

const categorySchema = mongoose.model("Category", categorySchema);

export default categorySchema;
