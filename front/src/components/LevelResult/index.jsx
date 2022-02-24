import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";

function LevelResult({ data }) {
  return (
    <Container>
      <LevelRibbon>
        <img src={`/image/level/level_${data.level}.png`} alt="" />
      </LevelRibbon>
      <LevelHelmet>
        <img src={`/image/rocket/rocket.png`} alt="" />
      </LevelHelmet>
      <LevelTitle>
        당신은 <b>{data.name} 단계</b>시군요
      </LevelTitle>
      <LevelDesc>{data.step} 입니다</LevelDesc>
      <StepWrap>
        <BackColor level={data.level}>
          <img src={`/image/graph/graph_${data.level}.png`} alt="" />
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </BackColor>
        {data.level !== 8 && (
          <StepLevel>
            <img src={`/image/step/level_${data.level}.png`} alt="" />
          </StepLevel>
        )}
      </StepWrap>
    </Container>
  );
}

export default LevelResult;

const Container = styled("div")`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const LevelRibbon = styled("div")`
  width: 380px;
  height: 96px;
  margin-bottom: 16px;
  img {
    width: 100%;
    height: 100%;
  }
`;

const LevelHelmet = styled("div")`
  margin-bottom: 32px;
`;

const LevelTitle = styled("h2")`
  font-weight: normal;
  font-size: 36px;
  line-height: 57px;
  /* identical to box height, or 158% */

  text-align: center;
  letter-spacing: -0.0025em;

  color: #212121;
  margin-bottom: 10px;

  b {
    font-weight: 800;
  }
`;

const LevelDesc = styled("span")`
  font-weight: 700;
  font-size: 21px;
  line-height: 33px;

  text-align: center;
  letter-spacing: -0.0025em;

  color: #212121;

  margin-bottom: 64px;
`;

const BackColor = styled("div")`
  width: 1011px;
  height: 332px;
  position: relative;
  display: flex;
  border-radius: 2px;
  background: #e5e5e5;

  margin-bottom: 75px;

  img {
    position: absolute;
  }

  & > div {
    width: 126.375px;
    height: 100%;
  }

  ${(props) =>
    props.level &&
    css`
      & > div:nth-of-type(${props.level}) {
        background-color: #fff;
      }
    `}
`;

const StepWrap = styled("div")`
  margin-bottom: 60px;
`;

const StepLevel = styled("div")``;
