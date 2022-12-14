"use strict";

var piece;
var spaceY;
var spaceX;
var moves = 0;
var timer =0;
var start;


// When the page is loaded, set up the puzzle pieces and shuffle button
window.onload = function () {
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    var puzzle = document.getElementById('puzzle');
    piece = puzzle.getElementsByTagName('div');
    document.getElementById("moves").innerHTML=moves;
    document.getElementById("time").innerHTML = "0s";
    for (var i = 0; i < piece.length; i++)
    {
        piece[i].className = 'piece';
        piece[i].style.left = (i % 4 * 100) + 'px';
        piece[i].style.top = (parseInt(i / 4) * 100) + 'px';
        piece[i].style.backgroundPosition = '-' + piece[i].style.left + ' ' + '-' + piece[i].style.top;
        piece[i].style.backgroundImage="url('Rock.jpg')";

        // When a piece is hovered, add styling if it is a movable piece and remove that styling when no longer hovering
        piece[i].onmouseover = function ()
        {
            if (isMovable(parseInt(this.innerHTML)))
            {
                this.style.border = "3px solid red";
                this.style.color = "#006600";
                this.style.textDecoration = "underline";
                this.style.cursor = "pointer";
            }
        };
        piece[i].onmouseout = function ()
        {
            this.style.border = "2px solid black";
            this.style.color = "#000000";
            this.style.textDecoration = "none";
            this.style.cursor = 'default';
        };

        // When a piece is clicked, check if that piece is movable. If it is, swap it and check if the game is won.
        piece[i].onclick = function ()
        {
            if (isMovable(parseInt(this.innerHTML)))
            {
                swap(this.innerHTML - 1);
                moves++;
                document.getElementById("moves").innerHTML=moves;
                if (finish())
                {
                    timer = clearInterval(timer);
                    moves = 0;
                    var duration = 1 * 1000;
                    var end = Date.now() + duration;
                    (function frame() {
                        // launch a few confetti from the left edge
                        confetti({
                            particleCount: 7,
                            angle: 60,
                            spread: 55,
                            origin: { x: Math.random(), y: Math.random() }
                        });

                        // keep going until we are out of time
                        if (Date.now() < end) {
                            requestAnimationFrame(frame);
                        }
                    }());
                    modal.style.display = "block";
                    document.getElementById("winTime").innerHTML = "Time: " + document.getElementById("time").innerHTML;
                    document.getElementById("winMoves").innerHTML = "Moves: " + document.getElementById("moves").innerHTML;
                    document.getElementById("moves").innerHTML = moves;
                    document.getElementById("time").innerHTML = 0 + "s";
                }
            }
        };
    }

    var shuffle = document.getElementById('shufflebutton');
    spaceX = '300px';
    spaceY = '300px';
    // When the shuffle button is clicked, simulate 300 random moves of the blank space
    shuffle.onclick = function ()
    {
        // Start the timer
        start = new Date().getTime();
        timer = setInterval(function () {
            var now = new Date().getTime();
            var distance = now - start;
            var seconds = Math.floor((distance / 1000));
            document.getElementById("time").innerHTML = seconds + "s";
        }, 1000);
        moves = 0;
        document.getElementById("moves").innerHTML=moves;
        for (var i = 0; i < 300; i++) {
            var rand = parseInt(Math.random() * 100) % 4;
            if (rand == 0) {
                var temp = up(spaceX, spaceY);
                if (temp != -1) {
                    swap(temp);
                }
            }
            if (rand == 1) {
                var temp = down(spaceX, spaceY);
                if (temp != -1) {
                    swap(temp);
                }
            }
            if (rand == 2) {
                var temp = left(spaceX, spaceY);
                if (temp != -1) {
                    swap(temp);
                }
            }
            if (rand == 3) {
                var temp = right(spaceX, spaceY);
                if (temp != -1) {
                    swap(temp);
                }
            }
        }
    };
};


function isMovable(position) // returns true whenever a piece can be moved into an empty space
{
    if (left(spaceX, spaceY) == (position - 1)) {
        return true;
    }
    if (down(spaceX, spaceY) == (position - 1)) {
        return true;
    }
    if (up(spaceX, spaceY) == (position - 1)) {
        return true;
    }
    if (right(spaceX, spaceY) == (position - 1)) {
        return true;
    }
}


function left(x, y) //calculates how far to the left a puzzlepiece should position
{
    var cordX = parseInt(x);
    var cordY = parseInt(y);

    if (cordX > 0) {
        for (var i = 0; i < piece.length; i++) {
            if (parseInt(piece[i].style.left) + 100 == cordX && parseInt(piece[i].style.top) == cordY) {
                return i;
            }
        }
    } else {
        return -1;
    }
}


function right(x, y) //calculates how far to the right a puzzlepiece should position
{
    var cordX = parseInt(x);
    var cordY = parseInt(y);
    if (cordX < 300) {
        for (var i = 0; i < piece.length; i++) {
            if (parseInt(piece[i].style.left) - 100 == cordX && parseInt(piece[i].style.top) == cordY) {
                return i;
            }
        }
    } else {
        return -1;
    }
}


function up(x, y) //calculates how far up a puzzlepiece should position
{
    var cordX = parseInt(x);
    var cordY = parseInt(y);
    if (cordY > 0) {
        for (var i = 0; i < piece.length; i++) {
            if (parseInt(piece[i].style.top) + 100 == cordY && parseInt(piece[i].style.left) == cordX) {
                return i;
            }
        }
    } else {
        return -1;
    }
}


function down(x, y) //calculates how far down a puzzlepiece should position
{
    var cordX = parseInt(x);
    var cordY = parseInt(y);
    if (cordY < 300) {
        for (var i = 0; i < piece.length; i++) {
            if (parseInt(piece[i].style.top) - 100 == cordY && parseInt(piece[i].style.left) == cordX) {
                return i;
            }
        }
    } else {
        return -1;
    }
}


// Swaps the piece into the empty space
function swap(position)
{
    var temp = piece[position].style.top;
    piece[position].style.top = spaceY;
    spaceY = temp;
    temp = piece[position].style.left;
    piece[position].style.left = spaceX;
    spaceX = temp;
}


// Function to check if the game is finished
function finish()
{
    var flag = true;
    // for every piece
    for (var i = 0; i < piece.length; i++)
    {
        var top = parseInt(piece[i].style.top);
        var left = parseInt(piece[i].style.left);
        // Check if the left and top positions are correct
        if (left != (i % 4 * 100) || top != parseInt(i / 4) * 100)
        {
            flag = false;
            break;
        }
    }
    return flag;
}




function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

// Function to change the background image
function changeBackground(num)
{
    var images = ['./backgrounds/fine.jpeg','./backgrounds/heman.jpeg','./backgrounds/pepe_sad.jpeg','./backgrounds/swamp.jpeg'];
    document.body.style.backgroundColor = "#f3f3f3";
    document.body.style.backgroundImage = "url(" + images[num] + ")";
}