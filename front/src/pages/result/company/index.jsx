import React from "react";
import styles from "./company.module.css";
import LevelResult from "../../../components/LevelResult";
import ProblemResult from "../../../components/ProblemResult";

function Company() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <LevelResult level={8}></LevelResult>
        <ProblemResult></ProblemResult>
      </div>
    </div>
  );
}

export default Company;
