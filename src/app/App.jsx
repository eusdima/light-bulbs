import React, { useState } from 'react';

import './App.css';
import Bulb from './Bulb';

// Custom hooks
import { useGame } from './functions';

const App = () => {
  const [gameData, gameFunctions] = useGame(25, 4);
  const [gameStarted, updateGameStarted] = useState(false);

  const startGameHandler = () => {
    updateGameStarted(true);
    gameFunctions.randomize();
  };

  return (
    <div className="App">
      <p>The Bulb Game</p>
      {gameStarted === true ? (
        <React.Fragment className>
          <div className="game">
            {gameData.bulbs.map((bulbIsActive, index) => {
              return (
                <Bulb
                  key={index}
                  type={bulbIsActive ? 'active' : ''}
                  onClick={() => gameFunctions.updateBulb(index)}
                />
              );
            })}
          </div>
          <p
            className={`verdict ${
              gameData.winStatus === true
                ? 'wonText'
                : gameData.winStatus === false
                ? 'lostText'
                : ' '
            }`}
          >
            {gameData.winStatus === true
              ? `You won! You managed to make a line of ${
                  gameData.maxSolution
                } light bulbs!`
              : gameData.winStatus === false
              ? `You lost! You couldn't manage to make a line of ${
                  gameData.maxSolution
                } light bulbs!`
              : `Pick a bulb to form the longest line. ${
                  gameData.movesLeft
                } moves left.`}
          </p>
          {gameData.movesLeft === 0 && (
            <button onClick={gameFunctions.randomize}>Reset</button>
          )}
          <button onClick={() => updateGameStarted(false)}>Close Game</button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <form className="gameSettings">
            <label>Number of bulbs</label>
            <input
              type="number"
              name="bulbs"
              placeholder="Number of bulbs"
              value={gameData.size}
              onChange={event =>
                gameFunctions.updateSize(Math.max(event.target.value, 1))
              }
            />
            <label>Number of moves</label>
            <input
              type="number"
              name="bulbs"
              placeholder="Number of moves"
              value={gameData.numOfMoves}
              onChange={event =>
                gameFunctions.updateNumOfMoves(
                  Math.min(event.target.value, gameData.size)
                )
              }
            />
            <button onClick={() => startGameHandler()}>Start Game</button>
          </form>
        </React.Fragment>
      )}
    </div>
  );
};

export default App;
