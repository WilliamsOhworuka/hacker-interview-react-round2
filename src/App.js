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
    window.addEventListener("keyup", handle);

    const height = prompt('Enter the height') || 10;
    const width = prompt('Enter the width') || 10;

    const [board, [y, x]] = setup(+height, +width);

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
        {state.board.map((row) => (
          <Row row={row} />
        ))}
      </div>
    )
  );
};

export default App;
