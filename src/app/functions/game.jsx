import { useState, useEffect } from 'react';

import { emptyArrayWithValue } from './helper';

const initialState = {
  size: 25,
  numOfMoves: 4,
  bulbs: emptyArrayWithValue(25, false),
  movesLeft: 4,
  maxSolution: 4,
  winStatus: null,
};

const useGameState = () => {
  const [gameState, _updateGameState] = useState(initialState);

  const updateSingle = (key, value) => {
    _updateGameState({ ...gameState, [key]: value });
  };

  const updateMultiple = newStatesObject => {
    _updateGameState({ ...gameState, ...newStatesObject });
  };

  return [gameState, { single: updateSingle, multiple: updateMultiple }];
};

const useGame = (initialSize, initialNumOfMoves) => {
  const [
    { size, numOfMoves, bulbs, movesLeft, maxSolution, winStatus },
    updateGameState,
  ] = useGameState();
  /**
   *  Update game variables
   */

  const updateSize = value => {
    updateGameState.single('size', value);
    randomize(value);
  };

  const updateNumOfMoves = value => {
    updateGameState.single('numOfMoves', value);
    randomize(size);
  };

  /**
   *  Turn a lightbulb on if it is off
   */

  const updateBulb = bulbIndex => {
    console.log({ movesLeft, bulbs: bulbs[bulbIndex] });
    if (movesLeft > 0 && !bulbs[bulbIndex]) {
      const newBulbs = [...bulbs];

      newBulbs[bulbIndex] = true;

      updateGameState.multiple({
        bulbs: newBulbs,
        movesLeft: movesLeft - 1,
      });

      _evaluateSolution(newBulbs);
    }
  };

  /**
   *  Restart the game and initialize all the variables
   */

  const randomize = (newSize = size) => {
    const newBulbs = new Array(newSize);

    for (let i = 0; i < newSize; i++) {
      newBulbs[i] = parseInt(Math.random() * 3) === 0;
    }

    updateGameState.multiple({
      bulbs: newBulbs,
      movesLeft: numOfMoves,
      winStatus: null,
    });

    _computeMaxSolution(newBulbs);
  };

  /**
   *  Compute the max possible solution in linear time
   */

  const _computeMaxSolution = bulbs => {
    let solution = 0,
      tempSolution = 0,
      tempMovesLeft = numOfMoves,
      lastOne = size;

    for (let i = 0; i < size; i++) {
      if (bulbs[i] === true) {
        tempSolution += 1;
      } else if (tempMovesLeft > 0) {
        if (tempMovesLeft === numOfMoves) {
          lastOne = i;
        }

        tempSolution += 1;
        tempMovesLeft -= 1;
      } else {
        i = lastOne;
        tempSolution = 0;
        tempMovesLeft = numOfMoves;
      }

      if (tempSolution > solution) {
        solution = tempSolution;
      }
    }

    updateGameState.single('maxSolution', solution);
  };

  /**
   *  Compute user's solution and check if it matches the maximum
   */

  const _evaluateSolution = bulbs => {
    let solution = 0,
      tempSolution = 0;

    for (let i = 0; i < size; i++) {
      if (bulbs[i] === true) {
        tempSolution += 1;
      } else {
        tempSolution = 0;
      }

      if (tempSolution > solution) {
        solution = tempSolution;
      }
    }

    if (solution === maxSolution) {
      updateGameState('winStatus', true);
    } else if (movesLeft === 1) {
      updateGameState('winStatus', false);
    }
  };

  return [
    { size, numOfMoves, bulbs, movesLeft, winStatus, maxSolution },
    { updateSize, updateNumOfMoves, updateBulb, randomize },
  ];
};

export default useGame;
