
import React from 'react';
import * as gameLogic from './gameLogic'
import '../index.css';

function Square(props) {
    return (
    <button className="square" onClick={props.onClick}>
        {props.value}
    </button>
    );
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
        const updatedSquares = gameLogic.updateBoardAfterMarkerPlaced(squares)
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
    
    click() {
        this.setState({
            squares: Array(9).fill(Array(9).fill(null)),
            xIsNext: true,
        });
    }

    render() {
        const winner = gameLogic.calculateWinner(this.state.squares);
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

            <button className="reset" onClick={() => this.click()}>
                Reset
            </button>
        </div>
        );
    }
}