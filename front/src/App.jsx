import { BrowserRouter, Route, Routes } from "react-router-dom";
import Start from "./pages/start";
import { RecoilRoot } from "recoil";
import "./styles/App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Foundation from "./pages/foundation";
import Question from "./pages/question";
import Result from "./pages/result";
import Company from "./pages/result/company";
import axios from "axios";
import CompanyReport from "./pages/report/company";
import CenterReport from "./pages/report/center";
import CenterCompany from "./pages/report/center/company";
import CompanyList from "./pages/companylist";
import EvaluationReport from "./pages/report/center/evaluation";

axios.defaults.baseURL = "http://localhost:5000";

const theme = createTheme({
  typography: {
    fontFamily: `"NanumSquare", 나눔스퀘어, sans-serif`,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightBold: 700,
    fontWeightExtraBold: 800,
  },
});

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/foundation" element={<Foundation />} />
            <Route path="/question" element={<Question />} />
            <Route path="/result" element={<Result />} />
            <Route path="/result/:company" element={<Company />} />

            <Route path="/report/:id" element={<CompanyReport />} />
            <Route path="/report/center/:id" element={<CenterReport />} />
            <Route
              path="/report/center/:id/evaluation"
              element={<EvaluationReport />}
            />
            <Route
              path="/report/center/company/:id"
              element={<CenterCompany />}
            />
            <Route path="/company" element={<CompanyList />} />
          </Routes>
        </ThemeProvider>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
