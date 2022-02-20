import React from "react";
import Progress_3 from "../../components/Progress_3";
import styles from "./result.module.css";
import { ReactComponent as CheckResult } from "../../image/check_result.svg";

function Result() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <Progress_3 />
        </div>
        <div className={styles.r_body}>
          <div className={styles.r_icon}>
            <CheckResult></CheckResult>
          </div>
          <span className={styles.r_text}>진단 결과가 나왔어요</span>
          <button className={styles.button_r}>진단 결과보기</button>
        </div>
      </div>
    </div>
  );
}

export default Result;
