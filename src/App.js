/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import setup, { handleKeyDown } from "./setup";
import Row from "./Row";

const App = () => {
  const [state, _setState] = useState(null);
  const stateRef = useRef(state);

  const setState = (data) => {
    stateRef.current = data;
    _setState(data);
  };

  const handle = (e) => handleKeyDown(e, setState, stateRef.current);

  useEffect(() => {
    let width;
    let height;
    let error;

    while (!Number(width)) {
      if (error) alert('width must be a number');
      width = prompt('Enter the width');
      error = !Number(width) ? true : false
    }

    while (!Number(height)) {
      if (error) alert('height must be a number');
      height = prompt('Enter the height');
      error = !Number(height) ? true : false
    }

    window.addEventListener("keyup", handle);

    height = Math.ceil(+height);
    width = Math.ceil(+width)

    const [board, [y, x]] = setup(height, width);

    setState({
      steps: 0,
      sprites: +width,
      board,
      player: [y, x],
      won: false
    });

    return () => window.removeEventListener("keyup", handle);
  }, []);

  return (
    state && (
      <div className="App">
        {state.board.map((row, index) => (
          <Row key={`row-${index}`} row={row} />
        ))}
      </div>
    )
  );
};

export default App;
