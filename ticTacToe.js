var gameOn = true; // Set to true if game to start upon page loading
var players = 1

var placeFirstRandomPiece = function () {
    // getBoardDim
    // makePiece(gameBoard, randomEmptyPos, 'pieceO', 'playerO');
    // gameBoard[randomEmptyPos[0]][randomEmptyPos[1]].gamePiece.imageURL = imageDict[gameBoard[randomEmptyPos[0]][randomEmptyPos[1]].gamePiece.typeOfPiece]
                    var emptyArr = getEmptySquares(gameBoard);
                if (emptyArr.length > 0 && gameOn) {
                    placeRandom(emptyArr);
                };
};

(function(){
    window.gameBoard = makeGameBoard(3);
    var scores = resetScores(gameBoard);
    placeFirstRandomPiece();
    // setNumPlayers(1);
    // renderGameBoard(gameBoard);
    console.log("function1 is on")
})();


(function() {
    var gameOn = true;
    // Initialize game
    // var gameOn = true; // Set to true if game to start upon page loading
    // window.gameBoard = makeGameBoard(3);
    // var scores = resetScores(gameBoard);
    // renderGameBoard(gameBoard);
    // Test
    // console.log("scores is", scores);

    var resetGame = function() {
        gameOn = true;
        var width = document.getElementById('width');
        var widthVal = width.value
        var gridSize = Number(widthVal);
        if (![2, 3, 4, 5].includes(gridSize)) {
           widthVal = 3;
        }
        // var gridSize = 3

        window.gameBoard = makeGameBoard(gridSize);
        resetBoard(gameBoard);
        placeFirstRandomPiece()
        renderGameBoard(gameBoard);
    };
    document.getElementById('button-1player').onclick = function() {
        players = 1;
        resetGame();
    };
    document.getElementById('button-2player').onclick = function() {
        players = 2;
        resetGame();
    };

    // New game button resets game
    // document.getElementById('button-1player').onclick = function() {
    //     gameOn = true;
    //     var width = document.getElementById('width');
    //     var widthVal = width.value
    //     widthVal = Number(widthVal);
    //     if (![2, 3, 4, 5].includes(widthVal)) {
    //         widthVal = 3;
    //     }
    //     window.gameBoard = makeGameBoard(widthVal, widthVal);
    //     resetBoard(gameBoard);
    //     renderGameBoard(gameBoard);
    // };
    // Test
    // console.log('gameOn', gameOn)

    // Click handler for squares on board
    window.clickHandler = function(positionArr) {
        if (gameOn) {
            console.log("the number of players", players);

            var piece = 'pieceX';
            var player = 'playerX'
            var row = positionArr[0];
            var col = positionArr[1];
            // TEST
            // console.log('the user clicked on square:', gameBoard[row][col]);
            if (!gameBoard[row][col].gamePiece) {
                makePiece(gameBoard, [row, col], piece, player);
                gameBoard[row][col].gamePiece.imageURL = imageDict[gameBoard[row][col].gamePiece.typeOfPiece]
                renderGameBoard(gameBoard);
                var winner = checkWin(gameBoard);
                // TEST
                // console.log("CHECKWIN STATE", winner);
                if (winner === 'playerX') {
                    alert('Winner is: ' + winner);
                    gameOn = false;
                };
                var emptyArr = getEmptySquares(gameBoard);
                if (emptyArr.length > 0 && gameOn) {
                    placeRandom(emptyArr);
                };
                // TEST
                // console.log("emptyArr", emptyArr);
                // console.log("WINNER = ", winner);
                // console.log(getBoardDim(gameBoard));
                // console.log("scores is", scores);
                renderGameBoard(gameBoard);
                var winner = checkWin(gameBoard);
                if (winner === 'playerO') {
                    alert('Winner is: ' + winner);
                    gameOn = false;
                }; 
                if (winner === 'Tie') {
                    alert('Winner is: ' + winner);
                    gameOn = false;
                };
            }
        }
    };
})();