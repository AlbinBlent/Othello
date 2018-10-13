import { calculateWinner, updateBoardAfterMarkerPlaced } from './Board'

it('If there is only X on the board then X is the winner', () => {
    const board = Array(9).fill('X')
    const winner = calculateWinner(board)
    expect(winner).toBe('X')
});

it('O should be converted to X if there are Xs on each side', () => {
    const board = [
        [null, 'X', 'O', 'O', 'X', null],
        [],
        [],
        [],
        [],
        [],
        [],
        []
    ]
    const updatedBoard = updateBoardAfterMarkerPlaced(board)
    expect(updatedBoard[0]).toEqual([null, 'X', 'X', 'X', 'X', null])
});
