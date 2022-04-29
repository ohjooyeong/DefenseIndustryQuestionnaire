import React, { useCallback, useEffect, useState } from "react";
import styles from "./company.module.css";
import LevelResult from "../../../components/LevelResult";
import ProblemResult from "../../../components/ProblemResult";
import foundationDb from "../../../db/foundation.json";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "@emotion/styled";

function Company() {
  const [Data, setData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("result")) {
      return navigate("../");
    }
    const result = JSON.parse(localStorage["result"]);

    (async () => {
      try {
        const { data } = await axios.get(`/api/v1/question/result`, {
          params: { level: result.level, company: result.company },
        });

        if (data.status === 200) {
          setData(data.data);
        } else {
          alert("알 수 없는 오류가 발생했습니다. 다시 시도해주세요");
        }
      } catch (error) {
        console.dir(error);
      } finally {
      }
    })();
  }, []);

  // 기업 보고서 결과보기
  const handleClickPopup = useCallback(() => {
    const report = JSON.parse(localStorage["report"]);
    const result = JSON.parse(localStorage["result"]);
    window.open(
      `/report/${report.id}`,
      `${result.company} - 보고서`,
      "width=800,height=700,location=no,status=no,scrollbars=yes"
    );
  }, []);

  // 센터 보고서 결과보기
  const handleClickCenterPopup = useCallback(() => {
    const result = JSON.parse(localStorage["result"]);
    window.open(
      `/report/center/${result.company.center_id}`,
      `센터 - 보고서`,
      "width=800,height=700,location=no,status=no,scrollbars=yes"
    );
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {Data && (
          <>
            <LevelResult data={Data}></LevelResult>
            <ProblemResult data={Data}></ProblemResult>
            <ButtonWrap>
              <ReportButton onClick={handleClickPopup}>
                결과보기(기업용)
              </ReportButton>
              <ReportButton onClick={handleClickCenterPopup}>
                결과보기(센터용)
              </ReportButton>
            </ButtonWrap>
          </>
        )}
      </div>
    </div>
  );
}

export default Company;

const ButtonWrap = styled("div")`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ReportButton = styled("button")`
  width: 380px;
  height: 50px;
  font-size: 18px;
  line-height: 28px;
  letter-spacing: -0.0025em;
  font-weight: 700;
  color: #fff;

  background: #005dc9;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 12px;

  border: none;
  cursor: pointer;
  margin-top: 40px;
`;
