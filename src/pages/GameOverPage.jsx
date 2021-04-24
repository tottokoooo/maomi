import deadCat from "../images/dead.png";
import "../styles/GameOver.css";

export default function GameOverPage(props) {
  const { setPage } = props;
  localStorage.clear();

  return (
    <>
      <div className="gameOverImg">
        <img className="gameOver" alt="game_over" src={deadCat} />
      </div>
      <button className="restartButton" onClick={setPage}>
        resrart
      </button>
    </>
  );
}
