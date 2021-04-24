import { useState } from "react";
import CatCanvas from "../components/CatCanvas";
import "../styles/StartPage.css";

export default function StartPage(props) {
  const { setPage } = props;
  const catType = "gray";
  const [showIntroduction, setIntroduction] = useState(false);

  const showorNot = () => {
    setIntroduction((state) => !state);
  };

  return (
    <>
      <div className="canvas">
        <CatCanvas type={catType} />
      </div>
      <button className="start_button" onClick={setPage}>
        start
      </button>
      <p className="createBy">
        &copy; by
        <a className="creator" href="#" onClick={showorNot}>
          Winnie
        </a>
      </p>
      {showIntroduction && (
        <p className="interduction">
          hi!&nbsp;我是元智大學資工系的學生<b>許晴</b>ヽ(*´∀`)ﾉ
          <br />
          這是我做的一個電子貓遊戲，
          <br />
          等下會有一個心理測驗，
          <br />
          可以測出你適合養甚麼貓咪喔~
          <br />
          好好養他愛他~♥
        </p>
      )}
    </>
  );
}
