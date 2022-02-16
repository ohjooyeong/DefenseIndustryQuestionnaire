import { BrowserRouter, Route, Routes } from "react-router-dom";
import Start from "./pages/start";
import { RecoilRoot } from "recoil";
import "./styles/App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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
          </Routes>
        </ThemeProvider>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
