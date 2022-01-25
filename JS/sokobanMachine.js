const map = document.getElementById("playground")

var goalElements = [];
var keyPress = 0;
document.body.addEventListener('keydown', keyPressDown);

var player ={
    x:-1,
    y: -1
}

function initlizeMap()
{
    for(let row = 0; row < tileMap01.height; row++)
    {
		for(let col = 0; col < tileMap01.width; col++)
		{
			var element = document.createElement("div");
			element.classList.add("block");
			if(tileMap01.mapGrid[row][col][0] !== ' ')
			{
				console.log(tileMap01.mapGrid[row][col][0]);

				element.classList.add(tileMap01.mapGrid[row][col][0]);
			}
			element.id = "x" + col + "y" + row;

            if(tileMap01.mapGrid[row][col][0] == 'G')
            {
                //goalElements.add(element);
                goalElements.push(element);
            }
			
            //Check if player element => to set the player x and y
			if(tileMap01.mapGrid[row][col][0] == 'P')
            {
				player.x = col;
				player.y = row;
			}
			map.appendChild(element);
		}
	}
}

function keyPressDown(event)
{
    switch(event.key)
    {
        case "ArrowUp":
            movePlayer(0, -1);
            break;

        case "ArrowDown":
            movePlayer(0, 1);
            break;

        case "ArrowRight":
            movePlayer(1, 0);
            break;

        case "ArrowLeft":
            movePlayer(-1, 0);
            break;

        default:

        break;
    }
}

function movePlayer(x, y)
{
    
    var newY = player.y + y;
	var newX = player.x + x; 
	
		
	var playerElement = document.getElementById("x"+ player.x + "y"+player.y);
	var destinationElement = document.getElementById("x" + newX + "y" + newY);

    // Check if it is possible to move player due to wall
    if (destinationElement.classList.contains("W"))
    {
        return;
    }
	if (destinationElement.classList.contains("B"))
    {
        
       if( !moveBox(newX, newY, newX+x, newY+y))
       {
           return;
       }
    }
    
     
	playerElement.classList.remove("P");
	destinationElement.classList.add("P");
	player.x = newX;
	player.y = newY;

    keyPress++; // Amount of key press
    if (winCheck())
    {
        document.writeln
        ("You solved the Sokoban in " + keyPress + " key presses!")
    }
}


function winCheck() //min
{
    for(let i=0; i < goalElements.length; i++)
    {
        if ( ! goalElements[i].classList.contains("B"))
        {
            return false;
        }
    }
    return true;
}


function moveBox(xBox, yBox, xDest, yDest)
{
    var boxElement = document.getElementById("x"+ xBox + "y"+ yBox);
	var destinationElement = document.getElementById("x" + xDest + "y" + yDest);

    // Check if it is possible to move box due to next position is a wall.
    if (destinationElement.classList.contains("W"))
    {
        return false;
    }
        // Check if it is possible to move box due to another box. 
        // It shall not be possible to move more than 1 box.
	if (destinationElement.classList.contains("B"))
    {
        return false;
    }
    
    boxElement.classList.remove("B");
	destinationElement.classList.add("B");
    return true;
}


initlizeMap();