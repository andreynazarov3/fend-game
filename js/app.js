// Enemies our player must avoid
var Enemy = function ({
    x = -cellWidth,
    y = 0,
    speed = 200, // num pixels per tick
} = {}) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > (cellWidth + 505)) {
        this.x = -cellWidth;
        return;
    }
    this.x = this.x + this.speed * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};




// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var gameStates = {
    PLAY: 0,
    WIN: 1
};

var Player = function ({
    row = 1,
    col = 1
} = {}) {
    this.gameState = gameStates.PLAY;
    this.position = {
        row,
        col
    };
    this.getX = function () {
        return gameGrid[this.position.row][this.position.col].x
    };
    this.getY = function () {
        return gameGrid[this.position.row][this.position.col].y
    };
    this.detectCollision = function () {
            var currentEnemy = allEnemies[this.position.row - 1];
            // console.log(currentEnemy);
            if ((currentEnemy.x + cellWidth - 30) > this.getX() && currentEnemy.x < (this.getX() + cellWidth)) {
                console.log('collision');
                this.position = {
                    ...playerStartPosition
                };
            }
        },
        this.update = function () {
            if (this.position.row === 0 && this.gameState === gameStates.PLAY) {
                console.log('win');
                setTimeout(() => {
                    this.gameState = gameStates.WIN;
                    var result = confirm("You win, do you want to play again?");

                    if (result) {
                        this.position = {
                            ...playerStartPosition
                        };
                        this.gameState = gameStates.PLAY;
                    } else {
                        this.position = {
                            ...playerStartPosition
                        };
                        this.gameState = gameStates.PLAY;
                    }
                }, 0);

            }
            if (this.position.row <= 3 && this.position.row > 0) {
                this.detectCollision();
            }
        };
    this.render = function () {
        ctx.drawImage(Resources.get(this.sprite), this.getX(), this.getY());
    };
    this.handleInput = function (keyCode) {

        switch (keyCode) {
            case 'up':
                if (this.position.row > 0) {
                    this.position.row -= 1;
                }
                break;
            case 'down':
                if (this.position.row < rowsNum - 1) {
                    this.position.row += 1;
                }
                break;
            case 'left':
                if (this.position.col > 0) {
                    this.position.col -= 1;
                }
                break;
            case 'right':
                if (this.position.col < colsNum - 1) {
                    this.position.col += 1;
                }
                break;
        }
    };
    this.sprite = 'images/char-boy.png';
}


// creating 2 dimensional array for game grid
var cellWidth = 101;
var cellHeight = 85;
var rowsNum = 6;
var colsNum = 5;
var gameGrid = (function createGameGrid() {
    var tempGrid = [];
    var currentY = -30;
    for (var i = 0; i < rowsNum; i++) {
        tempGrid.push([]);
        var currentX = 0;
        for (var j = 0; j < colsNum; j++) {
            tempGrid[i].push({
                x: currentX,
                y: currentY
            });
            currentX += cellWidth;
        }
        currentY += cellHeight;
    }
    return tempGrid;
}(cellWidth, cellHeight, rowsNum, colsNum));

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var playerStartPosition = {
    row: rowsNum - 1,
    col: Math.ceil((colsNum - 1) / 2)
}

var player = new Player(playerStartPosition);

var enemy1 = new Enemy({
    y: gameGrid[1][0].y,
    speed: 200
});
var enemy2 = new Enemy({
    y: gameGrid[2][0].y,
    speed: 300
});
var enemy3 = new Enemy({
    y: gameGrid[3][0].y,
    speed: 400
});

var allEnemies = [enemy1, enemy2, enemy3];
// grid testing

// gameGrid.forEach(function (row) {
//     row.forEach(function (cell) {
//         allEnemies.push(new Enemy(cell.x, cell.y));
//     });
// });


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});