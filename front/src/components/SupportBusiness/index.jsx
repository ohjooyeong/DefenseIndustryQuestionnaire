import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useEffect, useRef } from "react";
import PeriodTable from "./PeriodTable";
function SupportBusiness({ solution, support }) {
  const tdRef = useRef(null);

  const renderTableBody = (data) => {
    const rows = [];
    let count = 0;
    let period = data.period;
    for (let i = 1; i < 13; i++) {
      if (period[count] && period[count][0] === i) {
        let len = 0;
        len = period[count][1] - period[count][0] + 1;

        rows.push(
          <div
            style={{ width: "100%", position: "relative" }}
            key={i + data.name}
          >
            <TableDiv key={i + data.name}></TableDiv>
            <DivPeriod length={len * 28.9 - 8}>
              <p>모집공고</p>
            </DivPeriod>
          </div>
        );
        count += 1;
      } else {
        rows.push(<TableDiv key={i + data.name}></TableDiv>);
      }
    }

    return (
      <React.Fragment key={data.name}>
        <TableDivName>
          <p>{data.name}</p>
        </TableDivName>
        {rows}
      </React.Fragment>
    );
  };

  return (
    <Container>
      <Title>지원프로그램 및 사업 소개</Title>
      <Desc>
        협약기업 분석 및 해결방안에 따른 지원 프로그램과 사업을 소개하여, 기업의
        애로사항을 해소하도록 돕습니다.
      </Desc>
      <PeriodTable solution={solution} />
      <SubTitle color={"#9dc3e6"}>
        <div></div>민수 지원 사업
      </SubTitle>
      <Table>
        <TableDiv></TableDiv>
        <TableDiv>
          <p>1월</p>
        </TableDiv>
        <TableDiv ref={tdRef}>
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

        {support.map((data) => {
          return renderTableBody(data);
        })}
      </Table>
    </Container>
  );
}

export default SupportBusiness;

const Container = styled("div")`
  padding-left: 20px;
  padding-right: 16px;
`;

const Title = styled("h2")`
  font-weight: 800;
  font-size: 16px;
  line-height: 25px;
  letter-spacing: -0.0025em;

  color: #212121;
  margin-bottom: 4px;
`;

const Desc = styled("div")`
  font-size: 11px;
  line-height: 18px;
  letter-spacing: -0.0025em;

  color: #616161;
  margin-bottom: 10px;
`;

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
  border: 0.8px solid #616161;
  margin-bottom: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  box-sizing: border-box;

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
  border-bottom: 0.2px solid #888888;
  border-right: 0.2px solid #888888;

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
  border-bottom: 0.2px solid #888888;
  border-right: 0.2px solid #888888;
  overflow: hidden;

  p {
    -webkit-transform: scale(0.83);
    display: block;
    font-size: 10px;
    line-height: 17px;
    width: 100%;
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
  z-index: 1;

  p {
    -webkit-transform: scale(0.83);
    font-size: 10px;
    line-height: 17px;
  }
`;
