import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import styles from "./company.module.css";
import ReportTop from "../../../../components/ReportTop";
import SupportBusiness from "../../../../components/SupportBusiness";
import { useParams } from "react-router-dom";
import axios from "axios";
import CompanyTable from "../../../../components/companyTable";
import { getFormattedDate } from "../../../../utils/dateFormat";
import html2pdf from "html2pdf.js";

function CenterCompany() {
  const [Data, setData] = useState(null);
  const { id } = useParams();

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
    (async () => {
      try {
        const { data } = await axios.get(`/api/v1/report/center/${id}`);

        if (data.status === 200) {
          console.log(data.data);
          setData(data.data);
        } else {
          alert("발급한 보고서가 없거나, 잘못된 요청입니다.");
        }
      } catch (error) {
        console.dir(error);
        alert("발급한 보고서가 없거나, 잘못된 요청입니다.");
      } finally {
      }
    })();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <div className={styles.wrapper} ref={printRef}>
          {Data && (
            <>
              <ReportTop purpose={"센터용"} color="red"></ReportTop>
              <Body>
                <Title>협약기업 분석 및 해결방안</Title>
                <Desc>
                  기업 진단질문 결과의 점수를 종합하여 기업의 현재 사업화 단계를
                  확인하고, 그에 따른 문제점과 해결방안을 제공합니다.
                </Desc>
                <TableWrap>
                  <CompanyTable data={Data.report.company} />
                </TableWrap>
                <DiffContainer>
                  <DiffWrap>
                    <DiffTitle>애로사항</DiffTitle>
                    <ProblemList>
                      {Data.report.result.problem.map((p, i) => (
                        <li key={p + i}>
                          {i + 1}. {p}
                        </li>
                      ))}
                    </ProblemList>
                  </DiffWrap>
                  <DiffWrap>
                    <DiffTitle>해결방안</DiffTitle>
                    <SolutionList>
                      <pre>
                        {Data.center_solution.desc.replaceAll(
                          "\t",
                          "\u00A0\u00A0"
                        )}
                      </pre>
                    </SolutionList>
                  </DiffWrap>
                </DiffContainer>

                <SupportBusiness
                  solution={Data.report.solution}
                  support={Data.report.support}
                ></SupportBusiness>
              </Body>
              <Footer>
                <div>{getFormattedDate(new Date(), "yyyy-MM-dd")}</div>
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
  padding-right: 5px;
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

const SolutionList = styled("ul")`
  display: flex;
  justify-content: start;
  flex-direction: column;
  font-weight: normal;
  font-size: 10px;
  line-height: 16px;
  width: 225px;

  letter-spacing: -0.0025em;

  color: #616161;

  pre {
    margin-left: 1px;
    margin-bottom: 3px;
    white-space: pre-line;
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
