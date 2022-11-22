//Styles
import './App.css';

//React
import { useState, useCallback, useEffect } from "react";

//data
import { wordsList } from "./data/words"

// Components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
]
const guessesQty = 5

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([])

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(guessesQty)
  const [score, setScore] = useState(0)


  const pickedWordAndCategory = useCallback(() => {
    // pick a random category
    const categories = Object.keys(words)
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)]
    console.log(category, "Categoria escolhida")

    //pick a random word
    const word = words[category][Math.floor(Math.random() * words[category].length)]
    console.log(word, "Palavra escolhida")
    return { word, category }
  },[words])


  // starts the secret word game 
  const startGame = useCallback(() => {
    //clear all letters 
    clearLetterStates()
    // pick word and pick category
    const { word, category } = pickedWordAndCategory()
    console.log(word, category)

    // array of letters
    let wordLetters = word.split("")
    console.log(wordLetters)
    wordLetters = wordLetters.map((l) => l.toLowerCase())
    console.log(wordLetters)

    //fill states
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)

    setGameStage(stages[1].name)
  }, [pickedWordAndCategory])

  // process the letter input
  const verifyLetter = (letter) => {

    const normalizedLetter = letter.toLowerCase()

    // check if letter has already been used
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return
    }

    // push guessed letter or remove guess
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters => [
        ...actualGuessedLetters,
        normalizedLetter
      ]))

    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter
      ])

      setGuesses((actualGuesses) => actualGuesses - 1)
    }
  }
  const clearLetterStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }

  //check if you're out of guesses
  useEffect(() => {
    if (guesses <=0) {
      // reset all states
      clearLetterStates()
      setGameStage(stages[2].name)
    }
  }, [guesses])

  // check win condition
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)]

    // win condition
    if(guessedLetters.length === uniqueLetters.length && gameStage === stages[1].name){
      // add score
      setScore((actualScore) => actualScore += 100)

      // restart game with new word
      startGame()
    }

    console.log(uniqueLetters)
  },[guessedLetters, letters, startGame, gameStage])



  console.log(guessedLetters, "Acertos")
  console.log(wrongLetters, "Erros");

  // restarts the game
  const tryAgain = () => {
    setScore(0)
    setGuesses(guessesQty)
    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" &&
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      }
      {gameStage === "end" && <GameOver tryAgain={tryAgain} score ={score} />}
    </div>
  );
}

export default App;
