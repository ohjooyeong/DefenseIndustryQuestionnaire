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
    const result = JSON.parse(localStorage["result"]);
    if (!result) {
      return navigate("../");
    }

    (async () => {
      try {
        const { data } = await axios.get(`/api/v1/question/result`, {
          params: { level: result.level, company: result.company },
        });

        setData(data.data);
      } catch (error) {
        console.dir(error);
      } finally {
      }
    })();
  }, []);

  const handleClickPopup = useCallback(() => {
    const report = JSON.parse(localStorage["report"]);
    const result = JSON.parse(localStorage["result"]);
    window.open(
      `/report/${report.id}`,
      `${result.company} - 보고서`,
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
            <ReportButton onClick={handleClickPopup}>결과보기</ReportButton>
          </>
        )}
      </div>
    </div>
  );
}

export default Company;

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
