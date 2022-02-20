import styled from "@emotion/styled";
import React from "react";

function ProblemResult() {
  return (
    <Container>
      <ResultTitle>진단결과</ResultTitle>
      <ResultWrapper>
        <h3>[군사업 아이디어]</h3>
        <div>국방사업의 특수성 및 군 체계 프로세스에 대한 이해 증진 단계</div>
      </ResultWrapper>
      <ResultTitle>문제점</ResultTitle>
      <ProblemList>
        <li>1. 국방시장의 이해 부족</li>
        <li>2. 군 사업 진출 프로세스 이해</li>
        <li>3. 경쟁력 검토 필요</li>
        <li>4. 사업화 가능 여부 확인 필요 (아이템 접목 분야 확인)</li>
        <li>5. 국방사업의 자료/정보 수집</li>
        <li>6. 사업화 문의처 필요</li>
      </ProblemList>
    </Container>
  );
}

export default ProblemResult;

const Container = styled("div")`
  width: 995px;
  padding: 40px 102px;
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
