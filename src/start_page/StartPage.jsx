import Alive from "../Alive";
import { useState } from "react";

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
        <Alive type={catType} />
      </div>
      <button onClick={setPage}>srart</button>

      <p>
        &copy; by
        <a href="#" onClick={showorNot}>
          Winnie
        </a>
      </p>
      {showIntroduction && (
        <p id="interduction">
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
