import { flipBoard, flipBetweenIndex, updateRow, calculateWinner, updateBoardAfterMarkerPlaced, arrayStuff, updateDiagonaly } from './Board'

describe('Board', () => {

    it('If there is only X on the board then X is the winner', () => {
        const board = Array(9).fill('X')
        const winner = calculateWinner(board)
        expect(winner).toBe('X')
    });

    describe('updateRow', () => {
        it('O should be converted to X if there are Xs on each side', () => {
            const row = [null, 'X', 'O', 'O', 'X', null]
            const rowUpdated = updateRow(row)
            expect(rowUpdated).toEqual([null, 'X', 'X', 'X', 'X', null])
        });
        it('O should be converted to X if there are Xs on each side', () => {
            const row = [null, 'X', 'O', 'X', 'X', null]
            const rowUpdated = updateRow(row)
            expect(rowUpdated).toEqual([null, 'X', 'X', 'X', 'X', null])
        });
        it('X should be converted to O if there are Os on each side', () => {
            const row = ['O', 'X', 'O', 'X', 'X', 'O']
            const rowUpdated = updateRow(row)
            expect(rowUpdated).toEqual(['O', 'O', 'O', 'O', 'O', 'O'])
        });
    })

    describe('flipBetweenIndex', () => {
        it('O should be converted to X if there are Xs on each side', () => {
            const row = [null, 'X', 'O', 'O', 'X', null]
            const rowUpdated = flipBetweenIndex(1, 4, row, 'X')
            expect(rowUpdated).toEqual([null, 'X', 'X', 'X', 'X', null])
        });
    })

    describe('flipBoard', () => {
        it('make rows become colls', () => {
            const board = 
                [
                    ['X', 'X'],
                    ['O', 'O']
                ]
            const flippedBoard = flipBoard(board)
            expect(flippedBoard).toEqual(
                [
                    ['X', 'O'],
                    ['X', 'O']
                ])
        });
        it('make rows become colls', () => {
            const board = 
                [
                    ['O', 'X', 'X'],
                    ['X', 'X', 'O'],
                    ['O', 'O', 'O']
                ]
            const flippedBoard = flipBoard(board)
            expect(flippedBoard).toEqual(
                [
                    ['O', 'X', 'O'],
                    ['X', 'X', 'O'],
                    ['X', 'O', 'O']
                ])
        });
        it('make rows become colls', () => {
            const board = 
                [
                    [null, 'X'],
                    ['O', 'O']
                ]
            const flippedBoard = flipBoard(board)
            expect(flippedBoard).toEqual(
                [
                    [null, 'O'],
                    ['X', 'O']
                ])
        });
        it('make rows become colls', () => {
            const board = 
                [
                    [null, 'X', null],
                    ['O', 'O', null],
                    ['X', 'O', null]
                ]
            const flippedBoard = flipBoard(board)
            expect(flippedBoard).toEqual(
                [
                    [null, 'O', 'X'],
                    ['X', 'O', 'O'],
                    [null, null, null]
                ])
        });
    })
    describe('updateBoardAfterMarkerPlaced', () => {
        it('horizontal flip', () => {
            const board = 
                [
                    ['O', 'X', 'O'],
                    [null, null, null],
                    [null, null, null]
                ]
            const updatedBoard = updateBoardAfterMarkerPlaced(board)
            expect(updatedBoard).toEqual(
                [
                    ['O', 'O', 'O'],
                    [null, null, null],
                    [null, null, null]
                ])
        });
        it('vertical flip', () => {
            const board = 
                [
                    ['O', null, null],
                    ['X', null, null],
                    ['O', null, null]
                ]
            const updatedBoard = updateBoardAfterMarkerPlaced(board)
            expect(updatedBoard).toEqual(
                [
                    ['O', null, null],
                    ['O', null, null],
                    ['O', null, null]
                ])
        });
        it('no flip', () => {
            const board = 
                [
                    ['X', 'O', 'O'],
                    ['X', 'X', null],
                    ['O', null, null]
                ]
            const updatedBoard = updateBoardAfterMarkerPlaced(board)
            expect(updatedBoard).toEqual(
                [
                    ['X', 'O', 'O'],
                    ['X', 'X', null],
                    ['O', null, null]
                ])
        });
        it('flip', () => {
            const board = 
                [
                    ['X', 'O', 'O'],
                    ['X', 'X', null],
                    ['O', 'O', null]
                ]
            const updatedBoard = updateBoardAfterMarkerPlaced(board)
            expect(updatedBoard).toEqual(
                [
                    ['X', 'O', 'O'],
                    ['X', 'O', null],
                    ['O', 'O', null]
                ])
        });
    })
    describe('updateBoardDiagonaly', () => {
        it('XOX --> XXX', () => {
            const board = 
                [
                    ['X', null, null],
                    [null, 'O', null],
                    [null, null, 'X']
                ]
            const updatedBoard = updateDiagonaly(board)
            expect(updatedBoard).toEqual(
                [
                    ['X', null, null],
                    [null, 'X', null],
                    [null, null, 'X']
                ])
        });
        it('XOOX --> XXXX', () => {
            const board = 
                [
                    ['X', null, null, null],
                    [null, 'O', null, null],
                    [null, null, 'O', null],
                    [null, null, null, 'X']
                ]
            const updatedBoard = updateDiagonaly(board)
            expect(updatedBoard).toEqual(
                [
                    ['X', null, null, null],
                    [null, 'X', null, null],
                    [null, null, 'X', null],
                    [null, null, null, 'X']
                ])
        });
        it('XOX --> XXX', () => {
            const board = 
                [
                    [null, 'X', null, null],
                    [null, null, 'O', null],
                    [null, null, null, 'X'],
                    [null, null, null, null]
                ]
            const updatedBoard = updateDiagonaly(board)
            expect(updatedBoard).toEqual(
                [
                    [null, 'X', null, null],
                    [null, null, 'X', null],
                    [null, null, null, 'X'],
                    [null, null, null, null]
                ])
        });
        it('XOX --> XXX', () => {
            const board = 
                [
                    [null, 'X', null, null],
                    ['X', null, 'O', null],
                    [null, 'O', null, 'X'],
                    [null, null, 'X', null]
                ]
            const updatedBoard = updateDiagonaly(board)
            expect(updatedBoard).toEqual(
                [
                    [null, 'X', null, null],
                    ['X', null, 'X', null],
                    [null, 'X', null, 'X'],
                    [null, null, 'X', null]
                ])
        });
        it('XOX --> XXX', () => {
            const board = 
                [
                    [null, null, 'X', null],
                    [null, 'O', null, 'X'],
                    ['X', null, 'O', null],
                    [null, 'X', null, null]
                ]
            const updatedBoard = updateDiagonaly(board)
            expect(updatedBoard).toEqual(
                [
                    [null, null, 'X', null],
                    [null, 'X', null, 'X'],
                    ['X', null, 'X', null],
                    [null, 'X', null, null]
                ])
        });
    });
})
