import React from 'react'
import "./GameOver.css"

const GameOver = ({retryGamer, score}) => {
  return (
    <div>
      <h1>Fim de jogo!</h1>
      <h2>A sua pontuação foi: <span>{score}</span></h2>
      <button onClick={retryGamer}>Voltar!</button>
    </div>
  )
}

export default GameOver
