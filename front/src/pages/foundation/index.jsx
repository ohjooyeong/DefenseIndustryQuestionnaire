import React, { useEffect, useState } from "react";
import Progress_1 from "../../components/Progress_1";
import TypeA from "../../components/Question/typeA";
import styles from "./foundation.module.css";
import foundationDb from "../../db/foundation.json";
import TypeB from "../../components/Question/typeB";

function Foundation() {
  const [Data, setData] = useState({});
  const [answerList, setAnswerList] = useState([]);

  useEffect(() => {
    setData(foundationDb);
  }, []);

  console.log(Data);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <Progress_1 />
        </div>
        <TypeB
          category={"기업 기본 개요"}
          content={"2. 기업의 아이템을 간략하게 소개해주세요."}
          prev={true}
          next={true}
        />
      </div>
    </div>
  );
}

export default Foundation;
