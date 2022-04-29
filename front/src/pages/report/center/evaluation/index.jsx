import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import styles from "./company.module.css";
import ReportTop from "../../../../components/ReportTop";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getFormattedDate } from "../../../../utils/dateFormat";
import html2pdf from "html2pdf.js";

function EvaluationReport() {
  const [Data, setData] = useState(null);
  const navigate = useNavigate();
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

  const renderTmpTableItem = () => {
    const arr = [];

    for (let i = 0; i < 10; i++) {
      arr.push(
        <TableItemWrap key={i + new Date()}>
          <div>{i + 1}</div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </TableItemWrap>
      );
    }

    return arr;
  };

  useEffect(() => {
    if (!localStorage.getItem("result")) {
      return navigate("../");
    }
    const result = JSON.parse(localStorage["result"]);

    (async () => {
      try {
        const { data } = await axios.get(`/api/v1/report/center`, {
          params: { id: result.company.center_id },
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
        <div className={styles.wrapper} ref={printRef}>
          {Data && (
            <>
              <ReportTop purpose={"센터용"} color="red"></ReportTop>
              <Body>
                <Title>기업 평가 및 요구사항</Title>
                <Desc>현재 협약기업의 평가 결과</Desc>
                <TableWrap>
                  <Table>
                    <TableTopWrap>
                      <div>No.</div>
                      <div>진단일자</div>
                      <div>기업명</div>
                      <div>진단자명</div>
                      <div>기업 진단 내용</div>
                    </TableTopWrap>
                    {renderTmpTableItem()}
                  </Table>
                </TableWrap>
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

export default EvaluationReport;

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

const TableWrap = styled("div")`
  padding: 0px 20px;
  margin-top: 12px;
  margin-bottom: 24px;
`;

const Table = styled("div")`
  width: 491px;
  border-top: 2px solid #ec5b53;
  border-bottom: 2px solid #ec5b53;
`;

const TableTopWrap = styled("div")`
  height: 50px;
  display: grid;
  grid-template-columns: 46px 80px 78px 80px 205px;
  background: rgba(236, 91, 83, 0.15);
  border-right: 1px solid #e5e5e5;
  border-left: 1px solid #e5e5e5;

  & > div {
    font-weight: 700;
    font-size: 11px;
    line-height: 18px;

    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: -0.0025em;

    border-right: 1px solid #e5e5e5;
    position: relative;

    &:last-child {
      border-right: none;
    }

    color: #212121;
  }
`;

const TableItemWrap = styled("div")`
  min-height: 58px;
  display: grid;
  grid-template-columns: 46px 80px 78px 80px 205px;

  border-right: 1px solid #e5e5e5;
  border-left: 1px solid #e5e5e5;
  border-top: 1px solid #e5e5e5;

  & > div {
    font-weight: 700;
    font-size: 11px;
    line-height: 18px;

    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: -0.0025em;

    border-right: 1px solid #e5e5e5;
    position: relative;

    &:last-child {
      border-right: none;
    }

    color: #616161;
  }
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
