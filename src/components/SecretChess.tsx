import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, RotateCcw, Settings, User, Bot, Trophy, ChevronLeft, Play, Undo2 } from 'lucide-react';

// --- Chess Logic Constants ---
const PIECES = {
  EMPTY: 0,
  W_PAWN: 1, W_KNIGHT: 2, W_BISHOP: 3, W_ROOK: 4, W_QUEEN: 5, W_KING: 6,
  B_PAWN: 7, B_KNIGHT: 8, B_BISHOP: 9, B_ROOK: 10, B_QUEEN: 11, B_KING: 12
};

const PIECE_SYMBOLS: Record<number, string> = {
  [PIECES.W_PAWN]: '♙', [PIECES.W_KNIGHT]: '♘', [PIECES.W_BISHOP]: '♗', [PIECES.W_ROOK]: '♖', [PIECES.W_QUEEN]: '♕', [PIECES.W_KING]: '♔',
  [PIECES.B_PAWN]: '♟', [PIECES.B_KNIGHT]: '♞', [PIECES.B_BISHOP]: '♝', [PIECES.B_ROOK]: '♜', [PIECES.B_QUEEN]: '♛', [PIECES.B_KING]: '♚',
  [PIECES.EMPTY]: ''
};

const PIECE_VALUES: Record<number, number> = {
  [PIECES.W_PAWN]: 100, [PIECES.W_KNIGHT]: 320, [PIECES.W_BISHOP]: 330, [PIECES.W_ROOK]: 500, [PIECES.W_QUEEN]: 900, [PIECES.W_KING]: 20000,
  [PIECES.B_PAWN]: -100, [PIECES.B_KNIGHT]: -320, [PIECES.B_BISHOP]: -330, [PIECES.B_ROOK]: -500, [PIECES.B_QUEEN]: -900, [PIECES.B_KING]: -20000,
  [PIECES.EMPTY]: 0
};

// Position-based evaluation tables (simplified)
const PST: Record<number, number[][]> = {
  [PIECES.W_PAWN]: [
    [0,  0,  0,  0,  0,  0,  0,  0],
    [50, 50, 50, 50, 50, 50, 50, 50],
    [10, 10, 20, 30, 30, 20, 10, 10],
    [5,  5, 10, 25, 25, 10,  5,  5],
    [0,  0,  0, 20, 20,  0,  0,  0],
    [5, -5,-10,  0,  0,-10, -5,  5],
    [5, 10, 10,-20,-20, 10, 10,  5],
    [0,  0,  0,  0,  0,  0,  0,  0]
  ],
  // ... others can be added for better AI
};

type Board = number[]; // 64 elements
type Move = { from: number; to: number; promotion?: number; castling?: boolean; enPassant?: boolean };

interface GameState {
  board: Board;
  turn: 'white' | 'black';
  history: Move[];
  castlingRights: { wK: boolean; wQ: boolean; bK: boolean; bQ: boolean };
  enPassantTarget: number | null;
  halfmoveClock: number;
  fullmoveNumber: number;
  status: 'playing' | 'checkmate' | 'stalemate' | 'draw';
  winner: 'white' | 'black' | 'draw' | null;
  check: boolean;
}

// --- Helper Functions ---
const createInitialBoard = (): Board => {
  const board = new Array(64).fill(PIECES.EMPTY);
  const backRank = [PIECES.W_ROOK, PIECES.W_KNIGHT, PIECES.W_BISHOP, PIECES.W_QUEEN, PIECES.W_KING, PIECES.W_BISHOP, PIECES.W_KNIGHT, PIECES.W_ROOK];
  
  // Black pieces
  for (let i = 0; i < 8; i++) {
    board[i] = backRank[i] + 6;
    board[i + 8] = PIECES.B_PAWN;
  }
  
  // White pieces
  for (let i = 0; i < 8; i++) {
    board[i + 48] = PIECES.W_PAWN;
    board[i + 56] = backRank[i];
  }
  
  return board;
};

const getPieceColor = (piece: number): 'white' | 'black' | null => {
  if (piece === PIECES.EMPTY) return null;
  return piece <= 6 ? 'white' : 'black';
};

const getXY = (index: number) => ({ x: index % 8, y: Math.floor(index / 8) });
const getIndex = (x: number, y: number) => y * 8 + x;

// --- Move Generation ---
const getLegalMoves = (state: GameState, fromIndex: number): Move[] => {
  const piece = state.board[fromIndex];
  if (piece === PIECES.EMPTY) return [];
  
  const color = getPieceColor(piece);
  if (color !== state.turn) return [];

  const moves: Move[] = [];
  const { x, y } = getXY(fromIndex);

  const addMove = (toX: number, toY: number) => {
    if (toX < 0 || toX > 7 || toY < 0 || toY > 7) return false;
    const toIndex = getIndex(toX, toY);
    const targetPiece = state.board[toIndex];
    const targetColor = getPieceColor(targetPiece);

    if (targetColor === color) return false;
    
    // Check if move is legal (doesn't leave king in check)
    if (!isMoveLeavingKingInCheck(state, fromIndex, toIndex)) {
      moves.push({ from: fromIndex, to: toIndex });
    }
    
    return targetPiece === PIECES.EMPTY; // Continue sliding if empty
  };

  // Simplified move generation for brevity
  // In a real app, this would be exhaustive
  const pieceType = piece <= 6 ? piece : piece - 6;

  switch (pieceType) {
    case PIECES.W_PAWN: {
      const dir = color === 'white' ? -1 : 1;
      // Forward
      if (state.board[getIndex(x, y + dir)] === PIECES.EMPTY) {
        if (!isMoveLeavingKingInCheck(state, fromIndex, getIndex(x, y + dir))) {
          moves.push({ from: fromIndex, to: getIndex(x, y + dir) });
        }
        // Double move
        if ((color === 'white' && y === 6) || (color === 'black' && y === 1)) {
          if (state.board[getIndex(x, y + 2 * dir)] === PIECES.EMPTY) {
            if (!isMoveLeavingKingInCheck(state, fromIndex, getIndex(x, y + 2 * dir))) {
              moves.push({ from: fromIndex, to: getIndex(x, y + 2 * dir) });
            }
          }
        }
      }
      // Captures
      [-1, 1].forEach(dx => {
        const nx = x + dx;
        const ny = y + dir;
        if (nx >= 0 && nx <= 7) {
          const targetIdx = getIndex(nx, ny);
          const target = state.board[targetIdx];
          if (target !== PIECES.EMPTY && getPieceColor(target) !== color) {
            if (!isMoveLeavingKingInCheck(state, fromIndex, targetIdx)) {
              moves.push({ from: fromIndex, to: targetIdx });
            }
          }
          // En Passant
          if (targetIdx === state.enPassantTarget) {
             if (!isMoveLeavingKingInCheck(state, fromIndex, targetIdx)) {
              moves.push({ from: fromIndex, to: targetIdx, enPassant: true });
            }
          }
        }
      });
      break;
    }
    case PIECES.W_KNIGHT: {
      const jumps = [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]];
      jumps.forEach(([dx, dy]) => addMove(x + dx, y + dy));
      break;
    }
    case PIECES.W_BISHOP: {
      const dirs = [[-1,-1],[-1,1],[1,-1],[1,1]];
      dirs.forEach(([dx, dy]) => {
        for (let i = 1; i < 8; i++) if (!addMove(x + dx * i, y + dy * i)) break;
      });
      break;
    }
    case PIECES.W_ROOK: {
      const dirs = [[0,-1],[0,1],[-1,0],[1,0]];
      dirs.forEach(([dx, dy]) => {
        for (let i = 1; i < 8; i++) if (!addMove(x + dx * i, y + dy * i)) break;
      });
      break;
    }
    case PIECES.W_QUEEN: {
      const dirs = [[-1,-1],[-1,1],[1,-1],[1,1],[0,-1],[0,1],[-1,0],[1,0]];
      dirs.forEach(([dx, dy]) => {
        for (let i = 1; i < 8; i++) if (!addMove(x + dx * i, y + dy * i)) break;
      });
      break;
    }
    case PIECES.W_KING: {
      const dirs = [[-1,-1],[-1,1],[1,-1],[1,1],[0,-1],[0,1],[-1,0],[1,0]];
      dirs.forEach(([dx, dy]) => addMove(x + dx, y + dy));
      // Castling logic would go here
      break;
    }
  }

  return moves;
};

const isMoveLeavingKingInCheck = (state: GameState, from: number, to: number): boolean => {
  const newBoard = [...state.board];
  newBoard[to] = newBoard[from];
  newBoard[from] = PIECES.EMPTY;
  return isKingInCheck(newBoard, state.turn);
};

const isKingInCheck = (board: Board, color: 'white' | 'black'): boolean => {
  const kingPiece = color === 'white' ? PIECES.W_KING : PIECES.B_KING;
  const kingPos = board.indexOf(kingPiece);
  if (kingPos === -1) return false;

  const { x, y } = getXY(kingPos);
  const opponentColor = color === 'white' ? 'black' : 'white';

  // Check for attacks from opponent pieces
  // This is a simplified check for the demo
  // In a real implementation, we'd check all possible attack vectors (sliding, jumping, pawn)
  for (let i = 0; i < 64; i++) {
    const piece = board[i];
    if (piece !== PIECES.EMPTY && getPieceColor(piece) === opponentColor) {
      // If any opponent piece can move to kingPos, it's check
      // We use a simplified version here to avoid recursion
      if (canPieceAttack(board, i, kingPos)) return true;
    }
  }
  return false;
};

const canPieceAttack = (board: Board, from: number, to: number): boolean => {
  const piece = board[from];
  const { x: fx, y: fy } = getXY(from);
  const { x: tx, y: ty } = getXY(to);
  const dx = tx - fx;
  const dy = ty - fy;
  const adx = Math.abs(dx);
  const ady = Math.abs(dy);

  const pieceType = piece <= 6 ? piece : piece - 6;
  const color = getPieceColor(piece);

  switch (pieceType) {
    case PIECES.W_PAWN:
      const pDir = color === 'white' ? -1 : 1;
      return adx === 1 && dy === pDir;
    case PIECES.W_KNIGHT:
      return (adx === 1 && ady === 2) || (adx === 2 && ady === 1);
    case PIECES.W_BISHOP:
      if (adx !== ady) return false;
      return isPathClear(board, from, to);
    case PIECES.W_ROOK:
      if (adx !== 0 && ady !== 0) return false;
      return isPathClear(board, from, to);
    case PIECES.W_QUEEN:
      if (adx !== ady && adx !== 0 && ady !== 0) return false;
      return isPathClear(board, from, to);
    case PIECES.W_KING:
      return adx <= 1 && ady <= 1;
  }
  return false;
};

const isPathClear = (board: Board, from: number, to: number): boolean => {
  const { x: fx, y: fy } = getXY(from);
  const { x: tx, y: ty } = getXY(to);
  const dx = Math.sign(tx - fx);
  const dy = Math.sign(ty - fy);
  let cx = fx + dx;
  let cy = fy + dy;
  while (cx !== tx || cy !== ty) {
    if (board[getIndex(cx, cy)] !== PIECES.EMPTY) return false;
    cx += dx;
    cy += dy;
  }
  return true;
};

// --- AI (Minimax) ---
const evaluateBoard = (board: Board): number => {
  let score = 0;
  for (let i = 0; i < 64; i++) {
    score += PIECE_VALUES[board[i]];
    // Add PST values here for better AI
  }
  return score;
};

const minimax = (state: GameState, depth: number, alpha: number, beta: number, isMaximizing: boolean): { score: number; move?: Move } => {
  if (depth === 0) return { score: evaluateBoard(state.board) };

  const allMoves: Move[] = [];
  for (let i = 0; i < 64; i++) {
    if (getPieceColor(state.board[i]) === state.turn) {
      allMoves.push(...getLegalMoves(state, i));
    }
  }

  if (allMoves.length === 0) {
    if (isKingInCheck(state.board, state.turn)) return { score: isMaximizing ? -100000 : 100000 };
    return { score: 0 };
  }

  let bestMove: Move | undefined = undefined;
  if (isMaximizing) {
    let maxScore = -Infinity;
    for (const move of allMoves) {
      const nextState = applyMove(state, move);
      const { score } = minimax(nextState, depth - 1, alpha, beta, false);
      if (score > maxScore) {
        maxScore = score;
        bestMove = move;
      }
      alpha = Math.max(alpha, score);
      if (beta <= alpha) break;
    }
    return { score: maxScore, move: bestMove };
  } else {
    let minScore = Infinity;
    for (const move of allMoves) {
      const nextState = applyMove(state, move);
      const { score } = minimax(nextState, depth - 1, alpha, beta, true);
      if (score < minScore) {
        minScore = score;
        bestMove = move;
      }
      beta = Math.min(beta, score);
      if (beta <= alpha) break;
    }
    return { score: minScore, move: bestMove };
  }
};

const applyMove = (state: GameState, move: Move): GameState => {
  const newBoard = [...state.board];
  const piece = newBoard[move.from];
  
  // Handle promotion
  if ((piece === PIECES.W_PAWN && Math.floor(move.to / 8) === 0) || (piece === PIECES.B_PAWN && Math.floor(move.to / 8) === 7)) {
    newBoard[move.to] = state.turn === 'white' ? PIECES.W_QUEEN : PIECES.B_QUEEN;
  } else {
    newBoard[move.to] = piece;
  }
  
  newBoard[move.from] = PIECES.EMPTY;

  // Handle En Passant capture
  if (move.enPassant) {
    const captureIdx = getIndex(move.to % 8, move.from / 8 | 0);
    newBoard[captureIdx] = PIECES.EMPTY;
  }

  const nextTurn = state.turn === 'white' ? 'black' : 'white';
  
  // Check for game status
  const isCheck = isKingInCheck(newBoard, nextTurn);
  
  return {
    ...state,
    board: newBoard,
    turn: nextTurn,
    history: [...state.history, move],
    check: isCheck,
    enPassantTarget: (piece === PIECES.W_PAWN || piece === PIECES.B_PAWN) && Math.abs(move.from - move.to) === 16 
      ? (move.from + move.to) / 2 
      : null
  };
};

// --- Components ---

interface SecretChessProps {
  onClose: () => void;
}

export default function SecretChess({ onClose }: SecretChessProps) {
  const [screen, setScreen] = useState<'menu' | 'settings' | 'game'>('menu');
  const [mode, setMode] = useState<'ai' | 'pvp'>('ai');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [timeLimit, setTimeLimit] = useState<number | null>(null); // minutes
  const [playerColor, setPlayerColor] = useState<'white' | 'black' | 'random'>('white');
  
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [historyStates, setHistoryStates] = useState<GameState[]>([]);
  const [selectedSquare, setSelectedSquare] = useState<number | null>(null);
  const [validMoves, setValidMoves] = useState<Move[]>([]);
  const [timers, setTimers] = useState<{ white: number; black: number }>({ white: 0, black: 0 });
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startGame = () => {
    const initialBoard = createInitialBoard();
    const actualColor = playerColor === 'random' ? (Math.random() > 0.5 ? 'white' : 'black') : playerColor;
    
    setGameState({
      board: initialBoard,
      turn: 'white',
      history: [],
      castlingRights: { wK: true, wQ: true, bK: true, bQ: true },
      enPassantTarget: null,
      halfmoveClock: 0,
      fullmoveNumber: 1,
      status: 'playing',
      winner: null,
      check: false
    });
    setHistoryStates([]);
    
    if (timeLimit) {
      setTimers({ white: timeLimit * 60, black: timeLimit * 60 });
    }
    
    setScreen('game');
  };

  useEffect(() => {
    if (gameState?.status === 'playing' && timeLimit) {
      timerRef.current = setInterval(() => {
        setTimers(prev => ({
          ...prev,
          [gameState.turn]: Math.max(0, prev[gameState.turn] - 1)
        }));
      }, 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [gameState?.turn, gameState?.status]);

  // AI Turn
  useEffect(() => {
    if (mode === 'ai' && gameState?.turn === 'black' && gameState.status === 'playing') {
      const depth = difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3;
      setTimeout(() => {
        const { move } = minimax(gameState, depth, -Infinity, Infinity, false);
        if (move) {
          handleMove(move);
        } else {
          // Checkmate or Stalemate
          const isCheck = isKingInCheck(gameState.board, 'black');
          setGameState(prev => ({
            ...prev!,
            status: isCheck ? 'checkmate' : 'stalemate',
            winner: isCheck ? 'white' : null
          }));
        }
      }, 500);
    }
  }, [gameState?.turn]);

  const handleSquareClick = (index: number) => {
    if (!gameState || gameState.status !== 'playing') return;
    if (mode === 'ai' && gameState.turn === 'black') return;

    const piece = gameState.board[index];
    const color = getPieceColor(piece);

    // If a move is selected
    const move = validMoves.find(m => m.to === index);
    if (move) {
      handleMove(move);
      return;
    }

    // Select piece
    if (color === gameState.turn) {
      setSelectedSquare(index);
      setValidMoves(getLegalMoves(gameState, index));
    } else {
      setSelectedSquare(null);
      setValidMoves([]);
    }
  };

  const handleMove = (move: Move) => {
    setHistoryStates(prev => [...prev, JSON.parse(JSON.stringify(gameState))]);
    const nextState = applyMove(gameState!, move);
    
    // Check for game end
    const opponentMoves: Move[] = [];
    for (let i = 0; i < 64; i++) {
      if (getPieceColor(nextState.board[i]) === nextState.turn) {
        opponentMoves.push(...getLegalMoves(nextState, i));
      }
    }

    if (opponentMoves.length === 0) {
      const isCheck = isKingInCheck(nextState.board, nextState.turn);
      nextState.status = isCheck ? 'checkmate' : 'stalemate';
      nextState.winner = isCheck ? (nextState.turn === 'white' ? 'black' : 'white') : null;
    }

    setGameState(nextState);
    setSelectedSquare(null);
    setValidMoves([]);
  };

  const undoMove = () => {
    if (historyStates.length === 0) return;
    
    const newHistory = [...historyStates];
    let prevState = newHistory.pop();
    
    // In AI mode, if it's player's turn, we need to undo both AI move and player move
    if (mode === 'ai' && gameState?.turn === 'white' && newHistory.length > 0) {
      prevState = newHistory.pop();
    }
    
    if (prevState) {
      setGameState(prevState);
      setHistoryStates(newHistory);
      setSelectedSquare(null);
      setValidMoves([]);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-[200] bg-[#0F172A] flex flex-col items-center justify-center overflow-hidden font-sans">
      <AnimatePresence mode="wait">
        {screen === 'menu' && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-md p-8 space-y-8 text-center"
          >
            <div className="space-y-2">
              <div className="text-7xl mb-4">♟</div>
              <h1 className="text-4xl font-black text-white tracking-tighter">SECRET CHESS</h1>
              <p className="text-gray-400 text-sm">Permainan catur tersembunyi untuk para master.</p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => { setMode('ai'); startGame(); }}
                className="w-full py-5 bg-[#1A9E5C] text-white rounded-2xl font-bold text-lg shadow-xl shadow-[#1A9E5C]/20 flex items-center justify-center gap-3 active:scale-95 transition-all"
              >
                <Bot size={24} />
                PLAY VS AI
              </button>
              <button
                onClick={() => { setMode('pvp'); startGame(); }}
                className="w-full py-5 bg-white/5 text-white rounded-2xl font-bold text-lg border border-white/10 flex items-center justify-center gap-3 active:scale-95 transition-all"
              >
                <User size={24} />
                PLAY 1 VS 1
              </button>
              <button
                onClick={() => setScreen('settings')}
                className="w-full py-4 text-gray-400 font-bold text-sm flex items-center justify-center gap-2"
              >
                <Settings size={18} />
                SETTINGS
              </button>
            </div>

            <button onClick={onClose} className="text-gray-600 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors">
              EXIT GAME
            </button>
          </motion.div>
        )}

        {screen === 'settings' && (
          <motion.div
            key="settings"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full max-w-md p-8 space-y-8"
          >
            <div className="flex items-center gap-4">
              <button onClick={() => setScreen('menu')} className="p-2 bg-white/5 rounded-xl text-white">
                <ChevronLeft size={24} />
              </button>
              <h2 className="text-2xl font-bold text-white">Settings</h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Waktu Per Pemain</label>
                <div className="grid grid-cols-3 gap-2">
                  {[null, 1, 3, 5, 10].map(t => (
                    <button
                      key={t === null ? 'none' : t}
                      onClick={() => setTimeLimit(t)}
                      className={`py-3 rounded-xl text-xs font-bold transition-all ${timeLimit === t ? 'bg-[#1A9E5C] text-white' : 'bg-white/5 text-gray-400 border border-white/5'}`}
                    >
                      {t === null ? 'Tanpa Waktu' : `${t} Menit`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Level AI</label>
                <div className="grid grid-cols-3 gap-2">
                  {['easy', 'medium', 'hard'].map(l => (
                    <button
                      key={l}
                      onClick={() => setDifficulty(l as any)}
                      className={`py-3 rounded-xl text-xs font-bold capitalize transition-all ${difficulty === l ? 'bg-[#1A9E5C] text-white' : 'bg-white/5 text-gray-400 border border-white/5'}`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Warna Bidak</label>
                <div className="grid grid-cols-3 gap-2">
                  {['white', 'black', 'random'].map(c => (
                    <button
                      key={c}
                      onClick={() => setPlayerColor(c as any)}
                      className={`py-3 rounded-xl text-xs font-bold capitalize transition-all ${playerColor === c ? 'bg-[#1A9E5C] text-white' : 'bg-white/5 text-gray-400 border border-white/5'}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setScreen('menu')}
              className="w-full py-4 bg-white text-[#0F172A] rounded-2xl font-bold"
            >
              SIMPAN & KEMBALI
            </button>
          </motion.div>
        )}

        {screen === 'game' && gameState && (
          <motion.div
            key="game"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full h-full flex flex-col items-center justify-between p-6"
          >
            {/* Top Info */}
            <div className="w-full flex items-center justify-between">
              <div className={`flex items-center gap-3 p-3 rounded-2xl transition-all ${gameState.turn === 'black' ? 'bg-white/10 ring-2 ring-[#1A9E5C]' : 'opacity-50'}`}>
                <div className="w-10 h-10 bg-black rounded-xl border border-white/10 flex items-center justify-center text-white text-xl">
                  {mode === 'ai' ? <Bot size={20} /> : <User size={20} />}
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase">HITAM</p>
                  <p className="text-sm font-bold text-white">{timeLimit ? formatTime(timers.black) : '∞'}</p>
                </div>
              </div>
              
              <button onClick={() => setScreen('menu')} className="p-3 bg-white/5 text-gray-400 rounded-2xl">
                <X size={24} />
              </button>
            </div>

            {/* Board */}
            <div 
              className="relative aspect-square w-full max-w-[400px] bg-[#2D3748] rounded-xl overflow-hidden shadow-2xl border-8 border-[#1E293B] transition-transform duration-700"
              style={{ transform: mode === 'pvp' && gameState.turn === 'black' ? 'rotate(180deg)' : 'rotate(0deg)' }}
            >
              <div className="grid grid-cols-8 grid-rows-8 w-full h-full">
                {gameState.board.map((piece, i) => {
                  const { x, y } = getXY(i);
                  const isDark = (x + y) % 2 === 1;
                  const isSelected = selectedSquare === i;
                  const isValidMove = validMoves.some(m => m.to === i);
                  const isCheck = piece === (gameState.turn === 'white' ? PIECES.W_KING : PIECES.B_KING) && gameState.check;

                  return (
                    <div
                      key={i}
                      onClick={() => handleSquareClick(i)}
                      className={`relative flex items-center justify-center text-4xl cursor-pointer transition-colors ${
                        isDark ? 'bg-[#4A5568]' : 'bg-[#CBD5E0]'
                      } ${isSelected ? 'bg-yellow-400/50' : ''} ${isCheck ? 'bg-red-500/50' : ''}`}
                    >
                      {isValidMove && (
                        <div className={`w-3 h-3 rounded-full ${piece === PIECES.EMPTY ? 'bg-black/20' : 'bg-red-500/40'}`} />
                      )}
                      <span 
                        className={`select-none transition-transform ${getPieceColor(piece) === 'white' ? 'text-white drop-shadow-md' : 'text-black'}`}
                        style={{ transform: mode === 'pvp' && gameState.turn === 'black' ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      >
                        {PIECE_SYMBOLS[piece]}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Status Overlay */}
              <AnimatePresence>
                {gameState.status !== 'playing' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center text-center p-8 space-y-4"
                  >
                    <Trophy size={64} className="text-yellow-400" />
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
                      {gameState.status === 'checkmate' ? 'CHECKMATE!' : 'DRAW!'}
                    </h2>
                    <p className="text-gray-400 font-bold">
                      {gameState.winner ? `PEMAIN ${gameState.winner.toUpperCase()} MENANG!` : 'PERMAINAN BERAKHIR SERI'}
                    </p>
                    <button
                      onClick={startGame}
                      className="px-8 py-4 bg-[#1A9E5C] text-white rounded-2xl font-bold flex items-center gap-2"
                    >
                      <RotateCcw size={20} />
                      MAIN LAGI
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Info */}
            <div className="w-full flex items-center justify-between">
              <div className={`flex items-center gap-3 p-3 rounded-2xl transition-all ${gameState.turn === 'white' ? 'bg-white/10 ring-2 ring-[#1A9E5C]' : 'opacity-50'}`}>
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#0F172A] text-xl">
                  <User size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase">PUTIH</p>
                  <p className="text-sm font-bold text-white">{timeLimit ? formatTime(timers.white) : '∞'}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={undoMove}
                  disabled={historyStates.length === 0 || gameState.status !== 'playing'}
                  className={`p-3 rounded-2xl border transition-all ${
                    historyStates.length === 0 || gameState.status !== 'playing'
                      ? 'bg-white/5 text-gray-600 border-white/5'
                      : 'bg-white/10 text-white border-white/10 hover:bg-white/20'
                  }`}
                >
                  <Undo2 size={24} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
