import { css } from "@emotion/react";
import styled from "@emotion/styled";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReportTop from "../../../components/ReportTop";
import SupportBusiness from "../../../components/SupportBusiness";
import { getFormattedDate } from "../../../utils/dateFormat";
import styles from "./company.module.css";
import html2pdf from "html2pdf.js";

function CompanyReport() {
  const [Data, setData] = useState(null);

  const navigate = useNavigate();
  const printRef = React.useRef();

  const getPDF = () => {
    let element = printRef.current;
    let opt = {
      margin: [8, 0, 8, 0],

      filename: `${Data.company.name}-${getFormattedDate(
        new Date(Data.createdAt),
        "yyyy-MM-dd"
      )}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, width: 598 },
      jsPDF: {
        unit: "mm",
        format: "a4",
      },
    };

    html2pdf().set(opt).from(element).save();
  };

  useEffect(() => {
    if (!localStorage.getItem("result")) {
      return navigate("../");
    }
    const report = JSON.parse(localStorage["report"]);

    (async () => {
      try {
        const { data } = await axios.get(`/api/v1/report`, {
          params: { id: report.id },
        });

        setData(data.data);
      } catch (error) {
        console.dir(error);
      }
    })();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <div className={styles.wrapper} ref={printRef}>
          {Data && (
            <>
              <ReportTop purpose={"기업용"} color="blue"></ReportTop>
              <Body>
                <Title>협약기업 분석 및 해결방안</Title>
                <Desc>
                  기업 진단질문 결과의 점수를 종합하여 기업의 현재 사업화 단계를
                  확인하고, 그에 따른 문제점과 해결방안을 제공합니다
                </Desc>
                <CompanyName>
                  {`기업명: ${Data.company?.name} / ${Data.result?.name} 단계`}
                </CompanyName>
                <StepWrap>
                  <BackColor level={Data.result?.level}>
                    <img
                      src={`/image/graph/graph_${Data.result?.level}.png`}
                      alt=""
                    />
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
                  <ProblemList>
                    {Data.result.problem.map((p, i) => (
                      <li key={p + i}>
                        {i + 1}. {p}
                      </li>
                    ))}
                  </ProblemList>
                </DiffWrap>
                <SupportBusiness
                  solution={Data.solution}
                  support={Data.support}
                ></SupportBusiness>
              </Body>
              <Footer>
                <div>
                  {getFormattedDate(new Date(Data.createdAt), "yyyy-MM-dd")}
                </div>
                <div></div>
              </Footer>
            </>
          )}
        </div>
        <PDFButton onClick={getPDF}>PDF 다운로드</PDFButton>
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

  margin-bottom: 20px;
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

const DiffTitle = styled("h3")`
  font-weight: bold;
  font-size: 11px;
  line-height: 18px;
  letter-spacing: -0.0025em;

  color: #093476;

  margin-bottom: 4px;
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
