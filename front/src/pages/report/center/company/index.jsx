import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import styles from "./company.module.css";
import ReportTop from "../../../../components/ReportTop";
import SupportBusiness from "../../../../components/SupportBusiness";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CompanyTable from "../../../../components/companyTable";

function CenterCompany() {
  const [Data, setData] = useState(null);

  const printRef = React.useRef();

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("result") || !localStorage.getItem("report")) {
      return navigate("../");
    }
    const result = JSON.parse(localStorage["result"]);
    const report = JSON.parse(localStorage["report"]);

    (async () => {
      try {
        const { data } = await axios.get(`/api/v1/question/report`, {
          params: { id: report.id },
        });

        setData(data.data);
      } catch (error) {
        console.dir(error);
      } finally {
      }
    })();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <div className={styles.wrapper}>
          <>
            <ReportTop purpose={"센터용"} color="red"></ReportTop>
            <Body>
              <Title>협약기업 분석 및 해결방안</Title>
              <Desc>
                기업 진단질문 결과의 점수를 종합하여 기업의 현재 사업화 단계를
                확인하고, 그에 따른 문제점과 해결방안을 제공합니다.
              </Desc>
              <TableWrap>
                <CompanyTable />
              </TableWrap>
              <DiffContainer>
                <DiffWrap>
                  <DiffTitle>애로사항</DiffTitle>
                  <ProblemList>
                    <li>1. 국방시장의 이해</li>
                    <li>2. 국방시장의 이해</li>
                    <li>3. 국방시장의 이해</li>
                    <li>4. 국방시장의 이해</li>
                    <li>5. 국방시장의 이해</li>
                  </ProblemList>
                </DiffWrap>
                <DiffWrap>
                  <DiffTitle>해결방안</DiffTitle>
                  <ProblemList>
                    <li>1. 국방시장의 이해</li>
                    <li>2. 국방시장의 이해</li>
                    <li>3. 국방시장의 이해</li>
                    <li>4. 국방시장의 이해</li>
                    <li>5. 국방시장의 이해</li>
                  </ProblemList>
                </DiffWrap>
              </DiffContainer>
              {Data && (
                <SupportBusiness
                  solution={Data.solution}
                  support={Data.support}
                ></SupportBusiness>
              )}
            </Body>
          </>
        </div>
      </div>
    </div>
  );
}

export default CenterCompany;

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
  margin-bottom: 12px;
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

const DiffContainer = styled("div")`
  display: flex;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 16px;
`;

const DiffWrap = styled("div")`
  display: flex;
  width: 50%;
  flex-direction: column;
`;

const DiffTitle = styled("h3")`
  font-weight: bold;
  font-size: 11px;
  line-height: 18px;
  letter-spacing: -0.0025em;

  color: #9b1911;

  margin-bottom: 4px;
`;

const ProblemList = styled("ul")`
  display: flex;
  justify-content: start;
  flex-direction: column;
  font-weight: normal;
  font-size: 10px;
  line-height: 16px;

  letter-spacing: -0.0025em;

  color: #616161;

  li {
    margin-left: 1px;
    margin-bottom: 3px;
  }

  li:last-child {
    margin-bottom: 0px;
  }
`;

const TableWrap = styled("div")`
  padding: 0px 20px;
  margin-top: 7px;
  margin-bottom: 14px;
`;

const PDFButton = styled("button")`
  width: 398px;
  margin-bottom: 20px;
  background: #005dc9;
  border-radius: 12px;
  height: 50px;
  font-weight: 800;
  font-size: 18px;
  line-height: 28px;

  letter-spacing: -0.0025em;

  color: #ffffff;
  border: 0;
  cursor: pointer;
`;
