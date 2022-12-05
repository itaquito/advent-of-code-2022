const fs = require("fs/promises");

async function firstPart() {
  const data = await fs.readFile("./input.txt", { encoding: "utf8" });

  const lines: string[] = data.split("\r\n");

  // Parse the initial positions
  const crates: string[][] = [];

  const cratesQuantity = Math.ceil(lines[1].length / 4);

  for (let i = 0; i < cratesQuantity; i++) {
    crates.push([]);
  }

  let initialLine = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // If the following line is blank, we reached the end of the initial positions
    if (!lines[i + 1]) {
      initialLine = i + 2;
      break;
    };

    for (let e = 1; e < line.length; e += 4) {
      const crate = line[e];

      const stack = Math.floor(e / 4);

      crates[stack].push(crate);
    }
  }


  for (let i = initialLine; i < lines.length - 1; i++) {
    const line = lines[i].split(" ");

    const quantity = parseInt(line[1]);
    const initialPos = parseInt(line[3]);
    const finalPos = parseInt(line[5]);

    //console.log(quantity, initialPos, finalPos);

    for (let e = 0; e < quantity; e++) {
      // We find the crate to move in the inicial stack
      const initialCrateIndex = findCrateIndex(crates[initialPos - 1]);
      // We find the first empty space on the final stack
      let finalPositionIndex = findEmptyIndex(crates[finalPos - 1]);
      // There is no space, so we create a new one.
      if (finalPositionIndex == -1) {
        crates[finalPos - 1].unshift(" ");
        finalPositionIndex = 0;
      }

      // We make the move
      const crate = crates[initialPos - 1][initialCrateIndex];
      crates[finalPos - 1][finalPositionIndex] = crate;
      crates[initialPos - 1][initialCrateIndex] = " ";
    }
  }

  // We transform the final crates to the code
  let code = "";
  for (let i = 0; i < crates.length; i++) {
    const finalIndex = findCrateIndex(crates[i]);
    const finalCrate = crates[i][finalIndex];

    code += finalCrate;
  }

  console.log("Code:", code)
}

//firstPart();

async function secondPart() {
  const data = await fs.readFile("./input.txt", { encoding: "utf8" });

  const lines: string[] = data.split("\r\n");

  // Parse the initial positions
  const crates: string[][] = [];

  const cratesQuantity = Math.ceil(lines[1].length / 4);

  for (let i = 0; i < cratesQuantity; i++) {
    crates.push([]);
  }

  let initialLine = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // If the following line is blank, we reached the end of the initial positions
    if (!lines[i + 1]) {
      initialLine = i + 2;
      break;
    };

    for (let e = 1; e < line.length; e += 4) {
      const crate = line[e];

      const stack = Math.floor(e / 4);

      crates[stack].push(crate);
    }
  }


  for (let i = initialLine; i < lines.length - 1; i++) {
    const line = lines[i].split(" ");

    const quantity = parseInt(line[1]);
    const initialPos = parseInt(line[3]);
    const finalPos = parseInt(line[5]);

    //console.log(quantity, initialPos, finalPos);

    // We found how many empty spaces they are before the first crate
    let emptySpaces = findEmptyIndex(crates[initialPos - 1]) + 1;
    if (emptySpaces == -1) emptySpaces = 0;

    // We loop from bottom to top and move the crates in that order
    for (let e = ((quantity - 1) + emptySpaces); 0 <= e; e--) {
      let finalPositionIndex = findEmptyIndex(crates[finalPos - 1]);
      if (finalPositionIndex == -1) {
        crates[finalPos - 1].unshift(" ");
        finalPositionIndex = 0;
      }

      const crate = crates[initialPos - 1][e];
      crates[finalPos - 1][finalPositionIndex] = crate;
      crates[initialPos - 1][e] = " ";
    }
  }

  // We transform the final crates to the code
  let code = "";
  for (let i = 0; i < crates.length; i++) {
    const finalIndex = findCrateIndex(crates[i]);
    const finalCrate = crates[i][finalIndex];

    code += finalCrate;
  }

  console.log("Code:", code)
}

secondPart();

function findCrateIndex(array: string[]): number {
  for (let i = 0; i < array.length; i++) {
    if (array[i] != " ") return i;
  }

  return 0;
}

function findEmptyIndex(array: string[]): number {
  for (let i = array.length - 1; 0 <= i; i--) {
    if (array[i] == " ") return i;
  }

  // No space available
  return -1;
}
