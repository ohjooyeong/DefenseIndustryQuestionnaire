import React from "react";
import styled from "@emotion/styled";
import {
  careerFormattedDate,
  participateFormattedDate,
} from "../../utils/dateFormat";

const typeConfirm = (arr) => {
  const string = arr.join(", ");
  return string;
};

const viewKorean = (num) => {
  let result = "";
  let number = Array.from(String(num)).reverse();

  for (let i = 0; i < number.length; i++) {
    let num_string = "";
    num_string += number[i];

    if (i === 4) {
      result = "";
      num_string += "만";
    }
    if (i === 8) {
      result = "";
      num_string += "억";
    }
    if (i === 12) {
      result = "";
      num_string += "조";
    }
    result = num_string + result;
  }

  if (num !== 0) {
    result = result + "원";
  }

  return result;
};

function CompanyTable({ data }) {
  return (
    <Container>
      <Title>기업명</Title>
      <Desc>{data.name}</Desc>
      <Info>
        <Title>담당자 이메일</Title>
        <Title>연락처</Title>
      </Info>
      <Info>
        <Desc>{data.email}</Desc>
        <Desc>{data.phone}</Desc>
      </Info>
      <Title>매출액 (국방 %)</Title>
      <Desc>{`${viewKorean(data.business_sales)} (${data.properties}%)`}</Desc>
      <Title>업력 (국방 사업 기간)</Title>
      <Desc>{`${
        careerFormattedDate(data.establishment) + 1
      }년 (${participateFormattedDate(data.participation_date)})`}</Desc>
      <Title>인증서 및 확인서</Title>
      <DescFull>{typeConfirm(data.type)}</DescFull>
      <Title>국방과제 및 지원사업 경험</Title>
      <DescFull>{""}</DescFull>
      <Title>참여중인 사업 / 소속 체계기업</Title>
      <DescFull>{` / ${data.systematic_enterprise}`}</DescFull>
      <Title>국방 체계 분류</Title>
      <DescFull>무기체계</DescFull>
      <Title>아이템 소개</Title>
      <DescInfo>{data.item}</DescInfo>
    </Container>
  );
}

export default CompanyTable;

const Container = styled("div")`
  width: 491px;
  border-top: 1px solid #ec5b53;
  border-left: 1px solid #ec5b53;
  display: grid;
  grid-template-columns: 145px 99px 105px 142px;
  grid-template-rows: 36px 26px 26px 26px 26px 26px 1fr;
`;

const Title = styled("div")`
  display: flex;
  font-weight: 500;
  font-size: 10px;
  line-height: 16px;
  align-items: center;
  justify-content: center;
  letter-spacing: -0.0025em;
  height: auto;
  width: auto;
  background: rgba(236, 91, 83, 0.15);
  color: #9b1911;
  border-bottom: 1px solid #ec5b53;
  border-right: 1px solid #ec5b53;
`;

const Desc = styled("div")`
  display: flex;
  font-weight: 500;
  font-size: 10px;
  line-height: 15px;
  align-items: center;
  justify-content: center;
  letter-spacing: -0.0025em;
  color: #212121;
  border-bottom: 1px solid #ec5b53;
  border-right: 1px solid #ec5b53;
`;

const Info = styled("div")`
  display: grid;
  grid-template-rows: 1fr 1fr;
`;

const DescFull = styled("div")`
  display: flex;
  font-weight: 500;
  font-size: 10px;
  line-height: 15px;
  align-items: center;
  justify-content: center;
  letter-spacing: -0.0025em;
  color: #212121;
  grid-column: 2/5;
  border-bottom: 1px solid #ec5b53;
  border-right: 1px solid #ec5b53;
`;

const DescInfo = styled("div")`
  display: flex;
  font-weight: 500;
  font-size: 10px;
  line-height: 15px;
  padding: 6px 8px;
  align-items: center;
  letter-spacing: -0.0025em;
  color: #212121;
  grid-column: 2/5;
  white-space: pre-line;
  border-bottom: 1px solid #ec5b53;
  border-right: 1px solid #ec5b53;
`;
