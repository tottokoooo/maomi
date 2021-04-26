import deadCat from "../images/dead.png";
import "../styles/GameOver.css";

export default function GameOverPage(props) {
  const { setPage } = props;
  localStorage.clear();

  return (
    <>
      <div>
        <img className="gameOverImg" alt="game_over" src={deadCat} />
      </div>
      <br />
      <button className="restartButton" onClick={setPage}>
        resrart
      </button>
    </>
  );
}
