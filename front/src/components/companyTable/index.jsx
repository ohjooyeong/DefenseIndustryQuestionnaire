import React from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

function CompanyTable() {
  return (
    <Container>
      <Title>기업명</Title>
      <Desc>(주)페이서</Desc>
      <Info>
        <Title>담당자 이메일</Title>
        <Title>연락처</Title>
      </Info>
      <Info>
        <Desc>brb1111@naver.com</Desc>
        <Desc>02-6952-0021</Desc>
      </Info>
      <Title>매출액 (국방 %)</Title>
      <Desc>10억원 (0.5%)</Desc>
      <Title>업력 (국방 사업 기간)</Title>
      <Desc>10년 (1년)</Desc>
      <Title>인증서 및 확인서</Title>
      <DescFull>공장등록증, 이노비즈, 벤처기업, 직접생산확인서</DescFull>
      <Title>국방과제 및 지원사업 경험</Title>
      <DescFull>방산중소기업 컨설팅 지원 사업 / 조달사업 연구용역</DescFull>
      <Title>참여중인 사업 / 소속 체계기업</Title>
      <DescFull>
        국방벤처 협약기업 기업진단 및 로드맵 지원 / LIG 넥스원
      </DescFull>
      <Title>국방 체계 분류</Title>
      <DescFull>무기체계</DescFull>
      <Title>아이템 소개</Title>
      <DescInfo>
        {`- 기업진단 프로세스 개발
        국방벤처 협약기업의 기업현황을 분석하기 위한 질문과 애로사항을 확인하여 해결방을 모색
        그에 따른 지원프로그램을 단계에 맞도록 추천하는 프로세스를 개발하여 국방기술진흥연구소에 공급`}
      </DescInfo>
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
