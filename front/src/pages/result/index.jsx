import React, { useEffect } from "react";
import Progress_3 from "../../components/Progress_3";
import styles from "./result.module.css";
import { ReactComponent as CheckResult } from "../../image/check_result.svg";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useState } from "react";
import axios from "axios";

function Result() {
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(true);
  const [resultData, setResultData] = useState(null);

  useEffect(() => {
    if (
      !localStorage.getItem("profile") ||
      !localStorage.getItem("score") ||
      !localStorage.getItem("question") ||
      !localStorage.getItem("foundation")
    ) {
      return navigate("../");
    }

    (async () => {
      try {
        const company = JSON.parse(localStorage.getItem("profile"));
        // if (company.result) {
        //   return;
        // }
        const score = JSON.parse(localStorage.getItem("score"));
        const question = JSON.parse(localStorage.getItem("question"));
        const foundation = JSON.parse(localStorage.getItem("foundation"));
        const context = {
          company,
          score,
          question,
          foundation,
        };
        const { data } = await axios.post(`/api/v1/question/result`, context);
        setResultData(data.data);
        // localStorage["profile"] = JSON.stringify(company);

        localStorage["result"] = JSON.stringify(data.data);
      } catch (error) {
        console.dir(error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1600);
      }
    })();
  }, []);

  const handleReport = useCallback(() => {
    const profile = JSON.parse(localStorage.getItem("result"));
    if (profile) {
      localStorage.removeItem("profile");
      localStorage.removeItem("score");
      localStorage.removeItem("question");
      localStorage.removeItem("foundation");
      navigate(`../result/${profile.company}`);
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <Progress_3 />
        </div>
        {Loading ? (
          <div className={styles.l_body}>
            <img src="/image/loading/loading.gif" alt="" />
          </div>
        ) : (
          <div className={styles.r_body}>
            <div className={styles.r_icon}>
              <CheckResult></CheckResult>
            </div>
            <span className={styles.r_text}>진단 결과가 나왔어요</span>
            <button className={styles.button_r} onClick={handleReport}>
              진단 결과보기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Result;
