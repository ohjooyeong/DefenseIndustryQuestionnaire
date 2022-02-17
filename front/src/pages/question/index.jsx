import React from "react";
import Progress_2 from "../../components/Progress_2";
import styles from "./question.module.css";

function Question() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Progress_2 />
      </div>
    </div>
  );
}

export default Question;
