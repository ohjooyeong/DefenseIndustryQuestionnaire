import styled from "@emotion/styled";
import React from "react";
import ReportTop from "../../../components/ReportTop";
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
        </Body>
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
