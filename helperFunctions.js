// Uncomment 3 lines below to invoke the clickHandler function in ticTacToe.js
$(document).on('click', '.gameSquare', function() {
  clickHandler($(this).data('position'));
});

// Holds the images for the gamePieces
// Toggle in X, O pairs to change images for game
var imageDict = {
    // playerX: "images/amusing/amusing-1299754_1280.png",
    // playerO: "images/amusing/amusing-1299756_1280.png"
    // playerX: "images/animal/animal-1292994_1280.png",
    // playerO: "images/animal/cartoon-1299393_1280.png"
    // playerX: "images/fish/fish-1450768_1280.png",
    // playerO: "images/fish/lantern-fish-1433046_1280.png"
    playerX: "images/fruitsAndVeggies/pear-small.png",
    playerO: "images/fruitsAndVeggies/pickle-small.png",
    cow: "images/obstacles/cowFlower.jpg",
    flower: "images/obstacles/flower.jpg"

};

var nameDict  = {
    playerX: "Pears",
    playerO: "Pickles",
    cow: "Cow",
    flower: "Flower"
};

// Generates the gameBoard
var makeGameBoard = function(boardSize) {
    // console.log("makeGameBoard Getting Accessed") // test
    var board = [];
    var color = getRandomColor();
    for(var i = 0; i < boardSize; i++) {
        var row = [];
        for(var j = 0; j < boardSize; j++) {
            var square = {
            position: [i, j],
            color: color,
            gamePiece: undefined, // This property contains gamePiece object if one is on that square. 
            text: '',
            score: 0
            };
            row.push(square);
        }
    board.push(row);
    }
    return board;
};

// Renders the gameBoard
var renderGameBoard = function(gameBoard) {
    $('.gameBoard').html('');
    var boardSize = gameBoard.length;
    // Scale the gameBoard to the screen
    // Determine if height or width browser is smaller
    var browserSize = Math.min($(window).height(), $(window).width());
    $('.gameBoard').width(browserSize - 250);
    // Leave room around edges by adjusting pixels, and divide by the number of squares to set square size to perfectly fill the space.
    var squareSize = ((browserSize - 250) / boardSize) - 2;
    gameBoard.forEach(function(rowArr, rowIndex) {
        rowArr.forEach(function(squareObj, columnIndex) {
            // Create the HTML that will be rendered to the DOM for each square 
            if (squareObj.gamePiece && squareObj.gamePiece.imageURL) {
                var squareHtml = '<img src="' + squareObj.gamePiece.imageURL + '" class="gameSquare" style="height:' + squareSize + 'px; width:' + squareSize + 'px" data-position="[' + rowIndex + ',' + columnIndex + ']">'
            } else {
                var squareText = '';
                if(squareObj.gamePiece) {
                    squareText = squareObj.gamePiece.name;
                }
                var squareHtml = '<div class="gameSquare" style="background-color:' + squareObj.color + '; height:' + squareSize + 'px; width:' + squareSize + 'px" data-position="[' + rowIndex + ',' + columnIndex + ']">' + squareText + '</div>';
            }
            $('.gameBoard').append(squareHtml);
        });
    });
};


// Generates a gamePiece object 
// initialPosition is a 2 element array
var makePiece = function(gameBoard, initialPosition, player) {
    var pieceName = nameDict[player]
    var gamePiece = {
        name: pieceName,
        // typeOfPiece: pieceType,
        imageURL: imageDict[player],
        playerBelongsTo: player
    };
    var row = initialPosition[0];
    var column = initialPosition[1];
    gameBoard[row][column].gamePiece = gamePiece;
    return gamePiece;
};

// Generate random color for squares
// From http://stackoverflow.com/questions/1484506/random-color-generator-in-javascript
var getRandomColor = function() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    };
    return color;
};

// Resets each squareObj to having a new color and each gamePiece as empty
var resetBoard = function(board) {
    var newColor = getRandomColor()
    _.each(board, function(boardRow) {
        _.each(boardRow, function(squareObj) {
            squareObj.color = newColor;
            squareObj.gamePiece = '';
        })
    })
};

// Returns size of gameBoard
var getBoardDim = function(board) {
    return board.length 
};


// Provides array showing empty squares
var getEmptySquares = function(board) {
    var emptyArr = [];
    _.each(board, function(boardRow) {
        _.each(boardRow, function(squareObj) {
            if (!squareObj.gamePiece) {
                emptyArr.push(squareObj.position);
            }
        })
    });
    return emptyArr; 
};


// Checks status of game:
// Takes a board
// Returns string indicating winner is playerO, playerX or tie
// or noWinner
var checkWin = function(board) {
    linesArr = [];

    // Add rows gamePiece array to lines array
    _.each(board, function(boardRow){ 
        var pieceArray = _.filter(boardRow, function(squareObj) {
           return squareObj.gamePiece;
        })
        linesArr.push(pieceArray);
    });

    // Add column gamepiece arrays to lines array
    for (var i = 0; i < board[0].length; i++) {
        var pieceArray = [];
        _.each(board, function(boardRow) {
            if (boardRow[i].gamePiece) {
                pieceArray.push(boardRow[i]);
            };
        })
        linesArr.push(pieceArray);
    };

    // Add diagonal gamePiece arrays to lines array
    boardDim = getBoardDim(board);
    diag1 = [];
    diag2 = [];
    for (var i = 0; i < boardDim; i++) {
        if (board[i][i].gamePiece) {
            diag1.push(board[i][i]);
        }
        if (board[boardDim - i - 1][i].gamePiece) {
            diag2.push(board[boardDim - i - 1][i]);
        }
    };
    linesArr.push(diag1, diag2);

    // Filter linesArr for a full Line
    fullLineArr = _.filter(linesArr, function(arr) {
        return arr.length == boardDim;
    });

    // First quickly return 'noWinner' if array is empty 
    if (fullLineArr.length == 0) { 
        return "noWinner";
    }

    // Calculate if playerX or playerO is a winner and assign to outcome
    var outcome
    _.each(fullLineArr, function(lineArr) {
        if (_.filter(lineArr, function(item) {
                return lineArr[0].gamePiece.playerBelongsTo === item.gamePiece.playerBelongsTo
            }).length === lineArr.length) {
            outcome = lineArr[0].gamePiece.playerBelongsTo
        }
    })  

    // If there was a winner return playerX or O
    // If there are no empty squares return a tie
    // Otherwise return noWinner
    if (outcome === "playerO") {
        return "playerO"
    } else if (outcome === "playerX") {
        return "playerX"
    } else if (getEmptySquares(board).length === 0) {
        return "tie";
    } else {
        return "noWinner"
    }
};

// Place a gamePiece on a random *empty* square
var placeRandom = function(board, player) {
    var emptyArr = getEmptySquares(board)
    var randomEmptyPos = emptyArr[_.random(emptyArr.length - 1)];
    // console.log('randomPos', randomEmptyPos) // test
    // console.log('player', player) // test
    makePiece(board, randomEmptyPos, player);
};

// Places boardLength - 3 obstacles randomly on gameBoard
// obstacleType is cow, flower, etc.
var addObstacle = function(board, obstacleType) {
    var numObstacles = getBoardDim(board) - 3
    for (var i = 0; i < numObstacles; i++) {
        placeRandom(gameBoard, obstacleType);
    }
}

// Takes currentPlayer as input, returns other player
var switchPlayer = function(passedPlayer) {
    if (passedPlayer === 'playerX') {
        return 'playerO'
    } else {
        return 'playerX'
    }
};

// Clone Board
var cloneBoard = function (board) {
    var clone = makeGameBoard(getBoardDim(board));
    board.forEach(function(gameBoardRow) {
        gameBoardRow.forEach(function(squareObj) {
            // Need to assign color to all objects because color is defined for each square when whole board is created
            clone[squareObj.position[0]][squareObj.position[1]].color = board[squareObj.position[0]][squareObj.position[1]].color;
            // Make duplicate pieces in cloned board if they exist in original board
            if (squareObj.gamePiece) {
                makePiece(clone, squareObj.position, squareObj.gamePiece.playerBelongsTo);
            }
        });
    });
    return clone;
};


// Print Board - for Testing players or scores
var printBoard = function(board, outputType) {
    // console.log("PASSED BOARD", board) // test
    if (outputType === "player") {
        console.log("\n####### Players ################") 
    } else {
        console.log("\n###### Score #####") 
    }
    var playerArr = _.each(board, function(boardRow, index) {
        var row = "row " + index + ": "
        var output
        _.each (boardRow, function(squareObj){
            if (squareObj.gamePiece === "" && outputType ==="player") {
                output = "_______"
            // } else if (squareObj.gamePiece === "" && outputType ==="score") {
            //     output = "___"
            } else if (outputType === "player") {
                output = squareObj.gamePiece.playerBelongsTo;
            } else if (outputType === "score") {
                output = squareObj.score;
            }
            row += output + " ";
        });
        console.log(row);
    });
    if (outputType === "player") {
        console.log("################################\n")
    } else {
        console.log("\n##################")
    }
}

// update Scores
var updateScores = function(autoPlayBoard, scoreBoard, compPlayer, autoPlayWinner) {
    // console.log("autoPlayBoard, scoreBoard, compPlayer, autoPlayWinner", autoPlayBoard, scoreBoard, compPlayer, autoPlayWinner) // test
    if (autoPlayWinner === "tie") {
        return scoreBoard;
    } else {
        // var emptyArr = getEmptySquares(scoreBoard);
        if (autoPlayWinner === compPlayer) {
            var valueFlipper = 1;
        } else {
            var valueFlipper = -1;
        }
        // console.log("updateScores autoPlayBoard", autoPlayBoard) // test
        _.each(autoPlayBoard, function(gameBoardRow) {
            _.each(gameBoardRow, function(squareObj){
                // console.log("squareObj.gamepiece", squareObj) // test
                var boardRow = squareObj.position[0]
                var boardCol = squareObj.position[1]
                if (squareObj.gamePiece) {
                    // console.log("squareObj.gamepiece.playerBelongsTo === compPlayer", squareObj.gamePiece.playerBelongsTo, compPlayer) // test
                    if (squareObj.gamePiece.playerBelongsTo === compPlayer) {
                        scoreBoard[boardRow][boardCol].score += valueFlipper * scoreCurr;
                    } else {
                        scoreBoard[boardRow][boardCol].score -= valueFlipper * scoreOther;
                    }
                }
            })
        })
        // printBoard(scoreBoard, 'score') 
        // console.log("HERE!!!!!!!!!!!!") test
        return scoreBoard; 
    }
}

// Auto player
var autoPlay = function(board, compPlayer) {
    var autoPlayBoard = cloneBoard(board);
    var currPlayer = compPlayer;
    var autoPlayWinner = 'noWinner';
    while (autoPlayWinner === 'noWinner') {
        placeRandom(autoPlayBoard, currPlayer);
        autoPlayWinner = checkWin(autoPlayBoard);
        currPlayer = switchPlayer(currPlayer);
        // printBoard(autoPlayBoard, 'player') // test
    }
    // renderGameBoard(autoPlayBoard) // test
    return {"board": autoPlayBoard, "winner": autoPlayWinner}
}

var shuffleArray = function(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

// Get Best Move
var getBestMove = function(board, scoreBoard, compPlayer, minOrMax) {
    var emptyArr = getEmptySquares(board)
    emptyArr = shuffleArray(emptyArr)
    var max = -Infinity
    var min = Infinity
    var maxPos = false
    // console.log("EMPTY ARRAY", emptyArr) // test
    _.each(emptyArr, function(postionArray){
        var emptyRow = postionArray[0];
        var emptyCol = postionArray[1];
        // console.log("scoreBoard[emptyRow][emptyCol].score", scoreBoard[emptyRow][emptyCol].score) // test
        if (scoreBoard[emptyRow][emptyCol].score > max) {
            max = scoreBoard[emptyRow][emptyCol].score
            maxPos = postionArray
        }

        // console.log("maxPos", maxPos) // test   
        if (scoreBoard[emptyRow][emptyCol].score < min) {
            min = scoreBoard[emptyRow][emptyCol].score
            minPos = postionArray
        } 
    })
    if (minOrMax === "min") {
        return minPos
    } else {
        return maxPos
    }
}

// Monte Carlo Simultor
var monteCarlo = function(board, compPlayer, numTrials, minOrMax) {
    var scoreBoard = cloneBoard(board);
    // console.log("scoreBoard!!!!", scoreBoard) // test
    for (var i = 0; i < numTrials; i++) {
        var autoResults = autoPlay(board, compPlayer);
        // console.log("scoreBoard BEFORE", scoreBoard) // test
        scoreBoard = updateScores(autoResults.board, scoreBoard, compPlayer, autoResults.winner);
        // console.log("scoreBoard AFTER", scoreBoard) // test
        printBoard(scoreBoard, 'score') // test
    }
    var bestMovePosition = getBestMove(gameBoard, scoreBoard, compPlayer, minOrMax)
    // console.log("bestMovePosition", bestMovePosition) // test
    makePiece(board, bestMovePosition, compPlayer);
}

// Alerts the winner or if a tie
var winAlert = function(gameState) {
    if (gameState === 'tie') {
        alert("It's a tie!!!");
    } else { 
        alert(nameDict[gameState] + " win!!!");
    }
};

// Put tests here!

