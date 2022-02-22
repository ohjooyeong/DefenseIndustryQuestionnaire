import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { emojiSlice, spaceSlice } from "../../../utils/inputCheck";
import styles from "./type.module.css";

function TypeB({
  category,
  data,
  setAnswerList,
  setCurPk,
  answerList,
  pkList,
  setPkList,
  scoreData,
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

  const inputPriceFormat = useCallback((str) => {
    const comma = (str) => {
      str = String(str);
      return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
    };
    const uncomma = (str) => {
      str = String(str);
      return str.replace(/[^\d]+/g, "");
    };
    return comma(uncomma(str));
  }, []);

  const inputDateFormat = useCallback((str) => {
    const comma = (str) => {
      str = String(str);
      return str.replace(/(\d\d\d\d)(\d\d)(\d\d)/g, "$1.$2.$3");
    };
    const uncomma = (str) => {
      str = String(str);
      return str.replace(/[^\d]+/g, "");
    };
    return comma(uncomma(str));
  }, []);

  const onChangeText = useCallback((e) => {
    let value = e.target.value;
    value = emojiSlice(value);
    value = spaceSlice(value);
    if (data.number) {
      value = value.replace(/[^0-9]/g, "");
    }
    if (data.unit === "원") {
      value = inputPriceFormat(value);
    }

    if (data.check_date) {
      value = inputDateFormat(value);
      value = value.slice(0, 10);
    }

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
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: data.content }}
          ></div>
          <div className={styles.input_wrap}>
            <input
              className={styles.text_input}
              placeholder={
                focused
                  ? ""
                  : data.check_date
                  ? "숫자를 입력해주세요. 예) 20100101"
                  : data.number
                  ? "숫자만 입력해주세요."
                  : "입력해주세요."
              }
              value={text}
              onChange={onChangeText}
              onFocus={handleOnFocus}
              onBlur={handleOnBlur}
            />
            {(focused || text) && data.unit && (
              <div className={styles.input_tail}>
                <span style={{ color: "transparent", userSelect: "none" }}>
                  {text}
                </span>
                <span>{data.unit}</span>
              </div>
            )}
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

export default TypeB;
