"use strict";

var piece;
var spaceY;
var spaceX;
var moves = 0;
var timer;
var start;



// When the page is loaded, set up the puzzle pieces and shuffle button
window.onload = function () {
    var puzzle = document.getElementById('puzzle');
    piece = puzzle.getElementsByTagName('div');
    document.getElementById("moves").innerHTML=moves;
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
                    win();
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
        start = new Date().getTime();
        timer = setInterval(function () {
            var now = new Date().getTime();
            var distance = now - start;
            var seconds = Math.floor((distance / 1000));
            document.getElementById("time").innerHTML = seconds + "s";
        }, 1000);
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


// Function to alert the user when they win
function win()
{
    // Simulate a mouse click:
    
    window.location.href = "./win.html";
    alert('Winner! You took ' );
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

// Function to show elapsed time in seconds
function showElapsedTime()
{
    var now = new Date();
    var elapsed = now - start;
    var seconds = elapsed / 1000;
    document.getElementById('time').innerHTML = seconds;
    setTimeout(showElapsedTime, 1000);
}
