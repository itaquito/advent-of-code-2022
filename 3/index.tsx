const fs = require("fs/promises");

async function firstPart() {
  const data = await fs.readFile("./input.txt", { encoding: "utf8" });

  const lines: string[] = data.split("\r\n");

  let sum = 0;
  for (let i = 0; i < lines.length - 1; i++) {
    const line = lines[i];

    const middle = line.length / 2;

    const firstHalf = line.slice(0, middle).split("");
    const secondHalf = line.slice(middle, line.length).split("");

    firstHalf.some(e => {
      if (secondHalf.includes(e)) {
        sum += determineValue(e);
        return true;
      }
    });
  }
  console.log("Sum:", sum);
}

//firstPart();

async function secondPart() {
  const data = await fs.readFile("./input.txt", { encoding: "utf8" });

  const lines: string[] = data.split("\r\n");

  let sum = 0;
  for (let i = 0; i < lines.length - 1; i += 3) {
    const firstSack = lines[i].split("");
    const secondSack = lines[i + 1].split("");
    const thirdSack = lines[i + 2].split("");

    const largestSack = findLargestArray(firstSack, secondSack, thirdSack);

    for (let e = 0; e < largestSack.length; e++) {
      const character = largestSack[e];
      if (firstSack.includes(character) && secondSack.includes(character) && thirdSack.includes(character)) {
        sum += determineValue(character);
        break;
      }
    }
  }
  console.log("Sum:", sum);
}

secondPart();

function determineValue(character: string): number {
  if (character == character.toUpperCase()) {
    // UpperCase
    return character.charCodeAt(0) - 38;
  }
  // LowerCase
  return character.charCodeAt(0) - 96;
}

function findLargestArray(first: any[], second: any[], third: any[]): any[] {
  if (first.length >= second.length && first.length >= third.length) {
    return first;
  } else if (second.length >= first.length && second.length >= third.length) {
    return second;
  }
  return third;
}
