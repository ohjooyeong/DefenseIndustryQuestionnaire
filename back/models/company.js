import mongoose from "mongoose";

const schema = mongoose.Schema;

const companySchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    phone: {
      type: Number,
    },
    charge_person: {
      type: String,
    },
    email: {
      type: String,
    },
    agree: {
      type: Array,
    },
    institution: {
      type: schema.Types.ObjectId,
      ref: "Institution",
    },
    level: {
      type: Number,
    },
    item: {
      type: String,
    },
    type: {
      type: Array,
    },
    property_rights: {
      type: Boolean,
    },
    properties: {
      type: Number,
    },
    participation_date: {
      type: Number,
    },
    business_sales: {
      type: Number,
    },
    defense_proportion: {
      type: Number,
    },
    establishment: {
      type: Date,
    },
    systematic_enterprise: {
      type: String,
    },
    defense_category: {
      type: String,
    },
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", companySchema);

export default Company;
