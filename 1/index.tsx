const fs = require("fs/promises");

interface ElveCalories {
  calories: number[];
  totalCalories: number
}

async function main() {
  const data: string = await fs.readFile("./input.txt", { encoding: "utf8" });

  const lines: string[] = data.split("\r\n");

  // Convert input to an object
  const rations: ElveCalories[] = [{ calories: [], totalCalories: 0 }];

  for (let i = 0; i < lines.length - 1; i++) {
    const line = parseInt(lines[i]);

    if (!line) {
      rations.push({ calories: [], totalCalories: 0 })
      continue;
    }

    rations[rations.length - 1].calories.push(line);
    rations[rations.length - 1].totalCalories += line;
  }

  // Find the 3 largest
  rations.sort((a, b) => b.totalCalories - a.totalCalories)
  let sum = 0;
  for (let e = 0; e < 3; e++) {
    const ration = rations[e];

    sum += ration.totalCalories;
  }

  console.log("Total of 3 largest:", sum);
}

main();
