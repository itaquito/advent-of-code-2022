const fs = require("fs/promises");

async function main() {
  const data = await fs.readFile("./input.txt", { encoding: "utf8" });

  const lines: string[] = data.split("\r\n");

  let total = 0;
  for (let i = 0; i < lines.length - 1; i++) {
    // A Rock (+1)
    // B Paper (+2)
    // C Scissors (+3)
    // X Lose
    // Y Draw
    // Z Win
    // +0 Lost
    // +3 Draw
    // +6 Win
    // This hurts my eyes ;_;
    const movement = lines[i].split(" ");

    if (movement[1] == "X") {
      // Lose
      if (movement[0] == "B") {
        // Rock
        total += 1;
      } else if (movement[0] == "C") {
        // Paper
        total += 2;
      } else {
        // Scissors
        total += 3
      }
    } else if (movement[1] == "Y") {
      // Draw
      if (movement[0] == "A") {
        // Rock
        total += 1;
      } else if (movement[0] == "B") {
        // Paper
        total += 2;
      } else {
        // Scissors
        total += 3
      }
      total += 3;
    } else {
      // Win
      if (movement[0] == "C") {
        // Rock
        total += 1;
      } else if (movement[0] == "A") {
        // Paper
        total += 2;
      } else {
        // Scissors
        total += 3
      }
      total += 6;
    }
  }

  console.log("Total:", total);
}

main();
