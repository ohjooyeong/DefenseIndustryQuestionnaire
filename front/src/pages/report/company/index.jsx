import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import ReportTop from "../../../components/ReportTop";
import SupportBusiness from "../../../components/SupportBusiness";
import styles from "./company.module.css";

function CompanyReport() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <ReportTop purpose={"기업용"} color="blue"></ReportTop>
        <Body>
          <Title>협약기업 분석 및 해결방안</Title>
          <Desc>
            기업 진단질문 결과의 점수를 종합하여 기업의 현재 사업화 단계를
            확인하고, 그에 따른 문제점과 해결방안을 제공합니다
          </Desc>
          <CompanyName>기업명: (주)페이서 / 군사업 진입준비 단계</CompanyName>
          <StepWrap>
            <BackColor level={4}>
              <img src={`/image/graph/graph_4.png`} alt="" />
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </BackColor>
          </StepWrap>
          <DiffWrap>
            <DiffTitle>애로사항</DiffTitle>
            <span>1. 국방시장의 이해</span>
            <span>2. 국방사업 참여 동기 강화</span>
            <span>3. 제품(기술)의 진입분야 조사(스팩 확인)</span>
            <span>4. 제품(기술) 개발 포인트 확인</span>
            <span>5. 사업화 문의처 필요</span>
            <span>6. 협약기업에 맞는 과제 찾기 어려움</span>
          </DiffWrap>
          <SupportBusiness></SupportBusiness>
        </Body>
        <Footer>
          <div>2022-01-20</div>
          <div>1</div>
        </Footer>
      </div>
    </div>
  );
}

export default CompanyReport;

const Body = styled("div")`
  width: 100%;
  margin-top: 10px;
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  padding-top: 20px;

  padding-bottom: 12px;
`;

const Footer = styled("div")`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0px 8px;
  margin-top: 10px;

  div {
    font-size: 10px;
    line-height: 14px;

    letter-spacing: -0.0025em;

    color: #212121;
  }
`;

const Title = styled("div")`
  font-weight: 800;
  font-size: 16px;
  line-height: 25px;
  letter-spacing: -0.0025em;
  margin-bottom: 4px;
  padding-left: 20px;
  color: #212121;
`;

const Desc = styled("div")`
  font-size: 11px;
  line-height: 18px;
  letter-spacing: -0.0025em;
  color: #616161;
  padding-left: 20px;
  padding-right: 20px;
`;

const CompanyName = styled("div")`
  padding-left: 32px;
  font-weight: bold;
  font-size: 14px;
  line-height: 22px;

  letter-spacing: -0.0025em;

  margin-top: 16px;
  margin-bottom: 8.5px;
  position: relative;

  color: #093476;
  &::before {
    content: "";
    position: absolute;
    top: 0px;
    left: 21px;
    width: 4px;
    height: 20px;
    background: #005dc9;
  }
`;

const BackColor = styled("div")`
  width: 491px;
  height: 159px;
  position: relative;
  display: flex;
  border-radius: 2px;
  background: #e5e5e5;
  margin-left: 16px;

  img {
    position: absolute;
    width: 100%;
  }

  & > div {
    width: 126.375px;
    height: 100%;
  }

  ${(props) =>
    props.level &&
    css`
      & > div:nth-of-type(${props.level}) {
        background-color: #fff;
      }
    `}
`;

const StepWrap = styled("div")`
  margin-bottom: 18px;
`;

const DiffWrap = styled("div")`
  margin-left: 33px;

  display: flex;
  flex-direction: column;

  span {
    font-weight: normal;
    font-size: 10px;
    line-height: 16px;

    letter-spacing: -0.0025em;

    color: #616161;
    margin-left: 1px;
    margin-bottom: 3px;
    :last-child {
      margin-bottom: 0px;
    }
  }

  margin-bottom: 20px;
`;

const DiffTitle = styled("h3")`
  font-weight: bold;
  font-size: 11px;
  line-height: 18px;
  letter-spacing: -0.0025em;

  color: #093476;

  margin-bottom: 4px;
`;
