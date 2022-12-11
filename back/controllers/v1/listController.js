import db from "../../models/index.js";

export const getCompanyListController = async (req, res, next) => {
  try {
    const data = await db.Company.find();
    const institution = await db.Institution.find();
    const institutionMatch = {};
    institution.map((ins) => {
      institutionMatch[`${ins._id}`] = ins.name;
    });

    const resultData = data.map((company) => {
      // console.log(company.institution);

      const temp = {
        ...company._doc,
        institution: institutionMatch[company.institution],
      };

      return temp;
    });
    return res.status(200).json({
      status: 200,
      error: null,
      data: resultData,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      status: 400,
      error: `${error}`,
      data: null,
    });
  }
};
