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

        if (data.status === 200) {
          setResultData(data.data);
          localStorage["result"] = JSON.stringify(data.data);
        } else {
          alert("알 수 없는 오류가 발생했습니다. 다시 시도해주세요");
        }
        // localStorage["profile"] = JSON.stringify(company);
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
    (async () => {
      try {
        const result = JSON.parse(localStorage.getItem("result"));
        const question = JSON.parse(localStorage.getItem("question"));

        const context = {
          result,
          question,
        };
        const { data } = await axios.post(`/api/v1/report`, context);
        if (data.status === 200) {
          localStorage["report"] = JSON.stringify({
            id: data.data.id,
          });

          localStorage.removeItem("profile");
          localStorage.removeItem("score");
          localStorage.removeItem("question");
          localStorage.removeItem("foundation");
          navigate(`../result/${result.company.name}`);
        } else {
          alert("알 수 없는 오류가 발생했습니다. 다시 시도해주세요");
        }
      } catch (error) {
        console.dir(error);
      } finally {
      }
    })();
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
