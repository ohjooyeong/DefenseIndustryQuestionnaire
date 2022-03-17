import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";

function PeriodTable({ solution }) {
  const renderConsult = (data) => {
    if (data.field) {
      return;
    }
    return (
      <React.Fragment key={data.name}>
        <Item field={data.field}>
          <span>{data.name}</span>
        </Item>
      </React.Fragment>
    );
  };

  const renderDefense = (data) => {
    if (!data.field) {
      return;
    }
    return (
      <React.Fragment key={data.name}>
        <Item field={data.field}>
          <span>{data.name}</span>
        </Item>
      </React.Fragment>
    );
  };

  return (
    <>
      <SubTitle color={"#f8d1b6"}>
        <div></div>교육 및 컨설팅
      </SubTitle>
      <ItemWrap>
        {solution.map((data) => {
          return renderConsult(data);
        })}
      </ItemWrap>

      <SubTitle color={"#9DC3E6"}>
        <div></div>방위산업 지원 사업
      </SubTitle>
      <ItemWrap>
        {solution.map((data) => {
          return renderDefense(data);
        })}
      </ItemWrap>
    </>
  );
}

export default PeriodTable;

const SubTitle = styled("h4")`
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 10px;
  line-height: 16px;

  letter-spacing: -0.0025em;

  margin-bottom: 6px;

  color: #212121;

  div {
    width: 4px;
    height: 4px;

    border-radius: 50%;
    margin-right: 5px;

    ${(props) =>
      props.color &&
      css`
        background: ${props.color};
      `}
  }
`;

const ItemWrap = styled("div")`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 6px;
  margin-bottom: 16px;
`;

const Item = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 10px;
  border: 1px solid #f8d1b6;
  box-sizing: border-box;
  border-radius: 2px;
  height: 18px;
  padding-top: 0.5px;

  ${(props) =>
    props.field &&
    css`
      border-color: ${props.field ? "#9dc3e6" : "#f8d1b6"};
    `}
  letter-spacing: -0.0025em;
  span {
    -webkit-transform: scale(0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 10px;
    line-height: 15.4px;
    color: #212121;
  }
`;
