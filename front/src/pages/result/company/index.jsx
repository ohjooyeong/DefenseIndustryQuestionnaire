import React, { useEffect, useState } from "react";
import styles from "./company.module.css";
import LevelResult from "../../../components/LevelResult";
import ProblemResult from "../../../components/ProblemResult";
import foundationDb from "../../../db/foundation.json";

function Company() {
  const [Data, setData] = useState(null);
  const [level, setLevel] = useState(null);

  useEffect(() => {
    setData(foundationDb);
    const result = JSON.parse(localStorage["result"]);
    setLevel(result.level);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {Data && level && (
          <>
            <LevelResult data={Data.result[level - 1]}></LevelResult>
            <ProblemResult data={Data.result[level - 1]}></ProblemResult>
          </>
        )}
      </div>
    </div>
  );
}

export default Company;
