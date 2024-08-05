import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Contact from "./Contact";
import "./styles.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
