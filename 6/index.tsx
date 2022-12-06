const fs = require("fs/promises");

async function firstPart() {
  const data = await fs.readFile("./input.txt", { encoding: "utf8" });

  const lines: string[] = data.split("\r\n");
  const input = lines[0].split("");

  for (let i = 4; i < input.length; i++) {
    const currentCharacters = input.slice(i - 4, i);

    if (hasDuplicates(currentCharacters)) continue;

    console.log(i);
    break;
  }
}

//firstPart();

async function secondPart() {
  const data = await fs.readFile("./input.txt", { encoding: "utf8" });

  const lines: string[] = data.split("\r\n");
  const input = lines[0].split("");

  for (let i = 14; i < input.length; i++) {
    const currentCharacters = input.slice(i - 14, i);

    if (hasDuplicates(currentCharacters)) continue;

    console.log(i);
    break;
  }
}

secondPart();

function hasDuplicates(array: string[]): boolean {
  const checkedElements: string[] = [];
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    if (checkedElements.indexOf(element) != -1) {
      return true;
    }

    checkedElements.push(element);
  }

  return false;
}
