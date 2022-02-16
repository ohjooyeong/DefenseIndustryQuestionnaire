import React from "react";
import styles from "./start.module.css";

function StartSection({ handleNext }) {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.section}>
          <div className={styles.logo}>
            <img src="/image/logo.png" alt="" />
          </div>
          <div className={styles.title}>
            <h1>[국방벤처센터 협약기업 진단]</h1>
            <h2>국방산업의 단계별 사업화 성숙도 진단</h2>
          </div>
          <div className={styles.desc}>
            (예비)국방벤처기업의 국방벤처산업 진입의 시작은 <br />
            국방벤처센터의
            <b>“단계별 사업화 성숙도 진단”</b>으로부터 시작하세요.
          </div>
          <div className={styles.desc2}>
            군사업 체계 진입에 대한 <b>역량 성숙도를 측정</b>하여, <br />
            귀사의 성공적인 국방산업으로 진출하기 위한
            <br />
            <b>현황파악과 목표를 수립</b>
            하시기 바랍니다.
          </div>
          <button className={styles.button} onClick={handleNext}>
            진단 시작하기
          </button>
        </div>
      </div>
      <div className={styles.img_section}>
        <img src="/image/Ellipse_1.png" alt="" />
      </div>
    </div>
  );
}

export default StartSection;
