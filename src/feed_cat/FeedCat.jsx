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

export default function FeedCat(props) {
  const { setPage } = props;
  const [life, setLife] = useState(parseInt(localStorage.getItem("life")));
  const [isFeeding, setFeedingState] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const setImgModule = async () => {
      console.log(life);
      const lifeNumber = `life${life}`;
      const importer = lifeMap[lifeNumber];
      const lifeImgModule = await importer();
      document.querySelector("#lifeImg").src = lifeImgModule.default;
    };
    setImgModule();
    localStorage.setItem("life", life);
  }, [life]);

  useEffect(() => {
    //餵食
    if (isFeeding) {
      //clearInterval(intervalRef.current); //暫停life的計時
      setLife((number) => {
        if (life < 100) return number + 25;
        else return number;
      }); //幫他加生命值
      //setTimeout(setFeedingState(() => false), 1200000); //等?秒拿下食物
      setFeedingState(() => false);
    }

    //生命結束->清空localStore、換頁面
    const endLife = () => {
      clearInterval(intervalRef.current);
      setPage();
    };

    //每?秒減少25生命值，若減少後<0則死亡
    intervalRef.current = setInterval(() => {
      setLife((number) => (number - 25 < 0 ? endLife() : number - 25));
    }, 30000);

    //每1秒紀錄一次年紀
    setInterval(() => {
      localStorage.setItem(
        "age_second",
        parseInt(localStorage.getItem("age_second")) + 1
      );
    }, 1000);
  }, [isFeeding]);

  const feedCat = () => {
    setFeedingState(() => true);
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
        {isFeeding && <GiveFood />}
      </div>
      <button onClick={feedCat}>feed</button>
    </>
  );
}
