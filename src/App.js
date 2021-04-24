import React, { useState } from "react";
import logo from "./images/logo.png";
import FeedCatPage from "./pages/CatFeedingPage";
import GameOverPage from "./pages/GameOverPage";
import MineTestPage from "./pages/MineTestPage";
import StartPage from "./pages/StartPage";
import "./styles/App.css";

export default function App() {
  const page = ["Start", "Test", "Feed", "Over"];
  const [currentPage, setPage] = useState(
    localStorage.getItem("name") === null ? 0 : 2
  );

  const change = () => {
    setPage((pageNumber) => (pageNumber === 3 ? 0 : pageNumber + 1));
  };
  console.log();

  return (
    <>
      <div className="banner">
        <img alt="petto" src={logo} />
      </div>
      <div className="pages">
        {page[currentPage] === "Start" && <StartPage setPage={change} />}
        {page[currentPage] === "Test" && <MineTestPage setPage={change} />}
        {page[currentPage] === "Feed" && <FeedCatPage setPage={change} />}
        {page[currentPage] === "Over" && <GameOverPage setPage={change} />}
      </div>
    </>
  );
}
