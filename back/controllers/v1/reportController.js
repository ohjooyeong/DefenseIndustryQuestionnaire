import db from "../../models/index.js";
import { FindCondi } from "../../utils/dataUtils.js";

export const postReportController = async (req, res, next) => {
  try {
    const {
      body: {
        result: { score, level, company },
        question,
      },
    } = req;

    const resultData = await db.Result.findOne({ level: level });
    const companyData = await db.Company.findOne({
      name: company.name,
      charge_person: company.charge_person,
    });

    let supports = [];
    const supportData = await Promise.all(
      FindCondi(companyData.type).map((data) => {
        const support = db.Support.find({
          support_target: { $regex: data },
        });
        if (support) {
          return support;
        }
      })
    );
    supports = supports.concat(...supportData);

    const support = await db.Support.find({
      period_target: { $in: [companyData.participation_date] },
    });

    supports = supports.concat(...support);

    const map = new Map(); // 맵

    for (const sup of supports) {
      map.set(JSON.stringify(sup), sup); // name, company가 모두 같은 객체 요소는 제외한 맵 생성
    }
    const supportUnique = [...map.values()];

    const solutionData = await db.Solution.find({
      level: level,
    });
    const report = new db.Report({
      company: companyData._id,
      score: score,
      result: resultData._id,
      solution: solutionData,
      support: supportUnique,
      question: question,
    });

    await report.save(function (err) {
      if (err)
        return res.status(200).json({
          status: 400,
          error: err,
          data: null,
        });
    });
    return res.status(200).json({
      status: 200,
      error: null,
      data: { id: report._id },
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

export const getReportController = async (req, res, next) => {
  try {
    const {
      query: { id },
    } = req;
    const data = await db.Report.findOne({ _id: id })
      .populate("company")
      .populate("result")
      .exec();

    return res.status(200).json({
      status: 200,
      error: null,
      data,
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

export const getCenterReportController = async (req, res, next) => {
  try {
    const {
      query: { id },
    } = req;
    const center = await db.Institution.findOne({ _id: id });
    const companies = await db.Company.find({ institution: center._id });

    const context = {
      name: center.name,
      company_length: companies.length,
      company_list: companies,
      createdAt: center.createdAt,
    };

    return res.status(200).json({
      status: 200,
      error: null,
      data: context,
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

export const getCenterInComapnyReportController = async (req, res, next) => {
  try {
    const {
      params: { companyId },
    } = req;

    const data = await db.Report.findOne({ company: companyId })
      .populate("company")
      .populate("result")
      .exec();

    return res.status(200).json({
      status: 200,
      error: null,
      data,
    });
  } catch (error) {
    return res.status(200).json({
      status: 400,
      error: `${error}`,
      data: null,
    });
  }
};
