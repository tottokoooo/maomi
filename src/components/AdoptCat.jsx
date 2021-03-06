import React, { useEffect, useState } from "react";
const catMap = {
  gray: () => import("../images/gray_single.jpg"),
  orange: () => import("../images/orange_single.jpg"),
  allGray: () => import("../images/all_gray_single.jpg"),
  flower: () => import("../images/folwer_single.jpg"),
};

export default function AdoptCat(props) {
  const { setPicture } = props;
  const [catName, setCatName] = useState("小咪");

  useEffect(() => {
    const setImgModule = async () => {
      const catType = localStorage.getItem("type");
      const importer = catMap[catType];
      const catImgModule = await importer();
      document.querySelector(".catsImg").src = "";
      document.querySelector(".yourCat").src = catImgModule.default;
    };
    setImgModule();
  }, []);

  const saveName = () => {
    localStorage.setItem("name", document.querySelector(".yourCatsName").value);
    //初始貓咪基本資料
    localStorage.setItem("life", "100");
    const date = Date.now();
    localStorage.setItem("birth", `${date}`);
    setPicture();
  };

  const handleInput = (event) => {
    const { value } = event.target;
    setCatName(value);
  };

  return (
    <>
      <div className="nameing">
        <p>幫他取名子吧：</p>
        <input
          type="text"
          className="yourCatsName"
          name="name"
          value={catName}
          onChange={handleInput}
        />
      </div>
      <br />
      <button className="feedCatButton" onClick={saveName}>
        feed it!
      </button>
    </>
  );
}
