import React from "react";
import styles from "./start.module.css";

function AlternativeStartSection({ handleNext }) {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.section}>
          <div className={styles.logo}>
            <img src="/image/logo.png" alt="" />
          </div>
          <div className={styles.title}>
            <h2>기업의 단계별 성장 및 투자 진단</h2>
          </div>
          <div className={styles.desc}>
            기업의 비즈니스 진입의 시작은 <br />
            페이서 파트너스의
            <b>{" “단계별 성장 및 투자 진단” "}</b>부터 시작하세요.
          </div>
          <div className={styles.desc2}>
            시장 진입에 대한 역량 <b>역량 성숙도를 측정</b>하여, <br />
            귀사의 성공적인 비즈니스를 위한
            <br />
            <b>현황파악과 목표를 수립</b>
            하시기 바랍니다.
          </div>
          <a href="https://iharuya12.cafe24.com/login.php">
            <button className={styles.button}>진단 시작하기</button>
          </a>
        </div>
      </div>
      <div className={styles.img_section}>
        <img src="/image/alternative_image.jpg" alt="home_image" />
      </div>
    </div>
  );
}

export default AlternativeStartSection;
