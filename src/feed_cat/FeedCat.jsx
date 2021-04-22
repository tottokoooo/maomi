import { useRef, useState, useEffect } from "react";
import Alive from "../Alive";
import GiveFood from "./GiveFood";
import birthdayCake from "../images/birthday_cake.png";

const lifeMap = {
  life100: () => import("../images/life100.png"),
  life75: () => import("../images/life75.png"),
  life50: () => import("../images/life50.png"),
  life25: () => import("../images/life25.png"),
  life0: () => import("../images/life0.png"),
};
let lifeTimerId = "";

export default function FeedCat(props) {
  const { setPage } = props;
  const [life, setLife] = useState(parseInt(localStorage.getItem("life")));
  const [catState, setcatState] = useState("Idle");

  useEffect(() => {
    if (catState === "Idle") {
      lifeTimerId = setInterval(() => {
        setLife((number) => (number - 25 < 0 ? endLife() : number - 25));
      }, 100530000);
    }
    if (catState === "Eating") {
      clearInterval(lifeTimerId);
      if (life < 100) setLife((number) => number + 25);
      setTimeout(() => setcatState("Idle"), 3000);
    }
  }, [catState]);

  //生命結束->清空localStore、換頁面
  const endLife = () => {
    clearInterval(lifeTimerId);
    setPage();
  };

  const feedCat = () => {
    setcatState("Eating");
  };

  return (
    <>
      <div className="catInfo">
        <p>name:</p>
        <p>{localStorage.getItem("name")}</p>
        <img id="lifeImg" />
        <img alt="birthday" src={birthdayCake} />
        <p>{localStorage.getItem("birth").split(" ").slice(1, 3)}</p>
        <span>Age-</span>
        <p>
          {Math.floor(localStorage.getItem("age_second") / 3600) +
            ":" +
            Math.floor(
              Math.floor(localStorage.getItem("age_second") % 3600) / 60
            )}
        </p>
      </div>

      <div className="catHome">
        <Alive type={localStorage.getItem("type")} />
        {catState === "Eating" && <GiveFood />}
      </div>
      <button onClick={feedCat}>feed</button>
    </>
  );
}
