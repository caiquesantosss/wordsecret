import "./App.css";
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";
import { useCallback, useEffect, useState } from "react";
import { wordsList } from "./data/words";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickWord, setPickWord] = useState("");
  const [pickCategory, setPickCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = useCallback(() => {
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];


    const word =
      words[category][Math.floor(Math.random() * words[category].length)];
    return { word, category };
  }, [words]);

  const startGame = useCallback(() => {
    clearLetterStates()

    setGameStage(stages[1].name);
    const { word, category } = pickWordAndCategory();
    //Split
    let wordSplit = word.split("");
    wordSplit = wordSplit.map((i) => i.toLowerCase());


    setPickCategory(category);
    setPickWord(word);
    setLetters(wordSplit);
    
  }, [pickWordAndCategory]);
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase()
      // check if letter has alredy been utilized
        if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
          return
        }

        //push guess letter or remove a guess
          if(letters.includes(normalizedLetter)) {
            setGuessedLetters((actualGuessedLetters) => [
              ...actualGuessedLetters,
              normalizedLetter,
            ]) } else {
              setWrongLetters((actualWrongLetters) => [
                ...actualWrongLetters,
                normalizedLetter,
              ])

              setGuesses((acutualGuesses) => acutualGuesses - 1)
            }
          }

          const clearLetterStates = () => {
            setGuessedLetters([])
            setWrongLetters([])
          }

          useEffect(() =>{
            if(guesses <= 0) {
              clearLetterStates()
              setGameStage(stages[2].name)
            }
          }, [guesses])

          useEffect(() => {
            const uniqueLetters = [... new Set(letters)]
              if(guessedLetters.length === uniqueLetters.length) {
                setScore((actualScore) => actualScore += 100)
                  startGame()
              }
    
          }, [guessedLetters, letters, startGame])

          const retry = () => {
              setScore(0)
              setGuesses(3)
            setGameStage(stages[0].name);
          };
        
          return (
            <div className="App">
              {gameStage === "start" && <StartScreen startGame={startGame} />}
              {gameStage === "game" && (
                <Game
                  verifyLetter={verifyLetter}
                  pickedWord={pickWord}
                  pickedCategory={pickCategory}
                  letters={letters}
                  guessedLetters={guessedLetters}
                  wrongLettres={wrongLetters}
                  guesses={guesses}
                  score={score}
                />
              )}
              {gameStage === "end" && <GameOver retryGamer={retry} score={score} />}
            </div>
          );
        
  };



export default App;
