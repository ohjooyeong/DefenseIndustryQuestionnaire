import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./type.module.css";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import styled from "@emotion/styled";

function TypeE({
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
  const [value, setValue] = useState(null);
  const [activeBtn, setActiveBtn] = useState(false);
  const navigate = useNavigate();

  const handleNext = useCallback(() => {
    const answerContext = { id: data.pk, answer: value };
    const filterAnswer = answerList.filter((item) => item.id !== data.pk);
    const filterPkList = pkList.filter((item) => item !== data.pk);
    setAnswerList(filterAnswer.concat(answerContext));
    setPkList(filterPkList.concat(data.pk));
    if (data.last && data.child_yes === "result") {
      return navigate("../result");
    }
    setCurPk(data.child_yes);
  }, [value, pkList]);

  const handleSubmit = useCallback(() => {
    const answerContext = { id: data.pk, answer: value };
    const answerLast = answerList.concat(answerContext);
    localStorage["question"] = JSON.stringify(answerLast);
    localStorage["score"] = JSON.stringify(scoreData);

    navigate("../result");
  }, [value]);

  const handlePrev = useCallback(() => {
    const filterAnswer = answerList.filter((item) => item.id !== data.pk);
    const filterPkList = pkList.filter((item) => item !== data.pk);
    setValue(null);

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
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="기업 설립일"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                  if (newValue) {
                    setActiveBtn(true);
                  } else {
                    setActiveBtn(false);
                  }
                }}
                inputFormat={"yyyy.MM.dd"}
                mask={"____.__.__"}
                renderInput={(params) => <BpTextField {...params} />}
              ></DatePicker>
            </LocalizationProvider>
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

export default TypeE;

const BpTextField = styled(TextField)({
  "&": {
    width: "100%",
  },
});
