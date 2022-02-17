import React, { useCallback, useState } from "react";
import styles from "./type.module.css";

function TypeB({ category, content, prev, next, number, unit = "" }) {
  const [text, setText] = useState("");
  const [focused, setFocused] = useState(false);
  const [activeBtn, setActiveBtn] = useState(false);

  const handleOnFocus = useCallback(() => {
    setFocused(true);
  }, [focused]);

  const handleOnBlur = useCallback(() => {
    setFocused(false);
  }, [focused]);

  const onChangeText = useCallback((e) => {
    if (e.target.value) {
      setActiveBtn(true);
    } else {
      setActiveBtn(false);
    }
    setText(e.target.value);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.category}>{category}</div>
      <div className={styles.content}>{content}</div>
      <div className={styles.input_wrap}>
        <input
          className={styles.text_input}
          placeholder={
            focused ? "" : number ? "숫자만 입력해주세요." : "입력해주세요."
          }
          value={text}
          onChange={onChangeText}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
        />
        {focused && unit && (
          <div className={styles.input_tail}>
            <span style={{ color: "transparent" }}>{text}</span>
            <span>{unit}</span>
          </div>
        )}
      </div>
      <div className={styles.button_wrap}>
        {prev ? <button className={styles.prev_btn}>이전</button> : <div></div>}
        {next ? (
          <button className={styles.next_btn} disabled={!activeBtn}>
            다음
          </button>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default TypeB;
