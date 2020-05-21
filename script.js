    var arr = [[], [], [], [], [], [], [], [], []]
    var temp = [[], [], [], [], [], [], [], [], []]

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            arr[i][j] = document.getElementById(i * 9 + j);

        }
    }

    function initializeTemp(temp) {

        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                temp[i][j] = false;

            }
        }
    }


    function setTemp(board, temp) {

        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                if (board[i][j] != 0) {
                    temp[i][j] = true;
                }

            }
        }
    }


    function setColor(temp) {

        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                if (temp[i][j] == true) {
                    arr[i][j].style.color = "#DC3545";
                }

            }
        }
    }

    function resetColor() {

        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {

                arr[i][j].style.color = "green";


            }
        }
    }

    var board = [[], [], [], [], [], [], [], [], []]


    let button = document.getElementById('generate-sudoku')
    let solve = document.getElementById('solve')

    console.log(arr)
    function changeBoard(board) {
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                if (board[i][j] != 0) {

                    arr[i][j].innerText = board[i][j]
                }

                else
                    arr[i][j].innerText = ''
            }
        }
    }


    button.onclick = function () {
        var xhrRequest = new XMLHttpRequest()
        xhrRequest.onload = function () {
            var response = JSON.parse(xhrRequest.response)
            console.log(response)
            initializeTemp(temp)
            resetColor()

            board = response.board
            setTemp(board, temp)
            setColor(temp)
            changeBoard(board)
        }
        xhrRequest.open('get', 'https://sugoku.herokuapp.com/board?difficulty=easy')
    //we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
    xhrRequest.send()
}

//to be completed by student
function isSafe(board, sr, sc, val) {

    // Check the number is not repeting int the same row and col
    for(var i = 0; i < 9; i++){
        if (board[i][sc]==val || board[sr][i]==val) {
            return false;
        }
    }

    // Check for the subgrid
    var sx = sr - sr % 3;
    var sy = sc - sc % 3;

    for(var x = sx; x < sx+3; x++){
        for(var y =sy; y < sy+3; y++){
            if (board[x][y] == val) {
                return false;
            }
        }
    }

    return true;
}

//to be completed by student
function solveSudokuHelper(board, sr, sc) {

    // Base Case
    if (sr == 9) {
        changeBoard(board);
        return;
    }

    // Other Cases
    if (sc == 9) {
        return solveSudokuHelper(board,sr+1,0);
    }
    // Skip pre-filled cells
    if (board[sr][sc]!=0) {
        return solveSudokuHelper(board,sr,sc+1);
    }

    // If there is a zero at the current location
    for(var i = 1; i <= 9; i++){
        if (isSafe(board, sr, sc, i)) {
            board[sr][sc] = i;
            var sucess = solveSudokuHelper(board, sr, sc+1);
            if (sucess == true) {
                return true;
            }
            board[sr][sc] = 0;
        }
    }

    return false;
}

function solveSudoku(board) {
    solveSudokuHelper(board, 0, 0)
}

solve.onclick = function () {
    solveSudoku(board)

}