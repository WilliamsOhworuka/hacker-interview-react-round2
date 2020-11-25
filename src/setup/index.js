const setup = (height, width, arr) => {
  const modArr = [...arr];
  const x = [];
  const y = [];

  // generate random cordinates
  while (x.length < width || y.length < height) {
    const v = Math.floor(Math.random() * height);
    const h = Math.floor(Math.random() * width);

    if (!x.includes(h) && x.length <= width) x.push(h);
    if (!y.includes(v) && y.length <= width) y.push(v);
  }

  for (let i = 0; i < width; i++) {
    modArr[y[i]][x[i]] = "*";
  }

  // Find the middle of the board
  const midX = Math.ceil(width / 2 - 1);
  const midY = Math.ceil(height / 2 - 1);

  modArr[midY][midX] = "#";

  return [modArr, [midY, midX]];
};

const initState = (height, width) => {
  const arr = [];

  for (let i = 0; i < height; i++) {
    arr[i] = new Array(width).fill("");
  }

  return setup(height, width, arr);
};

// check for number of enemies remaining
const checkSprites = (count, steps) => {
  if (count === 0) {
    alert(`Game over. Total moves to save the princess: ${steps}`);
    return true;
  }

  return false;
};

// controls
export const handleKeyDown = (e, updatePos, state) => {
  const dir = e.key;

  switch (dir) {
    case "ArrowUp":
      {
        const newState = { ...state };

        // get current player cordinates
        const [y, x] = newState.player;

        // check board boundaries
        if (y === 0) return newState;

        // get cell content 
        const content = newState.board[y - 1][x];

        // reduce enemy count
        if (content === "*" && !newState.won) {
          newState.sprites -= 1;
        }

        // update player position
        newState.board[y][x] = "";
        newState.board[y - 1][x] = "#";
        newState.player = [y - 1, x];

        // increase player steps
        newState.steps += 1;

        // get win status
        const won = !newState.won && checkSprites(newState.sprites, newState.steps);

        // update win status
        if (won) newState.won = true;
        updatePos(newState);
      }
      break;
    case "ArrowDown":
      {
        const newState = { ...state };

        // get current player cordinates
        const [y, x] = newState.player;

        // check board boundaries
        if (y > newState.board.length - 2) return newState;

        // get cell content
        const content = newState.board[y + 1][x];

        // reduce enemy count
        if (!newState.won && content === "*") {
          newState.sprites -= 1;
        }

        // update player position
        newState.board[y][x] = "";
        newState.board[y + 1][x] = "#";
        newState.player = [y + 1, x];

        // increase player steps
        newState.steps += 1;

        // get win status
        const won = !newState.won && checkSprites(newState.sprites, newState.steps);

        // update win status
        if (won) newState.won = true;
        updatePos(newState);
      }
      break;
    case "ArrowLeft":
      {
        const newState = { ...state };

        // get current player cordinates
        const [y, x] = newState.player;

        // check board boundaries
        if (x === 0) return newState;

        // get cell content
        const content = newState.board[y][x - 1];

        // reduce enemy count
        if (!newState.won && content === "*") {
          newState.sprites -= 1;
        }

        // update player position
        newState.board[y][x] = "";
        newState.board[y][x - 1] = "#";
        newState.player = [y, x - 1];

        // increase player steps
        newState.steps += 1;

        // get win status
        const won = !newState.won && checkSprites(newState.sprites, newState.steps);

        // update win status
        if (won) newState.won = true;
        updatePos(newState);
      }
      break;
    case "ArrowRight":
      {
        const newState = { ...state };

        // get current player cordinates
        const [y, x] = newState.player;

        // check board boundaries
        if (x > newState.board[x].length - 2) return newState;

        // get cell content
        const content = newState.board[y][x + 1];

        // reduce enemy count
        if (!newState.won && content === "*") {
          newState.sprites -= 1;
        }

        // update player position
        newState.board[y][x] = "";
        newState.board[y][x + 1] = "#";
        newState.player = [y, x + 1];

        // increase player steps
        newState.steps += 1;

        // get win status
        const won = !newState.won && checkSprites(newState.sprites, newState.steps);

        // update win status
        if (won) newState.won = true;
        updatePos(newState);
      }
      break;
    default:
      console.log("hey");
  }
};

export default initState;
