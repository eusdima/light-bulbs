import { useState } from 'react';

import { emptyArrayWithValue } from './helper';

const useGame = (initialSize, initialNumOfMoves) => {
  const [size, _updateSize] = useState(initialSize);
  const [numOfMoves, _updateNumOfMoves] = useState(initialNumOfMoves);

  const [bulbs, updateBulbs] = useState(
    emptyArrayWithValue(size),
    false // Initial Value
  );

  const [movesLeft, _updateMovesLeft] = useState(numOfMoves);
  const [maxSolution, _updateMaxSolution] = useState(numOfMoves);
  const [winStatus, _updateWinStatus] = useState(null);

  /**
   *  Update game variables
   */

  const updateSize = value => {
    _updateSize(value);
    randomize(value);
  };

  const updateNumOfMoves = value => {
    _updateNumOfMoves(value);
    randomize();
  };

  /**
   *  Turn a lightbulb on if it is off
   */

  const updateBulb = bulbIndex => {
    if (movesLeft > 0 && !bulbs[bulbIndex]) {
      const newBulbs = [...bulbs];

      newBulbs[bulbIndex] = true;
      updateBulbs(newBulbs);
      _updateMovesLeft(movesLeft - 1);

      _evaluateSolution(newBulbs);
    }
  };

  /**
   *  Restart the game and initialize all the variables
   */

  const randomize = (newSize = size) => {
    const newBulbs = new Array(size);

    for (let i = 0; i < size; i++) {
      newBulbs[i] = parseInt(Math.random() * 3) === 0;
    }

    updateBulbs(newBulbs);
    _updateMovesLeft(numOfMoves);
    _updateWinStatus(null);

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

    _updateMaxSolution(solution);
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
      _updateWinStatus(true);
    } else if (movesLeft === 1) {
      _updateWinStatus(false);
    }
  };

  return [
    { size, numOfMoves, bulbs, movesLeft, winStatus, maxSolution },
    { updateSize, updateNumOfMoves, updateBulb, randomize },
  ];
};

export default useGame;
