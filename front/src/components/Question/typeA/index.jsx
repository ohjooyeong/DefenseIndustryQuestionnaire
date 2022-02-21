import React from "react";
import styles from "./type.module.css";
import styled from "@emotion/styled";
import { useCallback } from "react";
import { css } from "@emotion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function TypeA({
  category,
  data,
  setAnswerList,
  setCurPk,
  answerList,
  pkList,
  setPkList,
}) {
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  const handleClickAnswer = useCallback((id) => {
    setAnswer(id);
  }, []);

  const handleNext = useCallback(() => {
    const answerContext = { id: data.pk, answer: answer };
    const filterAnswer = answerList.filter((item) => item.id !== data.pk);
    const filterPkList = pkList.filter((item) => item !== data.pk);

    setAnswerList(filterAnswer.concat(answerContext));
    if (data.last && !data.child_yes) {
      navigate("../question");
    }
    setCurPk(data.child_yes);
    setPkList(filterPkList.concat(data.pk));
  }, [answer, pkList]);

  const handleSubmit = useCallback(() => {
    const answerContext = { id: data.pk, answer: answer };
    const answerLast = answerList.concat(answerContext);
    localStorage["foundation"] = JSON.stringify(answerLast);

    navigate("../question");
  }, [answer]);

  const handlePrev = useCallback(() => {
    const filterPkList = pkList.filter((item) => item !== data.pk);

    setCurPk(filterPkList[filterPkList.length - 1]);
    setPkList(pkList.filter((pk) => pk !== data.pk));
  }, [pkList]);

  return (
    <div className={styles.wrapper}>
      {data && (
        <>
          <div className={styles.category}>{category}</div>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: data.content }}
          ></div>
          <div className={styles.chip_wrap}>
            {data.answer.map((q, i) => (
              <div key={q + i}>
                <ChipInput
                  type="radio"
                  id={`${data.pk}_${i}`}
                  checked={answer === `${data.pk}_${i}`}
                  onChange={() => handleClickAnswer(`${data.pk}_${i}`)}
                />
                <ChipLabel
                  htmlFor={`${data.pk}_${i}`}
                  active={answer === `${data.pk}_${i}`}
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
                disabled={!answer}
                onClick={data.last ? handleSubmit : handleNext}
              >
                다음
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </>
      )}
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
