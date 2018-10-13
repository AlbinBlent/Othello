
import React from 'react';
import './index.css';

function Square(props) {
    return (
    <button className="square" onClick={props.onClick}>
        {props.value}
    </button>
    );
}

export function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function updateVerticaly(squares){
    squares = squares.slice()
    const boardSize = squares.length
    for (let colIndex = 0; colIndex < boardSize; colIndex++) {
        const row = squares[colIndex];
        let firstSquare = {type: null, index: null}
        let lastSquare = {type: null, index: null}
        for (let index = 0; index < row.length; index++) {
            const element = row[index];
            if(element === 'X' || element === 'O') {
                firstSquare.type = element
                firstSquare.index = index
                break
            }
        }
        if (firstSquare !== 'X' || firstSquare !== 'O') {
            break
        }
        for (let index = row.length; index >= 0; index--) {
            const element = row[index];
            if(element === 'X' || element === 'O') {
                lastSquare.type = element
                lastSquare.index = index
                if (firstSquare.type === lastSquare.type) {
                    for (let index = firstSquare.index; index < lastSquare.index; index++) {
                        row[index] = firstSquare.type
                    }
                    break
                }
            }
        }
        squares[colIndex] = row
    }
    return squares
}

export function updateBoardAfterMarkerPlaced(squares) {
    squares = squares.slice()
    return updateVerticaly(squares)
}

export default class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        squares: Array(9).fill(null),
        xIsNext: true,
        };
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
        return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext,
        });
    }

    renderSquare(i) {
        return (
        <Square
            value={this.state.squares[i]}
            onClick={() => this.handleClick(i)}
        />
        );
    }

    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
        status = 'Winner: ' + winner;
        } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        let rows = []
        for (let i = 0; i < 8; i++) {
            let col = []
            for (let y = 0; y < 8; y++) {
            col.push(this.renderSquare(i + y))
            }
            rows.push(<div className="board-row">{col}</div>)
        }
        return (
        <div>
            <div className="status">{status}</div>
            {rows}
        </div>
        );
    }
}