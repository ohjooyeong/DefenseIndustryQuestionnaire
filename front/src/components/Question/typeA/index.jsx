import React from "react";
import styles from "./type.module.css";
import styled from "@emotion/styled";
import { useCallback } from "react";
import { css } from "@emotion/react";
import { useState } from "react";

function TypeA({ category, content, answer_list, prev, next, data }) {
  const [answer, setAnswer] = useState("");
  const handleClickAnswer = useCallback((id) => {
    setAnswer(id);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.category}>{category}</div>
      <div className={styles.content}>{content}</div>
      <div className={styles.chip_wrap}>
        {data &&
          answer_list.map((q, i) => (
            <div key={q + i}>
              <ChipInput
                type="radio"
                id={`${data.pk}-${i}`}
                checked={answer === `${data.pk}-${i}`}
                onChange={() => handleClickAnswer(`${data.pk}-${i}`)}
              />
              <ChipLabel
                htmlFor={`${data.pk}-${i}`}
                active={answer === `${data.pk}-${i}`}
              >
                {q}
              </ChipLabel>
            </div>
          ))}
      </div>
      <div className={styles.button_wrap}>
        {prev ? <button className={styles.prev_btn}>이전</button> : <div></div>}
        {next ? (
          <button className={styles.next_btn} disabled={!answer}>
            다음
          </button>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default TypeA;

const ChipInput = styled("input")`
  display: none;
`;

const ChipLabel = styled("label")`
  min-width: 105px;
  background-color: #ffffff;
  border: 1.2px solid #888888;
  border-radius: 12px;
  font-size: 18px;
  line-height: 28px;
  padding: 7px 20px;
  letter-spacing: -0.0025em;
  color: #616161;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  ${(props) =>
    props.active &&
    css`
      border-color: #005dc9;
      box-shadow: 0 0 0 1px #005dc9 inset;
      color: #005dc9;
    `}
`;
