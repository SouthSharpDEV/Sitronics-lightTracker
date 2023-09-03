import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/home.page";
import { RequestHistoryPage } from "./pages/request-history.page";
import HistoryIcon from "@mui/icons-material/History";

import HomeIcon from "@mui/icons-material/Home";

import "./App.css";

function App() {
  const [isStarted, setIsStarted] = React.useState(false);

  return (
    <>
      <header>
        <Link className="nav-btn" to={"/"}>
          <HomeIcon />
          Главная
        </Link>
        <div className="line" />
        <Link className="nav-btn" to={"/requestsHistory"}>
          <HistoryIcon />
          История запросов
        </Link>
      </header>
      <Routes>
        <Route path="/" element={<HomePage isStarted={isStarted} setIsStarted={setIsStarted} />} />
        <Route path="/requestsHistory" element={<RequestHistoryPage />} />
      </Routes>
    </>
  );
}
export default App;
