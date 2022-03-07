import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
function SupportBusiness() {
  return (
    <Container>
      <Title>지원프로그램 및 사업 소개</Title>
      <Desc>
        협약기업 분석 및 해결방안에 따른 지원 프로그램과 사업을 소개하여, 기업의
        애로사항을 해소하도록 돕습니다.
      </Desc>
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
            <td></td>
          </tr>
          <tr>
            <td>
              <p>방산사업 관련 행정서류 작성 지원</p>
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
            <td></td>
          </tr>
        </tbody>
      </Table>
      <SubTitle color={"#9dc3e6"}>
        <div></div>방위산업 지원 사업
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
            <td></td>
          </tr>
          <tr>
            <td>
              <p>방산사업 관련 행정서류 작성 지원</p>
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
            <td></td>
          </tr>
        </tbody>
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

const Table = styled("table")`
  width: 100%;
  border-collapse: collapse;
  border-radius: 4px;
  border-style: hidden;
  box-shadow: 0 0 0 1px #616161;
  margin-bottom: 10px;

  th,
  td {
    height: 23px;
    border: 0.3px solid #888888;

    font-size: 10px;

    line-height: 14px;

    text-align: center;
    vertical-align: middle;
    letter-spacing: -0.0025em;

    color: #212121;

    p {
      -webkit-transform: scale(0.83);
    }
  }

  th:first-of-type,
  td:first-of-type {
    width: 142px;
    text-align: start;
  }

  div {
    background: linear-gradient(
        0deg,
        rgba(248, 209, 182, 0.6),
        rgba(248, 209, 182, 0.6)
      ),
      #ffffff;
    border-radius: 8px;
  }
`;
