const fs = require("fs/promises");

interface totalSizeType {
  minX: number;
  maxX: number;
  maxY?: number;
}

interface sand {
  alive: boolean;
  x: number;
  y: number;
}

async function firstPart() {
  const data = await fs.readFile("./input.txt", { encoding: "utf8" });

  const lines: string[] = data.split("\r\n");

  // Parse input and draw lines
  const cave: string[][] = [];

  const totalSize: totalSizeType = {
    minX: 99999,
    maxX: 0,
  }

  for (let i = 0; i < lines.length - 1; i++) {
    const points = lines[i].split(" -> ").map(e => e.split(",").map(h => parseInt(h)));

    for (let e = 0; e < points.length - 1; e++) {
      const point = points[e];
      const nextPoint = points[e + 1];

      const x = point[0];
      const y = point[1];
      const nextX = nextPoint[0];
      const nextY = nextPoint[1];

      //console.log(x, y, ">", nextX, nextY)

      if (x < totalSize.minX) totalSize.minX = x;
      if (nextX < totalSize.minX) totalSize.minX = nextX;
      if (x > totalSize.maxX) totalSize.maxX = x;
      if (nextX > totalSize.maxX) totalSize.maxX = nextX;

      if (x == nextX && y != nextY) {
        // Vertical line
        const difference = y - nextY;
        const negative = difference < 0;

        for (let m = 0; m <= Math.abs(y - nextY); m++) {
          const coordY = negative ? y + m : y - m;
          if (!cave[coordY]) cave[coordY] = []

          cave[coordY][x] = "#";
        }
      } else if (x != nextX && y == nextY) {
        // Horizontal line
        const difference = x - nextX;
        const negative = difference < 0;

        for (let m = 0; m <= Math.abs(difference); m++) {
          const coordX = negative ? x + m : x - m;
          if (!cave[y]) cave[y] = [];

          cave[y][coordX] = "#";
        }
      } else {
        console.error("What? Same coordinates?", point, nextPoint);
      }
    }
  }

  // Add fountain
  if (!cave[0]) cave[0] = [];
  cave[0][500] = "+";

  // Print cave
  printCave(cave, totalSize);

  let counter = 0;
  while (true) {
    // Drop sand
    const endPos = dropSand(cave, 500, 0);
    if (!endPos.alive) {
      break;
    }

    counter++
    if (!cave[endPos.y]) cave[endPos.y] = [];
    cave[endPos.y][endPos.x] = "o";

    // Print cave
    printCave(cave, totalSize);
  }

  console.log("Final:", counter);
}

//firstPart();

async function secondPart() {
  const data = await fs.readFile("./input.txt", { encoding: "utf8" });

  const lines: string[] = data.split("\r\n");

  // Parse input and draw lines
  const cave: string[][] = [];

  const totalSize: totalSizeType = {
    minX: 99999,
    maxX: 0,
    maxY: 0
  }

  for (let i = 0; i < lines.length - 1; i++) {
    const points = lines[i].split(" -> ").map(e => e.split(",").map(h => parseInt(h)));

    for (let e = 0; e < points.length - 1; e++) {
      const point = points[e];
      const nextPoint = points[e + 1];

      const x = point[0];
      const y = point[1];
      const nextX = nextPoint[0];
      const nextY = nextPoint[1];

      //console.log(x, y, ">", nextX, nextY)

      if (x < totalSize.minX) totalSize.minX = x;
      if (nextX < totalSize.minX) totalSize.minX = nextX;
      if (x > totalSize.maxX) totalSize.maxX = x;
      if (nextX > totalSize.maxX) totalSize.maxX = nextX;
      if (y > (totalSize.maxY as number)) totalSize.maxY = y;
      if (nextY > (totalSize.maxY as number)) totalSize.maxY = nextY;

      if (x == nextX && y != nextY) {
        // Vertical line
        const difference = y - nextY;
        const negative = difference < 0;

        for (let m = 0; m <= Math.abs(y - nextY); m++) {
          const coordY = negative ? y + m : y - m;
          if (!cave[coordY]) cave[coordY] = []

          cave[coordY][x] = "#";
        }
      } else if (x != nextX && y == nextY) {
        // Horizontal line
        const difference = x - nextX;
        const negative = difference < 0;

        for (let m = 0; m <= Math.abs(difference); m++) {
          const coordX = negative ? x + m : x - m;
          if (!cave[y]) cave[y] = [];

          cave[y][coordX] = "#";
        }
      } else {
        console.error("What? Same coordinates?", point, nextPoint);
      }
    }
  }

  // Add fountain
  if (!cave[0]) cave[0] = [];
  cave[0][500] = "+";

  // Print floor
  addFloor(cave, totalSize);

  // Print cave
  printCave(cave, totalSize);

  let counter = 0;
  while (true) {
    // Drop sand
    const endPos = dropSand(cave, 500, 0);

    if (endPos.x < totalSize.minX) totalSize.minX = endPos.x;
    if (endPos.x > totalSize.maxX) totalSize.maxX = endPos.x;

    if (!endPos.alive) {
      console.error("This shouldn't happen in this part. Increasing floor!");
      totalSize.maxX += 10;
      addFloor(cave, totalSize);

      continue;
    }

    counter++

    if (endPos.x == 500 && endPos.y == 0) {
      break;
    }

    if (!cave[endPos.y]) cave[endPos.y] = [];
    cave[endPos.y][endPos.x] = "o";

    // Print cave
    printCave(cave, totalSize);
  }

  console.log("Final:", counter);
}

secondPart();

function printCave(cave: string[][], totalSize: totalSizeType): void {
  //console.log(totalSize);
  console.log(">>> Print map <<<")

  for (let i = 0; i < cave.length; i++) {
    const line = cave[i];
    if (!line) {
      console.log("")
      continue;
    }

    let textLine = "";
    for (let e = totalSize.minX - 1; e < totalSize.maxX + 1; e++) {
      const character = line[e];

      textLine += character ?? " ";
    }

    console.log(textLine);
  }
}

function dropSand(cave: string[][], originX: number, originY: number): sand {
  //Start with the dropping
  let x = originX;
  let y = originY;

  while (true) {
    if (cave[y + 1]?.[x] != "#" && cave[y + 1]?.[x] != "o") {
      // Falling down
      y++;
    } else if (cave[y + 1]?.[x - 1] != "#" && cave[y + 1]?.[x - 1] != "o") {
      // Down left
      x--;
      y++;
    } else if (cave[y + 1]?.[x + 1] != "#" && cave[y + 1]?.[x + 1] != "o") {
      // Down right
      x++;
      y++;
    } else {
      // No more movements
      return {
        alive: true,
        x,
        y
      }
    }

    if (y >= cave.length) return { alive: false, x, y }
  }
}

function addFloor(cave: string[][], totalSize: totalSizeType): void {
  const floorLevel = (totalSize.maxY as number) + 2;

  cave[floorLevel] = new Array(totalSize.maxX);
  cave[floorLevel].fill("#");
}
