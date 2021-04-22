import deadCat from "../images/dead.png";

export default function GameOver(props) {
  const { setPage } = props;
  localStorage.clear();

  return (
    <>
      <div className="gameOverImg">
        <img className="gameOver" alt="game_over" src={deadCat} />
      </div>
      <button onClick={setPage}>resrart</button>
    </>
  );
}
