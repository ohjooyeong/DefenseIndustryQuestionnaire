import React, { useEffect, useState } from "react";
import Progress_1 from "../../components/Progress_1";
import TypeA from "../../components/Question/typeA";
import styles from "./foundation.module.css";
import foundationDb from "../../db/foundation.json";
import TypeB from "../../components/Question/typeB";
import TypeC from "../../components/Question/typeC";

function Foundation() {
  const [Data, setData] = useState(null);
  const [answerList, setAnswerList] = useState([]);

  useEffect(() => {
    setData(foundationDb);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <Progress_1 />
        </div>
        {/* <TypeB
          category={"기업 기본 개요"}
          content={"2. 기업의 아이템을 간략하게 소개해주세요."}
          prev={true}
          next={true}
        /> */}
        {/* <TypeA
          category={"기업 기본 개요"}
          content={"1. 소속된 국방벤처센터는 어디인가요?"}
          answer_list={[
            "충북",
            "충남",
            "대전",
            "전북",
            "전남",
            "광주",
            "경남",
            "울산",
            "구미",
            "부산",
          ]}
          data={Data && Data.question[0]}
          next={true}
        ></TypeA> */}
        <TypeC
          data={Data && Data.question[2]}
          category={"기업 기본 개요"}
          prev={true}
        />
      </div>
    </div>
  );
}

export default Foundation;
