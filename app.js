document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const scoreDisplay = document.querySelector('#score')
  const gameMoves = 10
  const width = 8
let squares = []
  const movesDisplay = document.querySelector('.moves-display')

  let score = 0
  scoreDisplay.innerText = score
  let playActive = false
  let movesCount = gameMoves
  movesDisplay.innerText = movesCount
  function startSetup(){
    squares = []
    score = 0
    scoreDisplay.innerText = score
    playActive = false
    movesCount = gameMoves
    movesDisplay.innerText = movesCount
  }

  const candyColors = [
    'url(img/red.png)',
    'url(img/yellow.png)',
    'url(img/orange.png)',
    'url(img/purple.png)',
    'url(img/green.png)',
    'url(img/red.png)',
  ]

  //create board
  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement('div')
      square.setAttribute('draggable', true)
      square.setAttribute('id', i)
      let randomColor = Math.floor(Math.random() * candyColors.length)
      square.style.backgroundImage = candyColors[randomColor]
      grid.appendChild(square)
      squares.push(square)
    }
  }
  createBoard()
  //

  /* ----drag the candies---- */
function dragCandies(){
    let colorBeingDragged
    let colorBeingReplaced
    let squareIdBeingDragged
    let squareIdBeingReplaced

    squares.forEach((square) => square.addEventListener('dragstart', dragStart))
    squares.forEach((square) => square.addEventListener('dragend', dragEnd))
    squares.forEach((square) => square.addEventListener('dragover', dragOver))
    squares.forEach((square) => square.addEventListener('dragenter', dragEnter))
    squares.forEach((square) =>
      square.addEventListener('drageleave', dragLeave)
    )
    squares.forEach((square) => square.addEventListener('drop', dragDrop))

    function dragStart() {
      playActive = true
      colorBeingDragged = this.style.backgroundImage
      squareIdBeingDragged = parseInt(this.id)
    }

    function dragEnd() {
     

      //valid move
      let validMoves = [
        squareIdBeingDragged - 1,
        squareIdBeingDragged - width,
        squareIdBeingDragged + 1,
        squareIdBeingDragged + width,
      ]
      let validMove = validMoves.includes(squareIdBeingReplaced)

      if (squareIdBeingReplaced && validMove) {
        squareIdBeingReplaced = null
       
         movesCount--
         movesDisplay.innerText = movesCount
      } else if (squareIdBeingReplaced && !validMove) {
        squares[squareIdBeingReplaced].style.backgroundImage =
          colorBeingReplaced
        squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
      } else {
        squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
      }
    }

    function dragOver(e) {
      e.preventDefault()
    }
    function dragEnter(e) {
      e.preventDefault()
    }

    function dragLeave() {
      this.style.backgroundImage = ''
    }

    function dragDrop() {
      colorBeingReplaced = this.style.backgroundImage
      squareIdBeingReplaced = parseInt(this.id)
      this.style.backgroundImage = colorBeingDragged
      squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced
    }
}
dragCandies()

 
  /* ----end drag the candies----- */

  /* ----drop candies once some have been cleared---- */
    function moveDown(){
       for (let i = 0; i < 56; i++) {
         const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
         const isFirstRow = firstRow.includes(i)
         if (squares[i + width].style.backgroundImage === '') {
           squares[i + width].style.backgroundImage = squares[i].style.backgroundImage
           squares[i].style.backgroundImage = ''
           const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
           const isFirstRow = firstRow.includes(i)
   
           if (isFirstRow && squares[i].style.backgroundImage == '') {
        
             let randomColor = Math.floor(Math.random() * candyColors.length)
             squares[i].style.backgroundImage = candyColors[randomColor]
        
          
           }
         }else if(isFirstRow && squares[i].style.backgroundImage == ''){
           let randomColor = Math.floor(Math.random() * candyColors.length)
           squares[i].style.backgroundImage = candyColors[randomColor]
         }
       }
    }

  /* ---checking for matches--- */

  //check for row of three
  function checkRowForThree() {
    for (let i = 0; i < 62; i++) {
      let rowOfThree = [i, i + 1, i + 2]
      
      let decidedColor = squares[i].style.backgroundImage
      const isBlank = squares[i].style.backgroundImage === ''

      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]
      if (notValid.includes(i)) continue

      if (
        rowOfThree.every(
          (index) =>
            squares[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
         if (playActive == true) {
           score += 3
           scoreDisplay.innerText = score
         }
        rowOfThree.forEach((index) => {
          squares[index].style.backgroundImage = ''
        })
      }
    }
  }
  //

  //check for column of three
  function checkColumnForThree() {
    for (let i = 0; i < 48; i++) {
      let columnOfThree = [i, i + width, i + width * 2]
      let decidedColor = squares[i].style.backgroundImage
      const isBlank = squares[i].style.backgroundImage === ''

      if (columnOfThree.every((index) => squares[index].style.backgroundImage === decidedColor && !isBlank)
      ) {
         if (playActive == true) {
           score += 3
           scoreDisplay.innerText = score
         }
        columnOfThree.forEach((index) => {
          squares[index].style.backgroundImage = ''
        })
      }
    }
  }
  checkColumnForThree()
  //

  //check for row of four
  function checkRowForFour() {
    for (let i = 0; i < 61; i++) {
      let rowOfFour = [i, i + 1, i + 2, i + 3]

      let decidedColor = squares[i].style.backgroundImage
      const isBlank = squares[i].style.backgroundImage === ''

      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55,
      ]
      if (notValid.includes(i)) continue

      if (
        rowOfFour.every(
          (index) =>
            squares[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
         if (playActive == true) {
           score += 4
           scoreDisplay.innerText = score
         }
        rowOfFour.forEach((index) => {
          squares[index].style.backgroundImage = ''
        })
      }
    }
  }
  //

  //check for column of four
  function checkColumnForFour() {
    for (let i = 0; i < 40; i++) {
      let columnOfFour = [i, i + width, i + width * 2, i + width * 3]
      let decidedColor = squares[i].style.backgroundImage
      const isBlank = squares[i].style.backgroundImage === ''

      if (
        columnOfFour.every(
          (index) =>
            squares[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        if(playActive == true){
          score += 4
          scoreDisplay.innerText = score
        }
        columnOfFour.forEach((index) => {
          squares[index].style.backgroundImage = ''
        })
      }
    }
  }
  //
  function startGame(){
    startSetup()
    createBoard()
    dragCandies()
  }
  /* ---end checking for matches--- */
let empty = false
  window.setInterval(function () {
    
    
   
    checkRowForFour()
    checkColumnForFour()

    checkRowForThree()
    checkColumnForThree()

    
    
    squares.forEach((sq) => {
      if (sq.style.backgroundImage === '') {
        empty = true
      }
    })

    moveDown()
//end game
  if (movesCount === 0 && empty !== true) {
    

    alert(`end points: ${score}`)

    grid.innerHTML = ''
    startGame()
  }

  empty = false

    
  }, 100)
 

})
