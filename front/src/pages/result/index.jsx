import React from "react";
import Progress_3 from "../../components/Progress_3";
import styles from "./result.module.css";

function Result() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Progress_3 />
      </div>
    </div>
  );
}

export default Result;
