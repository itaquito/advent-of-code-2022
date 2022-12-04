const fs = require("fs/promises");

async function firstPart() {
  const data = await fs.readFile("./input.txt", { encoding: "utf8" });

  const lines: string[] = data.split("\r\n");
  let sum = 0;
  for (let i = 0; i < lines.length - 1; i++) {
    const pairs = lines[i].split(",");

    const firstPair = pairs[0].split("-").map(e => parseInt(e));
    const secondPair = pairs[1].split("-").map(e => parseInt(e));

    if (firstPair[0] >= secondPair[0] && firstPair[1] <= secondPair[1]) {
      // First pair is contained in second pair
      sum++;
    } else if (firstPair[0] <= secondPair[0] && firstPair[1] >= secondPair[1]) {
      // Second pair is contained in first pair
      sum++;
    }
  }

  console.log("Sum:", sum);
}

//firstPart();

async function secondPart() {
  const data = await fs.readFile("./input.txt", { encoding: "utf8" });

  const lines: string[] = data.split("\r\n");
  let sum = 0;
  for (let i = 0; i < lines.length - 1; i++) {
    const pairs = lines[i].split(",");

    const firstPair = pairs[0].split("-").map(e => parseInt(e));
    const secondPair = pairs[1].split("-").map(e => parseInt(e));

    if (firstPair[0] >= secondPair[0] && firstPair[1] <= secondPair[1]) {
      // First pair is contained in second pair
      sum++;
    } else if (firstPair[0] <= secondPair[0] && firstPair[1] >= secondPair[1]) {
      // Second pair is contained in first pair
      sum++;
    } else if (firstPair[0] >= secondPair[0] && firstPair[1] >= secondPair[1] && firstPair[0] <= secondPair[1]) {
      // There is overlap on the left
      sum++;
    } else if (firstPair[0] <= secondPair[0] && firstPair[1] <= secondPair[1] && firstPair[1] >= secondPair[0]) {
      // There is overlap on the right
      sum++;
    }
  }

  console.log("Sum:", sum);
}

secondPart();
