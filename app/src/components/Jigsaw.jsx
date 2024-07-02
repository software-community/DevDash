import React, { useState } from 'react';
import png2 from '../assets/2.png';
import png3 from '../assets/3.png';
import png4 from '../assets/4.png';
import png5 from '../assets/5.png';
import png6 from '../assets/6.png';
import png7 from '../assets/7.png';
import png8 from '../assets/8.png';
import png9 from '../assets/9.png';

const PuzzleGame = () => {
    const [rows, columns] = [3, 3];
    const [board, setBoard] = useState([
        [png4, png2, png8],
        [png5, null, png6], // Replace png1 with null for empty space
        [png7, png9, png3]
    ]);
    const [turns, setTurns] = useState(0);

    const emptyPiece = {
        color: '#CCCCCC', // Solid color for empty piece
        number: '' // Empty string or null for the number display
    };

    const handleMovePiece = (selectedRow, selectedCol) => {
        let emptyRow, emptyCol;
        board.forEach((row, rowIndex) => {
            row.forEach((piece, colIndex) => {
                if (!piece) {
                    emptyRow = rowIndex;
                    emptyCol = colIndex;
                }
            });
        });

        if (canMovePiece(selectedRow, selectedCol, emptyRow, emptyCol)) {
            const newBoard = [...board];
            [newBoard[selectedRow][selectedCol], newBoard[emptyRow][emptyCol]] = [
                newBoard[emptyRow][emptyCol],
                newBoard[selectedRow][selectedCol]
            ];
            setBoard(newBoard);
            setTurns(turns + 1);
        }
    };

    const canMovePiece = (selectedRow, selectedCol, emptyRow, emptyCol) => {
        return (
            (selectedRow === emptyRow && Math.abs(selectedCol - emptyCol) === 1) ||
            (selectedCol === emptyCol && Math.abs(selectedRow - emptyRow) === 1)
        );
    };

    const handlePieceSelect = (event) => {
        const selectedPieceIndex = parseInt(event.target.value) - 1; // Convert to zero-indexed
        if (!isNaN(selectedPieceIndex) && selectedPieceIndex >= 0 && selectedPieceIndex < 9) {
            const selectedPiece = board.flat()[selectedPieceIndex];
            const [selectedRow, selectedCol] = findPieceCoordinates(selectedPiece);
            handleMovePiece(selectedRow, selectedCol);
        }
    };

    const findPieceCoordinates = (piece) => {
        let row, col;
        board.forEach((boardRow, rowIndex) => {
            boardRow.forEach((boardPiece, colIndex) => {
                if (boardPiece === piece) {
                    row = rowIndex;
                    col = colIndex;
                }
            });
        });
        return [row, col];
    };

    return (
        <div className="flex flex-col items-center">
            <div id="board" className="w-full aspect-w-1 aspect-h-1 border-4 flex flex-wrap">
                {board.map((row, rowIndex) =>
                    row.map((piece, colIndex) => (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            className="w-1/3 h-1/3 flex items-center justify-center relative"
                            onClick={() => handleMovePiece(rowIndex, colIndex)}
                            style={{ cursor: 'pointer', backgroundColor: piece ? 'transparent' : emptyPiece.color }}
                        >
                            {piece && (
                                <img
                                    src={piece}
                                    alt={`Tile ${rowIndex * columns + colIndex + 1}`}
                                    className="w-full h-full object-cover"
                                    draggable="false"
                                />
                            )}
                            {!piece && (
                                <div className="w-full h-full flex items-center justify-center">
                                    <span className="text-gray-800 font-bold text-2xl">
                                        {emptyPiece.number}
                                    </span>
                                </div>
                            )}
                            {piece && (
                                <span className="absolute bottom-0 right-0 bg-white text-gray-800 p-1 rounded-md">
                                    {rowIndex * columns + colIndex + 1}
                                </span>
                            )}
                        </div>
                    ))
                )}
            </div>
            <div className="mt-4">
                <label htmlFor="pieceSelect">Select Piece to Move:</label>
                <select
                    id="pieceSelect"
                    onChange={handlePieceSelect}
                    className="ml-2 p-2 border-2 border-gray-300 rounded-lg"
                >
                    <option value="">Select Piece</option>
                    {[...Array(9)].map((_, index) => (
                        <option key={index + 1} value={index + 1}>
                            {index + 1}
                        </option>
                    ))}
                </select>
            </div>
            <div id="turns" className="mt-4">Turns: {turns}</div>
        </div>
    );
};

export default PuzzleGame;
