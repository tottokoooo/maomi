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

const birth = localStorage.getItem("birth");
const birthDate = new Date(parseInt(birth));

export default function FeedCatPage(props) {
  const [age, setAge] = useState(0);
  const { setPage } = props;
  const [life, setLife] = useState(parseInt(localStorage.getItem("life")));
  const CatState = {
    Idle: "Idle",
    Eating: "Eating",
  };
  const [catState, setcatState] = useState(CatState.Idle);
  const lifeTimerId = useRef(null);
  const [foodImgRef, setFoodImgRef] = useState(null);
  const [lifeImgSrc, setLifeImgSrc] = useState(null);

  useEffect(() => {
    setInterval(() => {
      const secDifference = (Date.now() - localStorage.getItem("birth")) / 1000;
      const hour = Math.floor(secDifference / 3600);
      const minute = Math.floor(Math.floor(secDifference % 3600) / 60);
      setAge(() => hour + ":" + minute);
    }, 120000);
  }, []);

  useEffect(() => {
    const setImgModule = async (number) => {
      const lifeNumber = `life${number}`;
      const importerLifeImage = lifeMap[lifeNumber];
      const lifeImgModule = await importerLifeImage();
      setLifeImgSrc(() => lifeImgModule.default);
    };
    setImgModule(parseInt(localStorage.getItem("life")));

    if (catState === CatState.Idle) {
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
      }, 120000);
      return;
    }

    if (catState === CatState.Eating) {
      const setFoodImgModule = async () => {
        const randomFoodIndex = Math.floor(Math.random() * 3);
        const importerFoodImage = foodMap[foodType[randomFoodIndex]];
        const setFoodImgModule = await importerFoodImage();
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
        setcatState(CatState.Idle);
        setFoodImgRef(() => "");
      }, 3000);
      return;
    }
  }, [catState]);

  const endLife = () => {
    clearInterval(lifeTimerId.current);
    setPage();
  };

  const feedCat = () => {
    if (life === 100) return;
    setcatState(CatState.Eating);
  };

  return (
    <>
      <div className="catInfo">
        <div className="name-row">
          <p>姓名: {localStorage.getItem("name")}</p>
        </div>
        <div className="life-birth-age-center">
          <div className="life-birth-age-row">
            <img id="lifeImg" src={lifeImgSrc} />
            <img className="cakeImg" alt="birthday" src={birthdayCake} />
            <p>
              {birthDate.getMonth() + 1}/{birthDate.getDate()}
            </p>
            <span>年齡-</span>
            <p>{age}</p>
          </div>
        </div>
      </div>

      <div className="catHome">
        <CatCanvas type={localStorage.getItem("type")} />
        <img
          className={classNames("foodImg", {
            hide: catState === CatState.Idle,
          })}
          src={foodImgRef}
        />
      </div>
      <button className="feedButton" onClick={feedCat}>
        feed
      </button>
    </>
  );
}
