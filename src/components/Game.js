import { useState, useRef } from "react"
import "./Game.css"

const Game = ({
  verifyLetter,
  pickedWord,
  pickedCategory,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score
}) => {
  const [letter, setLetter] = useState("")
  const letterInputRef = useRef(null)
  console.log(guessedLetters, "Guessed Letter Game")

  const handleLetter = (event) => {
    setLetter(event.target.value)
    
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    verifyLetter(letter)
    setLetter("")
    letterInputRef.current.focus()
  }


  return (
    <div className="game">
      <p className="points">
        <span>Pontuação: {score}</span>
      </p>
      <h1>Adivinha a palavra:</h1>
      <h3 className="tip">
        Dica sobre a palavra: <span>{pickedCategory}</span>
      </h3>
      <p>Você ainda tem {guesses} tentativas</p>
      <div className="wordContainer">
        {letters.map((letter, i) =>
          guessedLetters.includes(letter) ? (
            <span className="letter" key={i}>
              {letter}
            </span>
          ) : (
            <span key={i} className="blankSquare"></span>
          )
        )}
      </div>
      <div className="letterContainer">
        <p>Tente adivinhar a letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input 
            type="text"
            name="letter"
            maxLength="1"
            required onChange={handleLetter}
            value={letter}
            ref={letterInputRef}
         />
          <button >Jogar</button>
        </form>
      </div>
      <div className="wrongLettersContainer">
        <p>Letras já utilizadas</p>
        {wrongLetters.map((letter, index) => (
          <span key={index}>{letter},</span>
        ))}

      </div>
    </div>
  )
}
export default Game