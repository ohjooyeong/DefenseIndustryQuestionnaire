import React from "react";
import styles from "./type.module.css";
import styled from "@emotion/styled";
import { useCallback } from "react";
import { css } from "@emotion/react";
import { useState } from "react";

function TypeC({
  category,
  data,
  setAnswerList,
  setCurPk,
  answerList,
  pkList,
  setPkList,
}) {
  const [answer, setAnswer] = useState([]);
  const handleToggleAnswer = useCallback(
    (id) => {
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

  const handleNext = useCallback(() => {
    const answerContext = { id: data.pk, answer };
    const filterAnswer = answerList.filter((item) => item.id !== data.pk);
    const filterPkList = pkList.filter((item) => item !== data.pk);

    setCurPk(data.child_yes);
    setAnswerList(filterAnswer.concat(answerContext));
    setPkList(filterPkList.concat(data.pk));
  }, [answer, pkList]);

  const handlePrev = useCallback(() => {
    setCurPk(pkList[pkList.length - 1]);
    setPkList(pkList.filter((pk) => pk !== data.pk));
  }, [pkList]);

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
                  id={`${data.pk}_${i}`}
                  onChange={() => handleToggleAnswer(`${data.pk}_${i}`)}
                  checked={activeFilterItems(`${data.pk}_${i}`).length > 0}
                />
                <ChipLabel
                  htmlFor={`${data.pk}_${i}`}
                  active={activeFilterItems(`${data.pk}_${i}`).length > 0}
                >
                  {q}
                </ChipLabel>
              </div>
            ))}
          </div>
          <div className={styles.button_wrap}>
            {data.prev ? (
              <button className={styles.prev_btn} onClick={handlePrev}>
                이전
              </button>
            ) : (
              <div></div>
            )}
            {data.next ? (
              <button
                className={styles.next_btn}
                disabled={!(answer.length > 0)}
                onClick={handleNext}
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
