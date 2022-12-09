const fs = require("fs/promises");

interface position {
  x: number,
  y: number
}

async function firstPart() {
  const data = await fs.readFile("./input.txt", { encoding: "utf8" });

  const lines: string[] = data.split("\r\n");

  const headPosition: position = {
    x: 0,
    y: 0
  }
  const tailPosition: position = {
    x: 0,
    y: 0
  }
  const positionsVisited: string[] = ["(0,0)"];

  for (let i = 0; i < lines.length - 1; i++) {
    const line = lines[i].split(" ");

    const direction = line[0];
    const quantity = parseInt(line[1]);

    for (let i = 0; i < quantity; i++) {
      // Move head
      switch (direction) {
        case "U":
          headPosition.y++;
          console.log("HEAD > Up");
          break;
        case "D":
          headPosition.y--;
          console.log("HEAD > Down");
          break;
        case "R":
          headPosition.x++;
          console.log("HEAD > Right");
          break;
        case "L":
          headPosition.x--;
          console.log("HEAD > Left");
          break;
        default:
          console.error("Unknown movement.", direction);
          break;
      }

      // Move tail
      const xDifference = headPosition.x - tailPosition.x;
      const yDifference = headPosition.y - tailPosition.y;

      if (xDifference >= -1 && xDifference <= 1 && yDifference >= -1 && yDifference <= 1) {
        console.log("No movement necessary");
        continue;
      }

      // Right or left
      if (headPosition.y == tailPosition.y && (xDifference >= 2 || xDifference <= -2)) {
        if (xDifference > 0) {
          tailPosition.x++;
        } else {
          tailPosition.x--;
        }
        console.log("Right or left", xDifference);
      }

      //Up or down
      else if (headPosition.x == tailPosition.x && (yDifference >= 2 || yDifference <= -2)) {
        if (yDifference > 0) {
          tailPosition.y++;
        } else {
          tailPosition.y--;
        }
        console.log("Up or down", yDifference);
      }

      // Diagonally
      else {
        console.log("Diagonally", xDifference, yDifference)
        if (xDifference > 0) {
          tailPosition.x++;
          if (yDifference > 0) {
            tailPosition.y++;
          } else {
            tailPosition.y--;
          }
        } else {
          tailPosition.x--
          if (yDifference > 0) {
            tailPosition.y++;
          } else {
            tailPosition.y--;
          }
        }
      }

      positionsVisited.push(`(${tailPosition.x},${tailPosition.y})`);
    }
  }

  console.log(positionsVisited);
  console.log("Unique spaces visited:", countUnique(positionsVisited));
}

//firstPart();

async function secondPart() {
  const data = await fs.readFile("./input.txt", { encoding: "utf8" });

  const lines: string[] = data.split("\r\n");

  const headPosition: position = {
    x: 0,
    y: 0
  }
  const tailsPositions: position[] = [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }];
  const positionsVisited: string[] = ["(0,0)"];

  for (let i = 0; i < lines.length - 1; i++) {
    const line = lines[i].split(" ");

    const direction = line[0];
    const quantity = parseInt(line[1]);

    for (let i = 0; i < quantity; i++) {
      // Move head
      switch (direction) {
        case "U":
          headPosition.y++;
          console.log("HEAD > Up");
          break;
        case "D":
          headPosition.y--;
          console.log("HEAD > Down");
          break;
        case "R":
          headPosition.x++;
          console.log("HEAD > Right");
          break;
        case "L":
          headPosition.x--;
          console.log("HEAD > Left");
          break;
        default:
          console.error("Unknown movement.", direction);
          break;
      }

      // Move tails
      for (let e = 0; e < tailsPositions.length; e++) {
        const currentTail = tailsPositions[e];
        const currentHead = e == 0 ? headPosition : tailsPositions[e - 1];

        const xDifference = currentHead.x - currentTail.x;
        const yDifference = currentHead.y - currentTail.y;

        if (xDifference >= -1 && xDifference <= 1 && yDifference >= -1 && yDifference <= 1) {
          console.log("No movement necessary");
          continue;
        }

        // Right or left
        if (currentHead.y == currentTail.y && (xDifference >= 2 || xDifference <= -2)) {
          if (xDifference > 0) {
            currentTail.x++;
          } else {
            currentTail.x--;
          }
          console.log("Right or left", xDifference);
        }

        //Up or down
        else if (currentHead.x == currentTail.x && (yDifference >= 2 || yDifference <= -2)) {
          if (yDifference > 0) {
            currentTail.y++;
          } else {
            currentTail.y--;
          }
          console.log("Up or down", yDifference);
        }

        // Diagonally
        else {
          console.log("Diagonally", xDifference, yDifference)
          if (xDifference > 0) {
            currentTail.x++;
            if (yDifference > 0) {
              currentTail.y++;
            } else {
              currentTail.y--;
            }
          } else {
            currentTail.x--
            if (yDifference > 0) {
              currentTail.y++;
            } else {
              currentTail.y--;
            }
          }
        }
      }

      positionsVisited.push(`(${tailsPositions[8].x},${tailsPositions[8].y})`);
    }
  }

  console.log(positionsVisited);
  console.log("Unique spaces visited:", countUnique(positionsVisited));
}

secondPart();

function countUnique(array: any[]): number {
  const alreadyCounted: any[] = [];
  let count = 0;

  for (let i = 0; i < array.length; i++) {
    const element = array[i];

    if (alreadyCounted.indexOf(element) == -1) {
      alreadyCounted.push(element);
      count++;
    }
  }

  return count
}
