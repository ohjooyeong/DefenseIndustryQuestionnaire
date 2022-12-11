import axios from "axios";
import React, { useEffect } from "react";
import * as XLSX from "xlsx";

const CompanyList = () => {
  const handleCompanyListExport = () => {
    (async () => {
      try {
        const { data } = await axios.get(`/api/v1/list/company`);

        const ws = XLSX.utils.json_to_sheet(data.data);

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

        XLSX.writeFile(wb, "Test.xlsx");
      } catch (error) {}
    })();
  };

  return (
    <div>
      <button onClick={handleCompanyListExport}>회사 리스트 가져오기</button>
    </div>
  );
};

export default CompanyList;
