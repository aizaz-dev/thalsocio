import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./scenes/homePage/index";
import LoginPage from "./scenes/loginPage/index";
import ProfilePage from "./scenes/profilePage/index";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import Trending from "./scenes/trendingPage";
import LeaderBoard from "./scenes/leaderboardPage.jsx";
import PageNotFound from "./scenes/pageNotFound";
import PrivateRoute from "./helpers/PrivateRoute";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/home" element={<HomePage />} />
              <Route path="/profile/:userId" element={<ProfilePage />} />
              <Route path="/trending" element={<Trending />} />
              <Route path="/leaderboard" element={<LeaderBoard />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
