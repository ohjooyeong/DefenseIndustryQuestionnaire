import React from "react";
import styles from "./type.module.css";
import styled from "@emotion/styled";
import { useCallback } from "react";
import { css } from "@emotion/react";
import { useState } from "react";

function TypeC({ category, prev, data }) {
  const [answer, setAnswer] = useState([]);
  const handleToggleAnswer = useCallback(
    (id) => {
      console.log(answer);
      if (answer.includes(id)) {
        return setAnswer(answer.filter((el) => el !== id));
      }
      setAnswer(answer.concat(id));
    },
    [answer]
  );
  const activeFilterItems = useCallback(
    (query) => answer.filter((el) => el.indexOf(query) > -1),
    [answer]
  );

  return (
    <>
      {data && (
        <div className={styles.wrapper}>
          <div className={styles.category}>{category}</div>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: data.content }}
          ></div>
          <div className={styles.chip_wrap}>
            {data.answer.map((q, i) => (
              <div key={q + i}>
                <ChipInput
                  type="checkbox"
                  id={`${data.pk}-${i}`}
                  onChange={() => handleToggleAnswer(`${data.pk}-${i}`)}
                  checked={activeFilterItems(`${data.pk}-${i}`).length > 0}
                />
                <ChipLabel
                  htmlFor={`${data.pk}-${i}`}
                  active={activeFilterItems(`${data.pk}-${i}`).length > 0}
                >
                  {q}
                </ChipLabel>
              </div>
            ))}
          </div>
          <div className={styles.button_wrap}>
            {prev ? (
              <button className={styles.prev_btn}>이전</button>
            ) : (
              <div></div>
            )}
            {data.next ? (
              <button
                className={styles.next_btn}
                disabled={!(answer.length > 0)}
              >
                다음
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default TypeC;

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
