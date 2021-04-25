import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import CatCanvas from "../components/CatCanvas";
import birthdayCake from "../images/birthday_cake.png";
import "../styles/CatFeedingPage.css";

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

export default function FeedCatPage(props) {
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
    setImgModule(parseInt(localStorage.getItem("life")));

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
      }, 5000);
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
        setFoodImgRef(() => "");
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
        <div className="name-row">
          <p>姓名: {localStorage.getItem("name")}</p>
        </div>
        <div className="life-birth-age-center">
          <div className="life-birth-age-row">
            <img id="lifeImg" />
            <img className="cakeImg" alt="birthday" src={birthdayCake} />
            <p>{localStorage.getItem("birth").split(" ").slice(1, 3)}</p>
            <span>年齡-</span>
            <p>
              {Math.floor(localStorage.getItem("age_second") / 3600) +
                ":" +
                Math.floor(
                  Math.floor(localStorage.getItem("age_second") % 3600) / 60
                )}
            </p>
          </div>
        </div>
      </div>

      <div className="catHome">
        <CatCanvas type={localStorage.getItem("type")} />
        <img
          className={classNames("foodImg", { hide: catState === "Idle" })}
          src={foodImgRef}
        />
      </div>
      <button className="feedButton" onClick={feedCat}>
        feed
      </button>
    </>
  );
}
