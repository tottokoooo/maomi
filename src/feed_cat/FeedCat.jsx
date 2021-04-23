import { useEffect, useRef, useState } from "react";
import Alive from "../Alive";
import birthdayCake from "../images/birthday_cake.png";

const lifeMap = {
  life100: () => import("../images/life100.png"),
  life75: () => import("../images/life75.png"),
  life50: () => import("../images/life50.png"),
  life25: () => import("../images/life25.png"),
  life0: () => import("../images/life0.png"),
};

const foodType = ["can", "milk", "fish"];
const foodMap = {
  can: () => import("../images/can.png"),
  milk: () => import("../images/milk.png"),
  fish: () => import("../images/fish.png"),
};

export default function FeedCat(props) {
  const { setPage } = props;
  const [life, setLife] = useState(parseInt(localStorage.getItem("life")));
  const [catState, setcatState] = useState("Idle");
  const lifeTimerId = useRef(null);
  const [foodImgRef, setFoodImgRef] = useState(null);

  useEffect(() => {
    const setImgModule = async (number) => {
      const lifeNumber = `life${number}`;
      const importer = lifeMap[lifeNumber];
      const lifeImgModule = await importer();
      document.querySelector("#lifeImg").src = lifeImgModule.default;
    };
    setImgModule(parseInt(localStorage.getItem("life"))); //這樣每次改變貓咪狀態而渲染時都會先改成100再改成正確的

    if (catState === "Idle") {
      lifeTimerId.current = setInterval(() => {
        setLife((number) => {
          if (number - 25 < 0) endLife();
          else {
            number = number - 25;
            localStorage.setItem("life", number);
            setImgModule(number);
          }
          return number;
        });
      }, 10000);
      return;
    }

    if (catState === "Eating") {
      const setFoodImgModule = async () => {
        let randomFoodIndex = Math.floor(Math.random() * 3);
        const importer = foodMap[foodType[randomFoodIndex]];
        const setFoodImgModule = await importer();
        setFoodImgRef(() => setFoodImgModule.default);
      };
      setFoodImgModule();

      clearInterval(lifeTimerId.current);

      setLife((number) => {
        number += 25;
        setImgModule(number);
        localStorage.setItem("life", number);
        return number;
      });

      setTimeout(() => {
        setcatState("Idle");
      }, 3000);
      return;
    }
  }, [catState]);

  //生命結束->清空localStore、換頁面
  const endLife = () => {
    clearInterval(lifeTimerId.current);
    setPage();
  };

  const feedCat = () => {
    if (life === 100) return;
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
        {catState === "Eating" && <img src={foodImgRef} />}
      </div>
      <button onClick={feedCat}>feed</button>
    </>
  );
}
