import React, { useState } from "react";
import "./style/App.css";
import StartPage from "./start_page/StartPage";
import MineTest from "./mine_test/MineTest";
import FeedCat from "./feed_cat/FeedCat";
import GameOver from "./game_over/GameOver";
import logo from "./images/logo.png";

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
        {page[currentPage] === "Test" && <MineTest setPage={change} />}
        {page[currentPage] === "Feed" && <FeedCat setPage={change} />}
        {page[currentPage] === "Over" && <GameOver setPage={change} />}
      </div>
    </>
  );
}
