const map = document.getElementById("playground")

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
    // Check if it is possible to move player

    var newY = player.y + y;
	var newX = player.x + x; 
	
		
	var playerElement = document.getElementById("x"+ player.x + "y"+player.y);
	var destinationElement = document.getElementById("x" + newX + "y" + newY);

    if (destinationElement.classList.contains("W"))
    {
        return;
    }
    
	
	playerElement.classList.remove("P");
	destinationElement.classList.add("P");
	player.x = newX;
	player.y = newY;
}
initlizeMap();