import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";

import {
  getFormattedDate,
  ReportFormattedDate,
} from "../../../utils/dateFormat";
import styles from "./company.module.css";
import ReportTop from "../../../components/ReportTop";
import CompanyDiag from "../../../components/CompanyDiag";

function CenterReport() {
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
                <Title>진단 개요</Title>
                <OutlineTable>
                  <TableCol>
                    <TableTitle>사 업 명</TableTitle>
                    <TableDesc>국방벤처 혁신기술 지원사업</TableDesc>
                  </TableCol>
                  <TableCol>
                    <TableTitle>진 단 기 관</TableTitle>
                    <TableDesc>{Data.name}</TableDesc>
                  </TableCol>
                  <TableCol>
                    <TableTitle>진 단 기 업 수</TableTitle>
                    <TableDesc>
                      {Data.company_length}개 기업 (0% / 총{" "}
                      {Data.company_length}개 기업 중)
                    </TableDesc>
                  </TableCol>
                  <TableCol>
                    <TableTitle>진 단 일 정</TableTitle>
                    <TableDesc>{`${ReportFormattedDate(
                      new Date(Data.createdAt)
                    )} ~ ${ReportFormattedDate()}`}</TableDesc>
                  </TableCol>
                </OutlineTable>
                <Title>사업화 단계 일반 분포</Title>
                <Desc>
                  국방벤처 로드맵 상에 각 기업의 현재 사업화 단계를 표현하고
                  준비역량 단계를 종합하여 전체 기업의 현황을 효과적으로 확인할
                  수 있는 정보를 제공합니다. 각 사업화 단계별 해당하는 기업의
                  수와 준비역량 수를 함께 보여드립니다.
                </Desc>
                <Diagnosis>
                  <img src="/image/frame_large.png" alt="" />
                </Diagnosis>
                <CompanyDiag data={Data.company_list}></CompanyDiag>
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
  margin-bottom: 6px;
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

const Diagnosis = styled("div")`
  width: 492px;
  height: 370px;
  padding-left: 20px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    image-rendering: -moz-crisp-edges;
    image-rendering: -o-crisp-edges;
    image-rendering: -webkit-optimize-contrast;
    -ms-interpolation-mode: nearest-neighbor;
    image-rendering: crisp-edges;
    transform: translateZ(0);
    backface-visibility: hidden;
  }
`;

const CompanyDiagList = styled("div")`
  width: 492px;
  height: 42px;
  padding-left: 20px;
  display: flex;
  position: relative;
  top: -2px;

  & > div {
    width: 100%;
    height: 100%;
    border-right: 1px dashed #888888;
    position: relative;

    &:last-child {
      border-right: none;
    }
  }
`;

const Node = styled("div")`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  position: relative;
  top: -5px;
  left: -5px;
  background-color: #ec5b54;
`;

const NodeCompany = styled("div")`
  display: flex;
  flex-direction: column;
  position: absolute;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.widthRatio >= 0 &&
    props.heightRatio >= 0 &&
    css`
      top: ${props.heightRatio}%;
      left: ${props.widthRatio}%;
    `}
  span {
    font-size: 10px;
    line-height: 12px;
    transform: scale(0.5);
    position: relative;
    top: -5px;
    left: -5px;
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
