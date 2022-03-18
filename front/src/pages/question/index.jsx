import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Progress_2 from "../../components/Progress_2";
import foundationDb from "../../db/foundation.json";
import TypeA from "../../components/Question/typeA";
import TypeB from "../../components/Question/typeB";
import TypeC from "../../components/Question/typeC";
import TypeD from "../../components/Question/typeD";
import styles from "./question.module.css";
import TypeF from "../../components/Question/typeF";

function Question() {
  const [Data, setData] = useState(null);
  const [scoreData, setScoreData] = useState([]);
  const [curPk, setCurPk] = useState("q-1");
  const [answerList, setAnswerList] = useState([]);
  const [pkList, setPkList] = useState([]);
  const [qNumber, setQNumber] = useState(0);
  const navigate = useNavigate();

  const renderFoundation = () => {
    if (Data && Data.question_category) {
      const renderCard = Data?.question.map((item, i) => {
        if (item.type === "A") {
          return (
            <ActiveDiv active={item.pk === curPk} key={item.pk + item.content}>
              <TypeA
                data={item}
                category={
                  Data.question_category[
                    Data.question_category.findIndex(
                      (el) => el.pk === item.category_id
                    )
                  ].name
                }
                setAnswerList={setAnswerList}
                answerList={answerList}
                setCurPk={setCurPk}
                setPkList={setPkList}
                pkList={pkList}
                qNumber={qNumber}
              ></TypeA>
            </ActiveDiv>
          );
        }
        if (item.type === "B") {
          return (
            <ActiveDiv active={item.pk === curPk} key={item.pk + item.content}>
              <TypeB
                data={item}
                category={
                  Data.question_category[
                    Data.question_category.findIndex(
                      (el) => el.pk === item.category_id
                    )
                  ].name
                }
                setAnswerList={setAnswerList}
                answerList={answerList}
                setCurPk={setCurPk}
                setPkList={setPkList}
                scoreData={scoreData}
                pkList={pkList}
                qNumber={qNumber}
              ></TypeB>
            </ActiveDiv>
          );
        }
        if (item.type === "C") {
          return (
            <ActiveDiv active={item.pk === curPk} key={item.pk + item.content}>
              <TypeC
                data={item}
                category={
                  Data.question_category[
                    Data.question_category.findIndex(
                      (el) => el.pk === item.category_id
                    )
                  ].name
                }
                setAnswerList={setAnswerList}
                answerList={answerList}
                setCurPk={setCurPk}
                setPkList={setPkList}
                pkList={pkList}
                qNumber={qNumber}
              ></TypeC>
            </ActiveDiv>
          );
        }
        if (item.type === "D") {
          return (
            <ActiveDiv active={item.pk === curPk} key={item.pk + item.content}>
              <TypeD
                data={item}
                category={
                  Data.question_category[
                    Data.question_category.findIndex(
                      (el) => el.pk === item.category_id
                    )
                  ].name
                }
                setAnswerList={setAnswerList}
                answerList={answerList}
                setCurPk={setCurPk}
                setPkList={setPkList}
                setScoreData={setScoreData}
                scoreData={scoreData}
                pkList={pkList}
                qNumber={qNumber}
              ></TypeD>
            </ActiveDiv>
          );
        }
        if (item.type === "F") {
          return (
            <ActiveDiv active={item.pk === curPk} key={item.pk + item.content}>
              <TypeF
                data={item}
                category={
                  Data.question_category[
                    Data.question_category.findIndex(
                      (el) => el.pk === item.category_id
                    )
                  ].name
                }
                setAnswerList={setAnswerList}
                answerList={answerList}
                setCurPk={setCurPk}
                setPkList={setPkList}
                setScoreData={setScoreData}
                scoreData={scoreData}
                pkList={pkList}
                qNumber={qNumber}
              ></TypeF>
            </ActiveDiv>
          );
        }
      });
      return renderCard;
    }
  };

  useEffect(() => {
    setData(foundationDb);
    if (!localStorage.getItem("profile")) {
      navigate("../");
    }
  }, []);

  useEffect(() => {
    setQNumber(pkList.length + 1);
  }, [curPk]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <Progress_2 />
        </div>
        {renderFoundation()}
      </div>
    </div>
  );
}

export default Question;

const ActiveDiv = styled("div")`
  display: none;

  ${(props) =>
    props.active &&
    css`
      display: block;
    `}
`;
