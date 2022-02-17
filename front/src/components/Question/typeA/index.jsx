import React from "react";
import styles from "./type.module.css";

function TypeA({ category, content, answer_list, prev, next }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.category}>{category}</div>
      <div className={styles.content}>{content}</div>
      <div className={styles.chip_wrap}>
        {answer_list.map((q, i) => (
          <div className={styles.chip} key={q + i}>
            {q}
          </div>
        ))}
      </div>
      <div className={styles.button_wrap}>
        {prev ? <button className={styles.prev_btn}>이전</button> : <div></div>}
        {next ? <button className={styles.next_btn}>다음</button> : <div></div>}
      </div>
    </div>
  );
}

export default TypeA;
