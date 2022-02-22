import styled from "@emotion/styled";
import React from "react";

function ProblemResult({ data }) {
  return (
    <Container>
      <ResultTitle>진단결과</ResultTitle>
      <ResultWrapper>
        <h3>[{data.name}]</h3>
        <div>{data.summary} 단계</div>
      </ResultWrapper>
      <ResultTitle>문제점</ResultTitle>
      <ProblemList>
        {data.problem.map((p, i) => (
          <li key={p + i}>
            {i + 1}. {p}
          </li>
        ))}
      </ProblemList>
    </Container>
  );
}

export default ProblemResult;

const Container = styled("div")`
  width: 995px;
  padding: 40px 102px;
  padding-right: 30px;
  display: grid;
  grid-template-columns: 135px auto;
  gap: 40px;
  box-sizing: border-box;
  background: #f5f9fd;
  border-radius: 8px;
`;

const ResultTitle = styled("div")`
  font-weight: 800;
  font-size: 24px;
  line-height: 28px;
  letter-spacing: -0.0025em;
  color: #212121;
`;

const ResultWrapper = styled("div")`
  display: flex;
  justify-content: start;
  flex-direction: column;
  font-weight: 400;
  font-size: 21px;
  line-height: 33px;
  letter-spacing: -0.0025em;

  color: #212121;

  h3 {
    font-weight: bold;
    margin-bottom: 12px;
  }
`;

const ProblemList = styled("ul")`
  display: flex;
  justify-content: start;
  flex-direction: column;
  font-weight: normal;
  font-size: 21px;
  line-height: 33px;
  letter-spacing: -0.0025em;

  color: #212121;

  li {
    margin-bottom: 12px;
  }

  li:last-child {
    margin-bottom: 0px;
  }
`;
