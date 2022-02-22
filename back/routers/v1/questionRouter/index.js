import { Router } from "express";

const questionRouter = Router();

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

questionRouter.post("/question/result", async (req, res, next) => {
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
    const reportContext = {};

    return res.status(200).json({
      status: 200,
      error: null,
      data: { score: total_score, level, company: company.orgName },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default questionRouter;
