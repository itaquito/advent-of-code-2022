const fs = require("fs/promises");

interface point {
  x: number,
  y: number,
  height: number
}

interface queueElement {
  alreadyVisited: point[];
  nextToTest: point;
  steps: number;
}


// Checking every single combination is probably not the best idea
async function main() {
  const data = await fs.readFile("./input.txt", { encoding: "utf8" });

  const lines: string[] = data.split("\r\n");

  // Parse input
  const map: number[][] = [];
  const startPoint: point = { x: 0, y: 0, height: 0 };
  const endPoint: point = { x: 0, y: 0, height: 25 };

  for (let i = 0; i < lines.length - 1; i++) {
    const line = lines[i];
    map.push([]);

    for (let e = 0; e < line.length; e++) {
      const character = line[e];

      if (character == "S") {
        startPoint.x = e;
        startPoint.y = i;

        map[i].push(0);
        continue;
      } else if (character == "E") {
        endPoint.x = e;
        endPoint.y = i;

        map[i].push(25);
        continue;
      }

      map[i].push(character.charCodeAt(0) - 97);
    }
  }

  console.log(startPoint, endPoint);

  // Print map
  for (let i = 0; i < map.length; i++) {
    console.log(map[i].map(e => String(e).length == 1 ? ` ${e}` : e).join("|"));
  }

  const queue: queueElement[] = [{
    alreadyVisited: [],
    steps: 0,
    nextToTest: startPoint
  }];
  const successfulRoutes: number[] = [];

  while (queue.length) {
    console.log("Queue length:", queue.length, "/", successfulRoutes.length, successfulRoutes);

    const currentQueue = (queue.pop() as queueElement);
    const { alreadyVisited, nextToTest, steps } = currentQueue;
    const { x, y, height } = nextToTest;

    // Goal reached
    if (x == endPoint.x && y == endPoint.y) {
      successfulRoutes.push(steps);
    }

    // Up
    if ((map[y - 1]?.[x] <= height || map[y - 1]?.[x] == height + 1) && !alreadyVisited.find(e => e.x == x && e.y == y - 1)) {
      queue.push({
        alreadyVisited: [...alreadyVisited, nextToTest],
        nextToTest: {
          x: x,
          y: y - 1,
          height: map[y - 1][x]
        },
        steps: steps + 1
      });
    }

    // Down
    if ((map[y + 1]?.[x] <= height || map[y + 1]?.[x] == height + 1) && !alreadyVisited.find(e => e.x == x && e.y == y + 1)) {
      queue.push({
        alreadyVisited: [...alreadyVisited, nextToTest],
        nextToTest: {
          x: x,
          y: y + 1,
          height: map[y + 1][x]
        },
        steps: steps + 1
      });
    }

    // Right
    if ((map[y][x + 1] <= height || map[y][x + 1] == height + 1) && !alreadyVisited.find(e => e.x == x + 1 && e.y == y)) {
      queue.push({
        alreadyVisited: [...alreadyVisited, nextToTest],
        nextToTest: {
          x: x + 1,
          y: y,
          height: map[y][x + 1]
        },
        steps: steps + 1
      });
    }

    // Left
    if ((map[y][x - 1] <= height || map[y][x - 1] == height + 1) && !alreadyVisited.find(e => e.x == x - 1 && e.y == y)) {
      queue.push({
        alreadyVisited: [...alreadyVisited, nextToTest],
        nextToTest: {
          x: x - 1,
          y: y,
          height: map[y][x - 1]
        },
        steps: steps + 1
      });
    }
  }

  const shortestRoute = successfulRoutes.sort((a, b) => a - b)[0]

  console.log("Shortest route:", shortestRoute);
}

main();
