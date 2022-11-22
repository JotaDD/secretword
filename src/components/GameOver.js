import "./GameOver.css"

const GameOver = ({tryAgain, score}) => {
  return (
    <div className="end">
      <h1>Fim de Jogo</h1>
      <h2>
        A sua pontuação foi: <span>{score}</span>
      </h2>
      <button onClick={tryAgain}>TENTAR NOVAMENTE</button>
    </div>

  )
}

export default GameOver