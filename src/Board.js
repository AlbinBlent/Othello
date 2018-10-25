
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

export function flipBetweenIndex(indexFrom, indexTo, array, squareType) {
    array = array.slice()

    for (let indexToFlip = indexFrom; indexToFlip < indexTo; indexToFlip++) {
        array[indexToFlip] = squareType
    }
    return array
}

export function updateRow(row){
    row = row.slice()
    for (let index = 0; index < row.length; index++) {
        if (row[index]) {
            const firstNonNullElement = row[index]
            for (let indexRight = row.length; indexRight > index; indexRight--) {
                const elementFromTheRight = row[indexRight]
                if (firstNonNullElement === elementFromTheRight) {
                    return flipBetweenIndex(index, indexRight, row, firstNonNullElement)
                }
            }
        }
        
    }
    return row
}
/*
(0,2):  (1,3)
(0,1):  (2,3) -> (1,2)
(0,0):  (3,3) -> (2,2) -> (1,1)
(1,0):  (3,2) -> (2,1)
(2,0):  (3,1) 

i = 0 -> 1 -> 2 // tills y + i = length || x + i = length --> i < length - y
const elementToCompare = board[length - y - i][length - x - i]

  x ------>
y [O][O][X][X]
| [X][O][X][X]
| [X][X][O][X]
v [X][X][O][X]

(0,1): (1,0)
(0,2): (2,0) -> (1,1)
(0,3): (3,0) -> (2,1) -> (1,2)
(1,3): (3,1) -> (2,2)
(2,3): (3,2)

i = 0 -> 1 -> // while x < y - i
constElementToCompare = board[y - i][x + i]
*/

export function updateDiagonaly(board) {
    let resultBoard = board.slice()
    console.log(resultBoard)
    let flip = false
    const boardLength = board.length - 1
    const x = 0
    for (let y = 0; y < boardLength; y++) {
        const square = board[x].slice()[y]
        for (let i = 0; i < (boardLength - y); i++) {
            if (flip) {
                resultBoard[boardLength - y - i][boardLength - x - i] = square
            } else {
                const squareToCompare = board[boardLength - y - i][boardLength - x - i]
                flip = (square !== null && squareToCompare !== null && square === squareToCompare)
            }
        }
    }
    flip = false
    const y = 0
    for (let x = 0; x < boardLength; x++) {
        const square = board[x].slice()[y]
        for (let i = 0; i < (boardLength - x); i++) {
            if (flip) {
                resultBoard[boardLength - y - i][boardLength - x - i] = square
            } else {
                const squareToCompare = board[boardLength - y - i][boardLength - x - i]
                flip = (square !== null && squareToCompare !== null && square === squareToCompare)
            }
        }
    }
    flip = false
    const x2 = 0
    for (let y = 0; y < boardLength; y++) {
        const square = board[x2].slice()[y]
        for (let i = 0; i < y; i++) {
            if (flip) {
                resultBoard[y - i][x + i] = square
            } else {
                const squareToCompare = board[y - i][x + i]
                flip = (square !== null && squareToCompare !== null && square === squareToCompare)
            }
        }
    }
    flip = false
    const y2 = 0
    for (let x = 0; x < boardLength; x++) {
        const square = board[x].slice()[y2]
        for (let i = 0; i < (boardLength - x); i++) {
            if (flip) {
                resultBoard[boardLength - y2 - i][boardLength - x - i] = square
            } else {
                const squareToCompare = board[boardLength - y2 - i][boardLength - x - i]
                flip = (square !== null && squareToCompare !== null && square === squareToCompare)
            }
        }
    }
    console.log('--------')
    console.log(resultBoard)
    return resultBoard
}

function createBoard(length) {
    return Array(length).fill(Array(length).fill(null))
}

export function flipBoard(board) {
    board = board.slice()
    let flippedBoard = createBoard(board.length)
    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board.length; y++) {
            const value = board[x].slice()[y]
            let row = flippedBoard[y].slice()
            row[x] = value
            flippedBoard[y] = row.slice()
        }
    }
    return flippedBoard
}

export function updateBoardAfterMarkerPlaced(board) {
    const updatedHirizontal = board.map(row => updateRow(row))
    const flipped = flipBoard(updatedHirizontal)
    const updatedVerticaly = flipped.map(col => updateRow(col))
    const updatedBoard = flipBoard(updatedVerticaly)
    return updatedBoard
}

export default class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(Array(9).fill(null)),
            xIsNext: true,
        };
    }

    handleClick(x, y) {
        // ToDo man får bara placera bredvid andra redan placerade rutor
        const squares = this.state.squares.slice();
        const squaresX = this.state.squares[x].slice();
        squaresX[y] = this.state.xIsNext ? 'X' : 'O';
        squares[x] = squaresX
        const updatedSquares = updateBoardAfterMarkerPlaced(squares)
        this.setState({
            squares: updatedSquares,
            xIsNext: !this.state.xIsNext,
        });
    }

    renderSquare(x, y) {
        return (
        <Square
            value={this.state.squares[x][y]}
            onClick={() => this.handleClick(x, y)}
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
        for (let x = 0; x < 8; x++) {
            let col = []
            for (let y = 0; y < 8; y++) {
            col.push(this.renderSquare(x, y))
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