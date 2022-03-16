import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";

function PeriodTable({ solution }) {
  const renderTableBody = (data) => {
    return (
      <React.Fragment key={data.name}>
        <TableDivName>
          <p>{data.name}</p>
        </TableDivName>
        <div style={{ width: "100%", position: "relative" }}>
          <TableDiv></TableDiv>
          <Period>
            <p>상시 지원</p>
          </Period>
        </div>
        <TableDiv></TableDiv>
        <TableDiv></TableDiv>
        <TableDiv></TableDiv>
        <TableDiv></TableDiv>
        <TableDiv></TableDiv>
        <TableDiv></TableDiv>
        <TableDiv></TableDiv>
        <TableDiv></TableDiv>
        <TableDiv></TableDiv>
        <TableDiv></TableDiv>
        <TableDiv></TableDiv>
      </React.Fragment>
    );
  };

  return (
    <>
      <SubTitle color={"#f8d1b6"}>
        <div></div>교육 및 컨설팅
      </SubTitle>
      <Table>
        <TableDiv></TableDiv>
        <TableDiv>
          <p>1월</p>
        </TableDiv>
        <TableDiv>
          <p>2월</p>
        </TableDiv>
        <TableDiv>
          <p>3월</p>
        </TableDiv>
        <TableDiv>
          <p>4월</p>
        </TableDiv>
        <TableDiv>
          <p>5월</p>
        </TableDiv>
        <TableDiv>
          <p>6월</p>
        </TableDiv>
        <TableDiv>
          <p>7월</p>
        </TableDiv>
        <TableDiv>
          <p>8월</p>
        </TableDiv>
        <TableDiv>
          <p>9월</p>
        </TableDiv>
        <TableDiv>
          <p>10월</p>
        </TableDiv>
        <TableDiv>
          <p>11월</p>
        </TableDiv>
        <TableDiv>
          <p>12월</p>
        </TableDiv>

        {solution.map((data) => {
          return renderTableBody(data);
        })}
      </Table>
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

  margin-bottom: 5px;

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

const Table = styled("div")`
  display: grid;

  border-radius: 4px;
  border-style: hidden;
  border: 0.1px solid #888888;
  margin-bottom: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  box-sizing: border-box;
  border-bottom: 0;
  border-right: 0;

  z-index: 0;

  grid-template-columns: 148px repeat(12, 28.9px);
`;

const TableDiv = styled("div")`
  height: 26px;
  border-style: hidden;

  position: relative;
  z-index: 0;

  vertical-align: middle;
  letter-spacing: -0.0025em;

  color: #212121;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 0.1px solid #888888;
  border-right: 0.1px solid #888888;

  p {
    -webkit-transform: scale(0.83);
    display: block;
    font-size: 10px;
    line-height: 17px;
  }
`;

const TableDivName = styled("div")`
  height: 26px;
  border-style: hidden;

  position: relative;
  z-index: 0;

  vertical-align: middle;
  letter-spacing: -0.0025em;

  color: #212121;
  box-sizing: border-box;
  display: flex;
  justify-content: start;
  align-items: center;
  border-bottom: 0.1px solid #888888;
  border-right: 0.1px solid #888888;
  overflow: hidden;

  p {
    -webkit-transform: scale(0.83);
    display: block;
    font-size: 10px;
    line-height: 17px;
    width: 100%;
  }
`;

const Period = styled("div")`
  position: absolute;
  height: 16px;
  width: 338px;
  background: linear-gradient(
      0deg,
      rgba(248, 209, 182, 0.6),
      rgba(248, 209, 182, 0.6)
    ),
    #ffffff;
  border-radius: 8px;
  top: 5px;
  left: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;

  font-weight: 700;
  color: #212121;
  letter-spacing: -0.0025em;

  p {
    -webkit-transform: scale(0.83);
    font-size: 10px;
    line-height: 17px;
  }
`;

const DivPeriod = styled("div")`
  position: absolute;
  height: 16px;
  ${(props) =>
    props.length &&
    css`
      width: ${props.length}px;
    `}
  background: linear-gradient(0deg, rgba(157, 195, 230, 0.6), rgba(157, 195, 230, 0.6)), #FFFFFF;
  border-radius: 8px;
  top: 5px;
  left: 4px;
  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: 700;
  color: #212121;
  letter-spacing: -0.0025em;

  p {
    -webkit-transform: scale(0.83);
    font-size: 10px;
    line-height: 17px;
  }
`;
