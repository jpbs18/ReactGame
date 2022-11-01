import {createRoot} from "react-dom/client";
import {useState} from "react"

const domContainer = document.getElementById("app")
const root = createRoot(domContainer);


function checkWinner(board){

    const wins = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]

    for(let i = 0; i < wins.length; i++){
        const[a,b,c] = wins[i]
        if(board[a] && board[a] === board[b] && board[a] === board[c]) {
            return wins[i]
        }
    }
    return null;
}

function cleanButtons(){
    const buttons = document.querySelectorAll(".square")
    buttons.forEach( e => e.style.background = "white")
}

function Board(){

    const [board, setBoard] = useState(Array(9).fill(null))
    const [isX, setIsX] = useState(true)
    const [score, setScore] = useState([0,0])
    const [isOver, setIsOver] = useState(false)
    
    function handleReset(){
        setIsX(true)
        setBoard(Array(9).fill(null))
        setScore([0,0])
        setIsOver(false)
        cleanButtons()
    }

    function handlePlayAgain(){
        setIsX(true)
        setBoard(Array(9).fill(null))
        setIsOver(false)
        cleanButtons()
    }


    function handleClick(i){

        if(isOver) return;

        if(board[i] != null) return

        const copy = [...board]
        copy[i] = isX ? "X" : "O" ;

        setBoard(copy)
        setIsX(!isX)

        if(checkWinner(copy) != null){

            setIsOver(true)
            const letter = copy[checkWinner(copy)[0]]
            
            if(letter === "X") score[0]++;
            else score[1]++

            setScore(score)

            const buttons = document.querySelectorAll(".square")
            const buttonWin = [buttons[checkWinner(copy)[0]], buttons[checkWinner(copy) [1]], buttons[checkWinner(copy)[2]]]

            buttonWin.forEach( e => e.style.background = "lightgreen")
            
            return 
        }

    }


    return (
        <>
            <h1>Tic Tac Toe</h1>
        <div className="board">
            <Square value={board[0]} handleClick={() => handleClick(0)}/>
            <Square value={board[1]} handleClick={() => handleClick(1)}/>
            <Square value={board[2]} handleClick={() => handleClick(2)}/>
            <Square value={board[3]} handleClick={() => handleClick(3)}/>
            <Square value={board[4]} handleClick={() => handleClick(4)}/>
            <Square value={board[5]} handleClick={() => handleClick(5)}/>
            <Square value={board[6]} handleClick={() => handleClick(6)}/>
            <Square value={board[7]} handleClick={() => handleClick(7)}/>
            <Square value={board[8]} handleClick={() => handleClick(8)}/>
        </div>  
            <Score score1={score[0]} score2={score[1]}/>
            <Options handleReset={handleReset} handlePlayAgain={handlePlayAgain}/>
        </>
    )
    
}

function Square(props){
    const {value, handleClick} = props;

    return ( 
        <button className="square" type="button" onClick={() => handleClick()}>
            {value}
        </button>                                            
    )    
}

function Score({score1, score2}){

    return (
        <div className="score">
            <h2>P1 Score: {score1}</h2>
            <h2>P2 Score: {score2}</h2>
        </div>
    )
}

function Options(props){

    const {handleReset, handlePlayAgain} = props

    return (
        <div className="options">
            <button type="button" onClick={() => handleReset()}>Reset</button>
            <button type="button" onClick={() => handlePlayAgain()}>Play Again</button>
        </div>
    )
}
 
root.render(<Board/>)