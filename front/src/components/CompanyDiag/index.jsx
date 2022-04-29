import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import { useNavigate } from "react-router-dom";

const nodePosition = (level, comp_score) => {
  const score = [0, 3, 6, 10, 16, 30, 40, 50];

  if (!comp_score) {
    return 0;
  }

  const tmp_score = score[level] - score[level - 1];
  const recent_score = comp_score - score[level - 1];

  console.log(Math.floor((tmp_score / recent_score) * 10));

  return Math.floor((tmp_score / recent_score) * 10);
};

function CompanyDiag({ data }) {
  console.log(data);

  const handleCenterCompanyPopup = (id) => {
    window.open(
      `/report/center/company/${id}`,
      `센터 - 보고서`,
      "width=800,height=700,location=no,status=no,scrollbars=yes"
    );
  };

  const renderNodeList = () => {
    const nodes = [];
    let cnt = 0;
    for (let i = 1; i < 9; i++) {
      const companies = data.map((company) => {
        if (i === company.level) {
          const heightRatio = Math.floor(Math.random() * 100);
          return (
            <NodeCompany
              widthRatio={nodePosition(company.level, company.recent_score)}
              heightRatio={heightRatio}
            >
              <span onClick={() => handleCenterCompanyPopup(company._id)}>
                {company.name}
              </span>
              <Node
                onClick={() => handleCenterCompanyPopup(company._id)}
              ></Node>
            </NodeCompany>
          );
        }
      });
      nodes.push(<div key={cnt + data[0]._id}>{companies}</div>);
    }

    return nodes;
  };

  return <Container>{renderNodeList()}</Container>;
}

export default CompanyDiag;

const Container = styled("div")`
  width: 492px;
  height: 42px;
  padding-left: 20px;
  display: flex;
  position: relative;
  top: -2px;

  & > div {
    width: 100%;
    height: 100%;
    border-right: 1px dashed #888888;
    position: relative;

    &:last-child {
      border-right: none;
    }
  }
`;

const Node = styled("div")`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  position: relative;
  top: -7px;
  left: -7px;
  background-color: #ec5b54;
  cursor: pointer;
`;

const NodeCompany = styled("div")`
  display: flex;
  flex-direction: column;
  position: absolute;
  align-items: center;
  width: 100%;

  ${(props) =>
    props.widthRatio >= 0 &&
    props.heightRatio >= 0 &&
    css`
      top: ${props.heightRatio}%;
      left: ${props.widthRatio}%;
    `}
  span {
    font-size: 10px;
    transform: scale(0.5);
    position: relative;
    top: -7px;
    left: -7px;
    cursor: pointer;
  }
`;
