export const divideLevel = (score) => {
  if (score < 3) {
    return 1;
  }
  if (score < 6) {
    return 2;
  }
  if (score < 10) {
    return 3;
  }
  if (score < 16) {
    return 4;
  }
  if (score < 30) {
    return 5;
  }
  if (score < 40) {
    return 6;
  }
  if (score < 50) {
    return 7;
  }
  return 8;
};

export const addScore = (data) => {
  let total = 0;
  for (const d of data) {
    if (typeof d.score === "number") {
      total += d.score;
    }
  }
  return total;
};

export const classifyIns = (data) => {
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

export const classifyType = (data) => {
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

export const classifyPropertyRights = (data) => {
  const bool = Number(data.answer.split("_")[1]);
  if (bool) {
    return true;
  }
  return false;
};

export const stringToNumber = (data) => {
  const sales = Number(data.answer.replaceAll(",", ""));
  return sales;
};

export const classifyParticipate = (data) => {
  const period = Number(data.answer.split("_")[1]);
  return period;
};

export const classifyDefenseCategory = (data) => {
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

export const FindCondi = (data) => {
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
