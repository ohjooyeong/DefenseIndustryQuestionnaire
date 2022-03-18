import React, { useCallback, useEffect, useState } from "react";
import Progress_1 from "../../components/Progress_1";
import TypeA from "../../components/Question/typeA";
import styles from "./foundation.module.css";
import foundationDb from "../../db/foundation.json";
import TypeB from "../../components/Question/typeB";
import TypeC from "../../components/Question/typeC";
import TypeD from "../../components/Question/typeD";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import TypeE from "../../components/Question/typeE";
import TypeF from "../../components/Question/typeF";

function Foundation() {
  const [Data, setData] = useState(null);
  const [curPk, setCurPk] = useState("f-1");
  const [answerList, setAnswerList] = useState([]);
  const [pkList, setPkList] = useState([]);
  const [qNumber, setQNumber] = useState(0);

  const navigate = useNavigate();

  const renderFoundation = () => {
    if (Data && Data.foundation_category) {
      const renderCard = Data?.foundation.map((item, i) => {
        if (item.type === "A") {
          return (
            <ActiveDiv active={item.pk === curPk} key={item.pk + item.content}>
              <TypeA
                data={item}
                category={Data.foundation_category.name}
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
                category={Data.foundation_category.name}
                setAnswerList={setAnswerList}
                answerList={answerList}
                setCurPk={setCurPk}
                setPkList={setPkList}
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
                category={Data.foundation_category.name}
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
                category={Data.foundation_category.name}
                setAnswerList={setAnswerList}
                answerList={answerList}
                setCurPk={setCurPk}
                setPkList={setPkList}
                pkList={pkList}
                qNumber={qNumber}
              ></TypeD>
            </ActiveDiv>
          );
        }
        if (item.type === "E") {
          return (
            <ActiveDiv active={item.pk === curPk} key={item.pk + item.content}>
              <TypeE
                data={item}
                category={Data.foundation_category.name}
                setAnswerList={setAnswerList}
                answerList={answerList}
                setCurPk={setCurPk}
                setPkList={setPkList}
                pkList={pkList}
                qNumber={qNumber}
              ></TypeE>
            </ActiveDiv>
          );
        }
        if (item.type === "F") {
          return (
            <ActiveDiv active={item.pk === curPk} key={item.pk + item.content}>
              <TypeF
                data={item}
                category={Data.foundation_category.name}
                setAnswerList={setAnswerList}
                answerList={answerList}
                setCurPk={setCurPk}
                setPkList={setPkList}
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
          <Progress_1 />
        </div>
        {renderFoundation()}
      </div>
    </div>
  );
}

export default Foundation;

const ActiveDiv = styled("div")`
  display: none;

  ${(props) =>
    props.active &&
    css`
      display: block;
    `}
`;
