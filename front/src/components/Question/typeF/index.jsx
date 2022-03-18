import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { emojiSlice } from "../../../utils/inputCheck";
import styles from "./type.module.css";
import TextareaAutosize from "react-textarea-autosize";

function TypeF({
  category,
  data,
  setAnswerList,
  setCurPk,
  answerList,
  pkList,
  setPkList,
  scoreData,
  qNumber,
}) {
  const [text, setText] = useState("");
  const [focused, setFocused] = useState(false);
  const [activeBtn, setActiveBtn] = useState(false);
  const navigate = useNavigate();

  const handleOnFocus = useCallback(() => {
    setFocused(true);
  }, [focused]);

  const handleOnBlur = useCallback(() => {
    setFocused(false);
  }, [focused]);

  const onChangeText = useCallback((e) => {
    let value = e.target.value;
    value = emojiSlice(value);
    value = value.slice(0, 1000);

    if (value) {
      setActiveBtn(true);
    } else {
      setActiveBtn(false);
    }
    setText(value);
  }, []);

  const handleNext = useCallback(() => {
    const answerContext = { id: data.pk, answer: text };
    const filterAnswer = answerList.filter((item) => item.id !== data.pk);
    const filterPkList = pkList.filter((item) => item !== data.pk);
    setAnswerList(filterAnswer.concat(answerContext));
    setPkList(filterPkList.concat(data.pk));
    if (data.last && data.child_yes === "result") {
      return navigate("../result");
    }
    setCurPk(data.child_yes);
  }, [text, pkList]);

  const handleSubmit = useCallback(() => {
    const answerContext = { id: data.pk, answer: text };
    const answerLast = answerList.concat(answerContext);
    localStorage["question"] = JSON.stringify(answerLast);
    localStorage["score"] = JSON.stringify(scoreData);

    navigate("../result");
  }, [text]);

  const handlePrev = useCallback(() => {
    const filterAnswer = answerList.filter((item) => item.id !== data.pk);
    const filterPkList = pkList.filter((item) => item !== data.pk);
    setText("");

    setCurPk(filterPkList[filterPkList.length - 1]);
    setAnswerList(filterAnswer);
    setPkList(filterPkList);
  }, [pkList, answerList]);

  return (
    <div className={styles.wrapper}>
      {data && (
        <>
          <div className={styles.category}>{category}</div>
          <div className={styles.content}>{`${qNumber}. ${data.content}`}</div>
          <div className={styles.input_wrap}>
            <TextareaAutosize
              className={styles.text_input}
              placeholder={"입력해주세요."}
              value={text}
              onChange={onChangeText}
              onFocus={handleOnFocus}
              onBlur={handleOnBlur}
              minRows={1}
              maxRows={6}
            />
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
                disabled={!activeBtn}
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

export default TypeF;
