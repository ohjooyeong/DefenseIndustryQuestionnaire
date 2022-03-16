import db from "../../models/index.js";
import { solution } from "../../solution.js";
import { support_data } from "../../support.js";

const divideLevel = (score) => {
  if (score <= 3) {
    return 1;
  }
  if (score <= 6) {
    return 2;
  }
  if (score <= 10) {
    return 3;
  }
  if (score <= 15) {
    return 4;
  }
  if (score <= 30) {
    return 5;
  }
  if (score <= 40) {
    return 6;
  }
  if (score <= 48) {
    return 7;
  }
  return 8;
};

const addScore = (data) => {
  let total = 0;
  for (const d of data) {
    if (typeof d.score === "number") {
      total += d.score;
    }
  }
  return total;
};

const classifyIns = (data) => {
  const ques = data.filter((m) => m.id === "f-1")[0];
  const centerIndex = ques.answer.split("_")[1];
  let center = "충북";

  switch (centerIndex) {
    case "0":
      center = "충북";
      break;
    case "1":
      center = "충남";
      break;
    case "2":
      center = "대전";
      break;
    case "3":
      center = "전북";
      break;
    case "4":
      center = "전남";
      break;
    case "5":
      center = "광주";
      break;
    case "6":
      center = "경남";
      break;
    case "7":
      center = "울산";
      break;
    case "8":
      center = "구미";
      break;
    case "9":
      center = "부산";
      break;
    default:
      break;
  }
  return center;
};

const classifyType = (data) => {
  const types = data.answer.map((id) => {
    const type = id.split("_")[1];
    switch (type) {
      case "0":
        return "공장등록";
      case "1":
        return "기업부설연구소";
      case "2":
        return "국방벤처기업";
      case "3":
        return "벤처기업";
      case "4":
        return "이노비즈";
      case "5":
        return "직접생산확인 증명서";
      case "6":
        return "중소기업(소기업) 확인서";
      default:
        break;
    }
  });

  return types;
};

const classifyPropertyRights = (data) => {
  const bool = Number(data.answer.split("_")[1]);
  if (bool) {
    return true;
  }
  return false;
};

const stringToNumber = (data) => {
  const sales = Number(data.answer.replaceAll(",", ""));
  return sales;
};

const classifyParticipate = (data) => {
  const period = Number(data.answer.split("_")[1]);
  return period;
};

const classifyDefenseCategory = (data) => {
  const category = data.answer.split("_")[1];

  switch (category) {
    case "0":
      return "무기체계";
    case "1":
      return "전력지원체계";
    default:
      break;
  }
};

const FindCondi = (data) => {
  let keywords = [];
  for (let i = 0; i < data.length; i++) {
    let keyword;
    switch (data[i]) {
      case "공장등록":
        keyword = ["공장"];
        keywords = keywords.concat(keyword);
        break;
      case "기업부설연구소":
        keyword = ["기업연구", "부설연구소", "기업부설"];
        keywords = keywords.concat(keyword);
        break;
      case "국방벤처기업":
        keyword = ["국방벤처", "국방벤쳐", "국방 벤쳐", "국방 벤처"];
        keywords = keywords.concat(keyword);
        break;
      case "벤처기업":
        keyword = ["벤쳐기업", "벤처기업", "벤처 기업"];
        keywords = keywords.concat(keyword);
        break;
      case "이노비즈":
        keyword = ["이노비즈"];
        keywords = keywords.concat(keyword);
        break;
      case "직접생산확인 증명서":
        keyword = ["직접생산", "직접 생산"];
        keywords = keywords.concat(keyword);
        break;
      case "중소기업(소기업) 확인서":
        keyword = ["스타트업", "중소기업", "소기업"];
        keywords = keywords.concat(keyword);
        break;
      default:
        break;
    }
  }
  return keywords;
};

// DB Create

// const createSupportDB = (data) => {
//   data.map(async (d) => {
//     const SupportModel = await db.Support.findOneAndUpdate(
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
    next(error);
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
    next(error);
  }
};

export const postReportController = async (req, res, next) => {
  try {
    const {
      body: {
        result: { score, level, company },
      },
    } = req;

    const resultData = await db.Result.findOne({ level: level });
    const companyData = await db.Company.findOne({
      name: company.name,
      charge_person: company.charge_person,
    });
    console.log(FindCondi(companyData.type));
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

    const solutiontData = await db.Solution.find({
      level: level,
    });
    const report = new db.Report({
      company: companyData._id,
      score: score,
      result: resultData._id,
      solution: solutiontData,
      support: supportUnique,
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
    next(error);
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
    next(error);
  }
};
