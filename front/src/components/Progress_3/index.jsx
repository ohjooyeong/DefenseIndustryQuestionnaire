import React from "react";
import styles from "./progress.module.css";

function Progress_3() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.progress}>
          <div className={styles.icon}>
            <img src="/image/stage_b.png" alt="" />
          </div>
          <div className={styles.divider_b}></div>
          <div className={styles.icon}>
            <img src="/image/stage_b.png" alt="" />
          </div>
          <div className={styles.divider_b}></div>

          <div className={styles.icon}>
            <img src="/image/stage.png" alt="" />
          </div>
        </div>
        <div className={styles.step}>
          <span className={styles.b}>기초문항</span>
          <span className={styles.b}>진단문항</span>
          <span className={styles.sky}>진단결과</span>
        </div>
      </div>
    </div>
  );
}

export default Progress_3;
