// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // Enemy odd canvas. Reset position.
    if (this.x > 510){
        this.x = -50;
        this.speed = 100 + Math.floor(Math.random() * 512);
    }

    // Check collision
    if (player.x < this.x + 80 && 
        player.x + 87 > this.x && 
        player.y < this.y + 60 && 
        30 + player.y > this.y){
        player.x = 200;
        player.y = 380;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed){
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-pink-girl.png';
};

Player.prototype.update = function() {
    // Off canvas
    if(this.x > 400){
        this.x = 400;
    }

    if (this.y > 380){
        this.y = 380;
    }

    if (this.x < 0){
        this.x = 0;
    }

    // Game clear. Start from beginning
    if (this.y < 0){
        this.x = 200;
        this.y = 380;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (keyPress){
    if (keyPress == 'left' && this.x > 0) {
        this.x -= 102;
    };
    if (keyPress == 'right' && this.x < 405) {
        this.x += 102;
    };
    if (keyPress == 'up' && this.y > 0) {
        this.y -= 83;
    };
    if (keyPress == 'down' && this.y < 405) {
        this.y += 83;
    };
    if (this.y < 0) {
        setTimeout(() => {
            this.x = 200;
            this.y = 380;
        }, 800);
    };
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

// Enemy Y position
var enemyPosition = [60, 140, 220];
var player = new Player(200, 380, 50);
var enemy;

enemyPosition.forEach(function(posY){
    enemy = new Enemy (0, posY, 100 + Math.floor(Math.random() * 512));
    allEnemies.push(enemy);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
