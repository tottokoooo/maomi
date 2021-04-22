import React, { useRef, useEffect, useState } from "react";
const catMap = {
  gray: () => import("./images/gray.jpg"),
  orange: () => import("./images/orange.jpg"),
  allGray: () => import("./images/all_gray.jpg"),
  flower: () => import("./images/folwer.jpg"),
};

const beginx_m = [0, 330, 660];

export default function Alive(props) {
  const { type } = props;
  const myCanvasRef = useRef(null);
  const [beginx, setBeginxIndex] = useState(0);
  const imgRef = useRef(null);
  const tailDirRef = useRef(1);

  useEffect(() => {
    const setCatImgModule = async () => {
      let catImg = new Image();
      const importer = catMap[type];
      const setCatImgModule = await importer();
      catImg.src = setCatImgModule.default;
      catImg.onload = () => {
        imgRef.current = catImg;
      };
    };
    setCatImgModule();

    setInterval(() => {
      setBeginxIndex((currentIndex) => {
        let temp = currentIndex + tailDirRef.current;
        if (temp === 3) tailDirRef.current = -1;
        if (temp === -1) tailDirRef.current = 1;
        return currentIndex + tailDirRef.current;
      });
    }, 750);
  }, []);

  useEffect(() => {
    if (imgRef.current === null) {
      return;
    }
    let canvas = myCanvasRef.current;
    let ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, 300, 120);
    ctx.drawImage(
      imgRef.current,
      beginx_m[beginx],
      0,
      330,
      330,
      80,
      0,
      150,
      150
    );
  }, [beginx]);

  return <canvas width="300" height="200" ref={myCanvasRef}></canvas>;
}
