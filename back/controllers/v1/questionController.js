import db from "../../models/index.js";
import { result_data } from "../../mockDB/result.js";
import { solution_data } from "../../mockDB/solution.js";
import { support_data } from "../../mockDB/support.js";
import {
  addScore,
  classifyDefenseCategory,
  classifyIns,
  classifyParticipate,
  classifyPropertyRights,
  classifyType,
  divideLevel,
  FindCondi,
  stringToNumber,
} from "../../utils/dataUtils.js";

// DB Create

const createSupportDB = (data) => {
  data.map(async (d) => {
    const SupportModel = await db.Support.findOneAndUpdate(
      {
        name: d.name,
      },
      d,
      {
        new: true,
        upsert: true,
      }
    );
    return SupportModel;
  });
};

// const createSolutionDB = (data) => {
//   data.map(async (d) => {
//     const SupportModel = await db.Solution.findOneAndUpdate(
//       {
//         name: d.name,
//       },
//       d,
//       {
//         new: true,
//         upsert: true,
//       }
//     );
//     return SupportModel;
//   });
// };

// const createResultDB = (data) => {
//   data.map(async (d) => {
//     const SupportModel = await db.Result.findOneAndUpdate(
//       {
//         name: d.name,
//       },
//       d,
//       {
//         new: true,
//         upsert: true,
//       }
//     );
//     return SupportModel;
//   });
// };

export const postResultController = async (req, res, next) => {
  try {
    const {
      body: { company, score, question, foundation },
    } = req;
    const total_score = addScore(score);
    const level = divideLevel(total_score);

    const institutionContext = {
      name: `${classifyIns(foundation)}국방벤처센터`,
      city: classifyIns(foundation),
    };

    // 기관 DB 생성
    const institutionModel = await db.Institution.findOneAndUpdate(
      {
        city: classifyIns(foundation),
      },
      institutionContext,
      {
        new: true,
        upsert: true,
      }
    );

    const companyContext = {
      name: company.orgName,
      phone: Number(company.phoneNum),
      email: company.email,
      agree: company.checked,
      charge_person: company.name,
      institution: institutionModel._id,
      level: level,
      item: foundation[1].answer,
      type: classifyType(foundation[2]),
      property_rights: classifyPropertyRights(foundation[3]),
      properties: Number(foundation[4].answer),
      participation_date: classifyParticipate(foundation[5]),
      business_sales: stringToNumber(foundation[6]),
      defense_proportion: Number(foundation[7].answer),
      establishment: foundation[8].answer,
      systematic_enterprise: foundation[9].answer,
      classifyDefenseCategory: classifyDefenseCategory(foundation[10]),
    };

    // 회사 DB 생성
    const companyModel = await db.Company.findOneAndUpdate(
      {
        name: companyContext.name,
        charge_person: companyContext.charge_person,
      },
      companyContext,
      {
        new: true,
        upsert: true,
      }
    );

    return res.status(200).json({
      status: 200,
      error: null,
      data: {
        score: total_score,
        level,
        company: {
          name: companyModel.name,
          charge_person: companyModel.charge_person,
        },
      },
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

export const getResultController = async (req, res, next) => {
  try {
    const {
      query: { level, company },
    } = req;
    const data = await db.Result.findOne({ level: level });

    const result = {
      level: data.level,
      problem: data.problem,
      step: data.step,
      summary: data.summary,
      name: data.name,
    };

    return res.status(200).json({
      status: 200,
      error: null,
      data: result,
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
