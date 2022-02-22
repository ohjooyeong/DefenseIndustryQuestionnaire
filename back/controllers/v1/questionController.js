import db from "../../models/index.js";

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

export const postResultController = async (req, res, next) => {
  try {
    const {
      body: { company, score, question, foundation },
    } = req;
    const companyContext = {
      name: company.orgName,
      phone: Number(company.phoneNum),
      email: company.email,
      agree: company.checked,
      charge_person: company.name,
    };
    const total_score = addScore(score);
    const level = divideLevel(total_score);
    const reportContext = {
      score: total_score,
    };
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

    // 회사 DB 생성
    const companyModel = await db.Company.findOneAndUpdate(
      { name: companyContext.name },
      companyContext,
      {
        new: true,
        upsert: true,
      }
    );

    // 기관에 회사 ID 자식관계 설정
    const addCompanyToInstitution = await db.Institution.findByIdAndUpdate(
      institutionModel._id,
      {
        $set: {
          company: companyModel,
        },
      },
      { new: true, useFindAndModify: false }
    );

    return res.status(200).json({
      status: 200,
      error: null,
      data: { score: total_score, level, company: companyModel.name },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
