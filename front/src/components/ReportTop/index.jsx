import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";

function ReportTop({ purpose, color }) {
  return (
    <Container>
      <TopLineWrap>
        <TopLine color={color}></TopLine>
        <TopLineSub color={color}></TopLineSub>
      </TopLineWrap>
      <TitleWrap color={color}>
        <span>국방벤처기업 역량진단 종합보고서</span>
        <span>{purpose}</span>
      </TitleWrap>
    </Container>
  );
}

export default ReportTop;

const Container = styled("div")`
  padding: 0px 8px;
`;

const TopLineWrap = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
`;

const TopLine = styled("div")`
  width: 210px;
  height: 6px;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 1px;
  margin-right: 12px;

  ${(props) =>
    props.color &&
    css`
      background: ${props.color === "blue" ? "#005DC9" : "#DF5D56"};
    `}
`;

const TopLineSub = styled("div")`
  width: 293px;
  height: 2px;
  border-radius: 0.4px;
  display: block;

  ${(props) =>
    props.color &&
    css`
      background: ${props.color === "blue" ? "#005DC9" : "#DF5D56"};
    `}
`;

const TitleWrap = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.0025em;

  ${(props) =>
    props.color &&
    css`
      color: ${props.color === "blue" ? "#093476" : "#EC5B54"};
    `}
`;
