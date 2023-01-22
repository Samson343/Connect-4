
//area where player selects a column
let columnSelector = document.getElementById("columnSelector") 

//gathers arrays of elements for each row
let row1 = document.getElementById("row1").children
let row2 = document.getElementById("row2").children
let row3 = document.getElementById("row3").children
let row4 = document.getElementById("row4").children
let row5 = document.getElementById("row5").children
let row6 = document.getElementById("row6").children

//the full gameboard 
let arrayOfRows = [row1, row2, row3, row4, row5, row6]


//each td the player the can select which correspond with a column
let col1Selected = document.getElementById("column1")
let col2Selected = document.getElementById("column2")
let col3Selected = document.getElementById("column3")
let col4Selected = document.getElementById("column4")
let col5Selected = document.getElementById("column5")
let col6Selected = document.getElementById("column6")
let col7Selected = document.getElementById("column7")

//turn indicator in the upper right hand corner
let turnIndicator = document.getElementById("turnIndicator")

//adds arrow image when hovering over top of gameboard
columnSelector.addEventListener (
    'mouseover',
    downArrow
)

//adds arrow image when hovering over top of gameboard
function downArrow (event) {
    elem = event.target;

    if(elem.tagName == "TD") {
      elem.className = 'arrowBackground'

      //if clicked, background color will change starting at the bottom of the grid
      elem.addEventListener (
        'click',
        backgroundChanger
      )
      //when mouse no longer hovers, background image is removed
      elem.addEventListener (
        'mouseleave',
        function () {
            elem.classList.remove('arrowBackground')
      })
    }
}

//index where the computer will play on it's turn
let compColumnIdx
//counts turns to change the flashing message in the middle
let turnCounter = 0

//computer's turn
function computerTurn () {
    //clears intervals for the flashing animation, changes the turn indicator, and resets timers for intervals
    clearInterval(compThinking)
    clearInterval(compFlasher)
    computing.style.display = "none"
    turnIndicator.style.backgroundColor = "rgb(66, 76, 85)" 
    timer2 = 0
    timer = 0

    //if the bottom middle square is not played, play that square
    if (row6[3].className !== "playedSquare" && row6[3].className !== 'computerSquare') {
        compColumnIdx = 3
    }
    //if linechecker() assigns a value to comptactics, play at that index - otherwise play at a random column.
    else if (compTactics2 >= 0) {
        compColumnIdx = compTactics2
        console.log(compColumnIdx)
        compTactics2 = undefined
    } 
    else if (compTactics >= 0) {
        
        compColumnIdx = compTactics
        console.log(compColumnIdx)
        compTactics = undefined

    } else {
      compTactics = undefined
      compTactics2 = undefined
      compColumnIdx = Math.floor(Math.random() * 7)
    }

    //if the column is full, run the turn again to play a different square
    if (row1[compColumnIdx].className === 'playedSquare' || row1[compColumnIdx].className === 'computerSquare') {
        computerTurn()
    }

    //colors a square at the given index, starting at the bottom
    for (let i = 5; i >= 0; --i) {
        let curRow = arrayOfRows[i]
      
        if (curRow[compColumnIdx].className !== 'playedSquare' && curRow[compColumnIdx].className !== 'computerSquare') {
          curRow[compColumnIdx].className = "computerSquare"
          break;
        }
    }

    //changes up the flashing message in the middle just for fun
    turnCounter++
    let messageArray = ['plotting your inevetable destruction', 'installing malware', 'selling your personal data', "i really don't like you", "you're trying to draw a penis aren't you?"]

    if (turnCounter > 2 && turnCounter % 3 === 0) {
        computerMessage.innerText = messageArray[Math.floor(Math.random() * (messageArray.length))]
    }
    else if (turnCounter > 2) {
        computerMessage.innerText = 'computing next move'
    }

    //add this event listener back to the td's above the grid so the player can play again
    columnSelector.addEventListener(
      'mouseover',
      downArrow
    )
    //checks the board for a win
    boardChecker()
}

//generates the flashing message in the middle of the screen
let computerMessage = document.getElementById('computerMessage')
let computing = document.getElementById('computing')
let timer2 = 1

function computingFlasher () {

    if (timer2 % 2) {
      computing.style.display = "flex"
    }    
    
    else {
      computing.style.display = "none"
    }
    timer2++
}

//variables for intervals that need to be globally defined
let compThinking
let columnIdx
let compFlasher
let compTactics
let compTactics2

// colors the topmost square of any selected column, calls playRemover and initiates the computer turn
function backgroundChanger () {

    //sets the column index that corresponds with the column clicked by the player
    switch (elem) {
        case col1Selected:
            columnIdx = 0
        break;
        case col2Selected:
            columnIdx = 1
        break;
        case col3Selected:
            columnIdx = 2
        break;
        case col4Selected:
            columnIdx = 3
        break;
        case col5Selected:
            columnIdx = 4
        break;
         case col6Selected:
            columnIdx = 5
        break;
        case col7Selected:
            columnIdx = 6
        break;
    }

    //prematurely ends the function if a filled column is selected - this needs to be under the switch board and above playRemover()
    if (row1[columnIdx].className === 'playedSquare' || row1[columnIdx].className === 'computerSquare') {
        return
    }

    // calls a function that removes all event listeners that allow a player to play
    playRemover()

    // changes the turn indicator at the bottom of the screen
    turnIndicator.style.backgroundColor = "azure"

    //colors the bottom-most square of any selected column based on the switch statement above
    for (let i = 5; i >= 0; --i) {
        let curRow = arrayOfRows[i]
      
        if (curRow[columnIdx].className !== 'playedSquare' && curRow[columnIdx].className !== 'computerSquare') {
          curRow[columnIdx].className = "playedSquare"
          break;
        }
    }      
    
    //checks the board for a win, ends the function if the player wins
    if (boardChecker() === "playerWins") {
        return
    } else {
        // flashes a message between the player's turn and the computer's turn 
        compFlasher = setInterval(() => {
          computingFlasher()}, 
         400)

        let timer = 0
        // calls a function that initiates the computer's turn after a delay    
        compThinking = setInterval(function () {
           timer ++;

         if (timer >= 1) {
          computerTurn()
        }
        }, 3000)
    }
}

//removes all event listeners between turns
function playRemover () {

    columnSelector.removeEventListener(
        'mouseover',
        downArrow
    )
    col1Selected.removeEventListener (
        'click',
        backgroundChanger
    )
    col2Selected.removeEventListener (
        'click',
        backgroundChanger
    )
    col3Selected.removeEventListener (
        'click',
        backgroundChanger
    )
    col4Selected.removeEventListener (
        'click',
        backgroundChanger
    )
    col5Selected.removeEventListener (
        'click',
        backgroundChanger
    )
    col6Selected.removeEventListener (
        'click',
        backgroundChanger
    )
    col7Selected.removeEventListener (
        'click',
        backgroundChanger
    )
}

//turns the html collections into arrays that are the real deal
let row1Array = Array.from(row1)
let row2Array = Array.from(row2)
let row3Array = Array.from(row3)
let row4Array = Array.from(row4)
let row5Array = Array.from(row5)
let row6Array = Array.from(row6)

//gameboard as manipulatable arrays, needed this to use methods like indexOf in the function below
let megaRowArray = [row1Array, row2Array, row3Array, row4Array, row5Array, row6Array]

//checks any given array for 4 consecutive squares, gets called a dozen times each turn
function lineChecker (rowArray) {
    //seperate counters for consecutive player squares and computer squares
    let squareCounter = 0
    let compsquareCounter = 0

    //scans for a computer win
    for (let j = 0; j < rowArray.length; ++j) {
        let currentElem = rowArray[j]
        
        if (currentElem.className === "computerSquare") {
            compsquareCounter ++
        }
        //this is a win condition for the computer, lights up each square in the winning row and runs win()
        if (compsquareCounter === 4) {
            let highTimer = 0
            let highlighter = setInterval ( function () {
                highTimer ++
  
                    currentElem.style.backgroundColor = "rgb(171, 159, 96)"
                    if (highTimer > 2) {
                        rowArray[j - 1].style.backgroundColor = "rgb(171, 159, 96)"
                    }
                    if (highTimer >= 5) {
                        rowArray[j - 2].style.backgroundColor = "rgb(171, 159, 96)"
                    }
                    if (highTimer >= 7) {
                    rowArray[j - 3].style.backgroundColor = "rgb(171, 159, 96)"
                    }
                    if (compWinRunner === 0 && highTimer > 9) {
                        win ("computerWins")
                        compWinRunner ++
                    } 
            }, 300)
            break;
        }
        //if there is a non-consecutive square, reset counter to 0
        else if (currentElem.className !== "computerSquare") {
            compsquareCounter = 0
        }
        //this is a piece of the computer AI
        else if (compsquareCounter === 3 && rowArray[j - 3] !== undefined && rowArray[j - 3].className !== "playedSquare") {
            
          //code block that attempts to find a computer win if there are 3 computer squares in a row, sends a number to computerTurn() to tell it where to play 
          for (let k = 0; k < megaRowArray.length; ++ k) {
            let curRow = megaRowArray[k]
  
            if (curRow.indexOf(rowArray[j - 3]) >= 0) {
              compTactics2 = curRow.indexOf(rowArray[j - 3])
              break;
            }   
          }
        }
        //tells the computer to play in front of a 3 square line if the next square is available
        else if (compsquareCounter === 3 && rowArray[j + 1] !== undefined && rowArray[j + 1].className !== "playedSquare") {
            
          for (let k = 0; k < megaRowArray.length; ++ k) {
            let curRow = megaRowArray[k]
  
            if (curRow.indexOf(rowArray[j + 1]) >= 0) {
              compTactics2 = curRow.indexOf(rowArray[j + 1])
              break;
            }
          }
        }
    }
    //scans for a player win
    for (let i = 0; i < rowArray.length; ++i) {
        let curElem = rowArray[i]
  
        if (curElem.className === "playedSquare") {
            squareCounter ++
        }
        //win condition for player
        if (squareCounter === 4) {
  
            let highTimer = 0
            let highlighter = setInterval ( function () {
                    highTimer ++
  
                    curElem.style.backgroundColor = "white"
                    if (highTimer > 2) {
                        rowArray[i - 1].style.backgroundColor = "white"
                    }
                    if (highTimer >= 5) {
                        rowArray[i - 2].style.backgroundColor = "white"
                    }
                    if (highTimer >= 7) {
                    rowArray[i - 3].style.backgroundColor = "white"
                    }
                    if (winRunner === 0 && highTimer > 9) {
                        winRunner ++
                        win ("playerWins")
                    } 
            }, 300)
            return "playerWins"
            break;
        }
        //resets counter for player if nonconsecutive square is found
        else if (curElem.className !== "playedSquare") {
            squareCounter = 0
        }
        //another piece of the computer AI that attempts to block players if they have 3 squares in a row, feeds a number to computerTurn()
        else if (squareCounter === 3 && rowArray[i - 3] !== undefined && rowArray[i - 3].className !== "computerSquare") {
          for (let k = 0; k < megaRowArray.length; ++ k) {
            let curRow = megaRowArray[k]
  
            if (curRow.indexOf(rowArray[i - 3]) >= 0) {
              compTactics2 = curRow.indexOf(rowArray[i - 3])
              break;
            }   
          }
        }   
        else if (squareCounter === 3 && rowArray[i + 1] !== undefined && rowArray[i + 1].className !== "computerSquare") {
          for (let k = 0; k < megaRowArray.length; ++ k) {
            let curRow = megaRowArray[k]
  
            if (curRow.indexOf(rowArray[i + 1]) >= 0) {
              compTactics2 = curRow.indexOf(rowArray[i + 1])
              break;
            }   
          }
        }
    }
    return false
  }

//gathers the game board as a multidimentional array of live html elements
function getBoard () {
    let gameBoard = []

    gameBoard.push(row1)
    gameBoard.push(row2)
    gameBoard.push(row3)
    gameBoard.push(row4)
    gameBoard.push(row5)
    gameBoard.push(row6)

    return gameBoard
}

//gathers each column of the board
function getColumn (columnIdx) {
    let colArray = []
    let gameArrays = getBoard()

    for (let i = 0; i < gameArrays.length; ++i) {
        let curRow = gameArrays[i]

        colArray.push(curRow[columnIdx])
    }
    return colArray
}

//the function I was dreading from the start! gathers diagnals into arrays, uses 4 helper functions to check each direction. A bit inellegant but it's effective
//every diagnal is immediately fed to lineChecker() as soon as it's accessed, diagnals are never stored unlike columns and rows

function getDiagonal () {
    let grid = getBoard()
    
    //returns to boardChecker()
    if (getBotToRight (grid) === "playerWins") {
        return "playerWins"
    }
    if (getLeftSideDiagonals(grid) === "playerWins") {
        return "playerWins"
    }
    if (getBotToLeft(grid) === "playerWins") {
        return "playerWins"
    }
    if (getRightSideDiagnals(grid) === "playerWins") {
        return "playerWins"
    }


    function getBotToRight (board) {
        let diagnal = []
        let diagnalLength = 6
      
        //loop through the bottom, starting at the earliest index a diagnal can be achieved going upward to the right
        for (let i = 1; i < 4; i++) {
            let columnIndex = 0
            let rowIndex = 5
            rowIndex = 5 
      
            for (let j = 0; j < diagnalLength; ++j) {
      
                diagnal.push(board[rowIndex][i + columnIndex])
                columnIndex ++
                rowIndex --
            }
        
        if (lineChecker(diagnal) === "playerWins") {
            return "playerWins"
        }
        diagnalLength--
        diagnal = []
        }
      }

    function getRightSideDiagnals (board) {
        let diagnal = []
        let diagnalLength = 4
      
        //loop through the right side, starting at the earliest index a diagnal can be achieved going upward to the left
        for (let i = 3; i < board.length; i++) {
            let columnIndex = 6
            let rowIndex = 0
      
            for (let j = 0; j < diagnalLength; ++j) {
      
                diagnal.push(board[i + rowIndex][columnIndex])
                columnIndex --
                rowIndex --
            }
        
        if (lineChecker(diagnal) === "playerWins") {
            return "playerWins"
        }
        diagnalLength++
        diagnal = []
        }
    }

    function getLeftSideDiagonals (board) {
        let diagnal = []
        let diagnalLength = 4

        //loop through the left side, starting at the earliest index a diagnal can be achieved going upward to the right
        for (let i = 3; i < board.length; i++) {
            let curRow = board[i]
            let columnIndex = 0
            let rowIndex = 0

            for (let j = 0; j < diagnalLength; ++j) {

                diagnal.push(board[i + rowIndex][columnIndex])
                columnIndex ++
                rowIndex --
            }
        
        if (lineChecker(diagnal) === "playerWins") {
            return "playerWins"
        }
        diagnalLength++
        diagnal = []
        }
    }

    function getBotToLeft (board) {
        let diagnal = []
        let diagnalLength = 4
      
        //loop through the bottom, starting at the earliest index a diagnal can be achieved going upward to the left
        for (let i = 3; i < 6; i++) {
            let columnIndex = 0
            let rowIndex = 5
            rowIndex = 5 
      
            for (let j = 0; j < diagnalLength; ++j) {
      
                diagnal.push(board[rowIndex][i + columnIndex])
                columnIndex --
                rowIndex --
            }
        
        if (lineChecker(diagnal) === "playerWins") {
            return "playerWins"
        }
        diagnalLength++
        diagnal = []
        }
    }
}

//checks the board for a win
function boardChecker (board) {
    board = getBoard()

    //checks each diagonal
    if (getDiagonal() === "playerWins") {
        return "playerWins"
    }
    
    //checks each row
    for (let i = 0; i < board.length; ++i) {
        let row = board[i]
        
        if (lineChecker(row) === "playerWins") {
            return "playerWins"
        }
    }

    //checks each column
    for (let i = 0; i <= 6; ++i) {
        let curColumn = getColumn(i)

        if (lineChecker(curColumn) === "playerWins") {
            return "playerWins"
        }

    }
    return false
}

//elements for the victory screen
let incrementer = 4
let victory1 = document.getElementById("victory1")
let victory2 = document.getElementById("victory2")
let victory3 = document.getElementById("victory3")
let victory4 = document.getElementById("victory4")
let victory5 = document.getElementById("victory5")
let victory6 = document.getElementById("victory6")
let resetBotton = document.getElementById("resetButton")

//counters that prevent win from being run multiple times
let winRunner = 0
let compWinRunner = 0

//explodes the size of the center element and creates the victory screen at the end
function win (winner) {
    console.log("win was run")
    computerMessage.style.paddingLeft = "50"
    computerMessage.style.position = "relative"
    computing.style.display = "inline"

    if (winner === "playerWins") {
      computerMessage.innerText = "You are victorious."
      computing.style.backgroundColor = "rgb(66, 76, 85)"
      computing.style.color = "white"
      resetBotton.style.boxShadow = "2px 2px 2px black"
      
    }
    if (winner === "computerWins") {
      computerMessage.innerText = "You couldn't handle my hyperthreaded intelligence."

    }

    let victoryScreen = setInterval (function () {
            incrementer += 1
            computing.style.height = `${incrementer}%`
            computing.style.top = `${50 -(incrementer/2)}%`

            if (incrementer > 100) {
                clearInterval(victoryScreen)
                incrementer = 0

                let victoryMessage = setInterval (function () {
                    incrementer ++

                    if (incrementer === 4) {
                        victory1.style.display = "inline"
                    }
                    if (incrementer === 5) {
                        victory2.style.display = "inline"
                    }
                    if (incrementer === 6) {
                        victory3.style.display = "inline"
                    }
                    if (incrementer === 7) {
                        victory4.style.display = "inline"
                    }
                    if (incrementer === 8) {
                        victory5.style.display = "inline"
                    }
                    if (incrementer === 9) {
                        victory6.style.display = "inline"
                    }
                    if (incrementer === 12) {
                        resetBotton.style.display = "inline-block"

                        resetBotton.addEventListener (
                            'click',
                            newGame
                        )
                    }
                    if (incrementer === 13) {
                        clearInterval(victoryMessage)
                        incrementer = 4
                    }
                }, 250)
            }
        
    }, 25)

}

//loads the game again if the play again button is clicked (window refresh)
function newGame () {
    window.location.reload()  
}
