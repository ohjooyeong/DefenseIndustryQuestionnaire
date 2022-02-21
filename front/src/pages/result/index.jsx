import React, { useEffect } from "react";
import Progress_3 from "../../components/Progress_3";
import styles from "./result.module.css";
import { ReactComponent as CheckResult } from "../../image/check_result.svg";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useState } from "react";

function Result() {
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    if (
      !localStorage.getItem("profile") ||
      !localStorage.getItem("score") ||
      !localStorage.getItem("question") ||
      !localStorage.getItem("foundation")
    ) {
      return navigate("../");
    }
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const handleReport = useCallback(() => {
    const profile = JSON.parse(localStorage.getItem("profile"));
    navigate(`../result/${profile.orgName}`);
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
