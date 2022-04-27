import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { getFormattedDate } from "../../../utils/dateFormat";
import styles from "./company.module.css";
import ReportTop from "../../../components/ReportTop";

function CenterReport() {
  const [Data, setData] = useState(null);

  const navigate = useNavigate();
  const printRef = React.useRef();

  const handleDownloadPdf = async () => {
    window.scrollTo(0, 0);
    const element = printRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/jpeg");
    const renderImg = [];

    const pageWidth = 200;
    const padding = 5;
    const pageHeight = pageWidth * 1.414;
    const imgWidth = pageWidth - 20;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    const doc = new jsPDF("pt", "mm", [pageWidth, pageHeight]);
    let position = 0;

    doc.addImage(imgData, "jpeg", 10, padding, imgWidth, imgHeight);

    heightLeft -= pageHeight;
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      console.log(position, imgWidth, imgHeight + 10);
      doc.addPage();
      doc.addImage(imgData, "jpeg", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    doc.save(
      `${Data.company?.name}-${getFormattedDate(
        new Date(Data.createdAt),
        "yyyy-MM-dd"
      )}.pdf`
    );
  };

  // useEffect(() => {
  //   const result = JSON.parse(localStorage["result"]);
  //   const report = JSON.parse(localStorage["report"]);
  //   if (!result || !report) {
  //     return navigate("../");
  //   }

  //   (async () => {
  //     try {
  //       const { data } = await axios.get(`/api/v1/question/report`, {
  //         params: { id: report.id },
  //       });

  //       setData(data.data);
  //     } catch (error) {
  //       console.dir(error);
  //     } finally {
  //     }
  //   })();
  // }, []);

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <div className={styles.wrapper} ref={printRef}>
          <>
            <ReportTop purpose={"센터용"} color="red"></ReportTop>
            <Body>
              <Title>진단 개요</Title>
              <OutlineTable>
                <TableCol>
                  <TableTitle>사 업 명</TableTitle>
                  <TableDesc>국방벤처 혁신기술 지원사업</TableDesc>
                </TableCol>
                <TableCol>
                  <TableTitle>진 단 기 관</TableTitle>
                  <TableDesc>부산국방벤처센터</TableDesc>
                </TableCol>
                <TableCol>
                  <TableTitle>진 단 기 업 수</TableTitle>
                  <TableDesc>40개 기업 (100% / 총 40개 기업 중)</TableDesc>
                </TableCol>
                <TableCol>
                  <TableTitle>진 단 일 정</TableTitle>
                  <TableDesc>2022. 01. 03 ~ 01. 15</TableDesc>
                </TableCol>
              </OutlineTable>
              <Title>사업화 단계 일반 분포</Title>
              <Desc>
                국방벤처 로드맵 상에 각 기업의 현재 사업화 단계를 표현하고
                준비역량 단계를 종합하여 전체 기업의 현황을 효과적으로 확인할 수
                있는 정보를 제공합니다. 각 사업화 단계별 해당하는 기업의 수와
                준비역량 수를 함께 보여드립니다.
              </Desc>
            </Body>
            <Footer>
              <div>
                {/* {getFormattedDate(new Date(Data.createdAt), "yyyy-MM-dd")} */}
              </div>
              <div></div>
            </Footer>
          </>
        </div>
        {/* <PDFButton onClick={handleDownloadPdf}>PDF 다운로드</PDFButton> */}
      </div>
    </div>
  );
}

export default CenterReport;

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

const OutlineTable = styled("div")`
  width: 491px;
  margin-left: 20px;
  height: 100%;
  border-top: 2px solid #ec5b53;
  border-bottom: 2px solid #ec5b53;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const TableCol = styled("div")`
  height: 38px;
  border-bottom: 1px solid #ec5b53;
  display: flex;
  align-items: center;
  padding-left: 12px;
  :last-child {
    border-bottom: none;
  }
`;

const TableTitle = styled("div")`
  display: block;
  font-weight: 700;
  font-size: 12px;
  line-height: 0;
  letter-spacing: -0.0025em;
  color: #212121;
  width: 106px;
  text-align: justify;
  ::before {
    content: "";
    display: inline-block;
    width: 100%;
  }

  ::after {
    content: "";
    display: inline-block;
    width: 100%;
  }

  margin-right: 40px;
`;

const TableDesc = styled("div")`
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: -0.0025em;
  color: #616161;
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
