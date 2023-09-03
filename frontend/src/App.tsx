import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/home.page";
import { RequestHistoryPage } from "./pages/request-history.page";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}>
        <Route index element={<HomePage />} />
        <Route path="/requestsHistory" element={<RequestHistoryPage />} />
      </Route>
    </Routes>
  );
}
export default App;
