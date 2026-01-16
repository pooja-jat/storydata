import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import StoriesList from "./pages/StoriesList";
import StoryDetail from "./pages/StoryDetail";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<StoriesList />} />
        <Route path="/story/:id" element={<StoryDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
