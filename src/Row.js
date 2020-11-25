import React from "react";
import mario from './assets/icons8-super-mario.svg';
import prof from './assets/icons8-professor-x.svg';

const styles = {
  cell: {
    height: "30px",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: "30px",
    border: "2px solid gray"
  },
  row: {
    display: "flex"
  },
  img: {
    width: '30px',
    height: '30px'
  }
};

const icon = (val) => val === '*'
  ? <img style={styles.img} src={mario} alt="mario" />
  : <img style={styles.img} src={prof} alt="prof" />

const Cell = ({ val }) => <div style={styles.cell}>
  {val === "" ? "" : icon(val)}
</div>;

const Row = ({ row }) => {
  return (
    <div style={styles.row}>
      {row.map((item) => (
        <Cell val={item} />
      ))}
    </div>
  );
};

export default Row;
