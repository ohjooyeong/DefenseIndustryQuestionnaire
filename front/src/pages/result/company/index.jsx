import React, { useEffect, useState } from "react";
import styles from "./company.module.css";
import LevelResult from "../../../components/LevelResult";
import ProblemResult from "../../../components/ProblemResult";
import foundationDb from "../../../db/foundation.json";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Company() {
  const [Data, setData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const result = JSON.parse(localStorage["result"]);
    if (!result) {
      return navigate("../");
    }

    (async () => {
      try {
        const { data } = await axios.get(`/api/v1/question/result`, {
          params: { level: result.level, company: result.company },
        });

        setData(data.data);
      } catch (error) {
        console.dir(error);
      } finally {
      }
    })();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {Data && (
          <>
            <LevelResult data={Data}></LevelResult>
            <ProblemResult data={Data}></ProblemResult>
          </>
        )}
      </div>
    </div>
  );
}

export default Company;
