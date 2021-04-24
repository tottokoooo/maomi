import React, { useState } from "react";
import AdoptCat from "../components/AdoptCat";
import AskQuestion from "../components/AskQuestion";
import questionCatImg from "../images/question_cat.jpg";
import "../styles/MineTestPage.css";

export default function MineTestPage(props) {
  const { setPage } = props;
  //state: start | mineTest | adoptCat
  const [picture, setPicture] = useState(0);

  const setNextPicture = () => {
    if (picture === 2) setPage();
    else setPicture((s) => s + 1);
  };

  return (
    <>
      <div className="showCatsImg">
        <img
          className="catsImg"
          alt="what_cat_do_you_fit?"
          src={questionCatImg}
        />
      </div>
      {picture === 0 && (
        <div className="start">
          <p>測驗出你命中注定的貓貓吧!</p>
          <button className="startAskingButton" onClick={setNextPicture}>
            start
          </button>
        </div>
      )}
      {picture === 1 && (
        <div className="mineTest">
          <AskQuestion setPicture={setNextPicture} />
        </div>
      )}
      {picture === 2 && (
        <div className="adoptCat">
          <AdoptCat setPicture={setNextPicture} />
        </div>
      )}
    </>
  );
}
