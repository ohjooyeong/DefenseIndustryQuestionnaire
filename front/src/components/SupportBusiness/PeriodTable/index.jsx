import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";

function PeriodTable() {
  return (
    <>
      <SubTitle color={"#f8d1b6"}>
        <div></div>교육 및 컨설팅
      </SubTitle>
      <Table>
        <thead>
          <tr>
            <th></th>
            <th>
              <p>1월</p>
            </th>
            <th>
              <p>2월</p>
            </th>
            <th>
              <p>3월</p>
            </th>
            <th>
              <p>4월</p>
            </th>
            <th>
              <p>5월</p>
            </th>
            <th>
              <p>6월</p>
            </th>
            <th>
              <p>7월</p>
            </th>
            <th>
              <p>8월</p>
            </th>
            <th>
              <p>9월</p>
            </th>
            <th>
              <p>10월</p>
            </th>
            <th>
              <p>11월</p>
            </th>
            <th>
              <p>12월</p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <p>연구개발 능력 향상</p>
            </td>
            <td>
              <Period>
                <p>상시 지원</p>
              </Period>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <p>방산사업 관련 행정서류 작성 지원</p>
            </td>
            <td>
              <Period>
                <p>상시 지원</p>
              </Period>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
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

const Table = styled("table")`
  width: 100%;
  border-collapse: collapse;
  border-radius: 4px;
  border-style: hidden;
  box-shadow: 0 0 0 1px #616161;
  margin-bottom: 10px;

  th,
  td {
    height: 26px;
    border: 0.3px solid #888888;
    position: relative;

    text-align: center;
    vertical-align: middle;
    letter-spacing: -0.0025em;

    color: #212121;
    box-sizing: border-box;

    p {
      -webkit-transform: scale(0.83);
      display: block;
      font-size: 10px;
      line-height: 17px;
      vertical-align: middle;
    }
  }

  td {
    width: 28px;
    box-sizing: border-box;
  }

  th:first-of-type,
  td:first-of-type {
    width: 142px;
    text-align: start;
  }
`;

const Period = styled("div")`
  position: absolute;
  height: 16px;
  width: 340px;
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
