import React, { useRef, useEffect, useState } from "react";
const foodType = ["can", "milk", "fish"];
const foodMap = {
  can: () => import("../images/can.png"),
  milk: () => import("../images/milk.png"),
  fish: () => import("../images/fish.png"),
};

export default function GiveFood() {
  const myCanvasRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const setFoodImgModule = async () => {
      let randomFoodIndex = Math.floor(Math.random() * 3);
      let foodImg = new Image();
      const importer = foodMap[foodType[randomFoodIndex]];
      const setFoodImgModule = await importer();
      foodImg.src = setFoodImgModule.default;
      foodImg.onload = () => {
        imgRef.current = foodImg;
      };
    };
    setFoodImgModule();
  }, []);

  useEffect(() => {
    if (imgRef.current === null) {
      return;
    }
    let canvas = myCanvasRef.current;
    let ctx = canvas.getContext("2d");

    ctx.drawImage(imgRef.current, 0, 0, 330, 330, 80, 0, 150, 150);
  });

  return <canvas width="300" height="200" ref={myCanvasRef}></canvas>;
}
