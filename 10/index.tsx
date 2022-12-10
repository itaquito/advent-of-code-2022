const fs = require("fs/promises");

async function firstPart() {
  const data = await fs.readFile("./input.txt", { encoding: "utf8" });

  const lines: string[] = data.split("\r\n");

  let sum = 0;
  let cycles = 0;
  let x = 1;

  for (let i = 0; i < lines.length - 1; i++) {
    const line = lines[i].split(" ");

    const command = line[0];
    const value = line[1] ? parseInt(line[1]) : false;
    let cyclesNeeded = 0;

    switch (command) {
      case "noop":
        cyclesNeeded = 1;
        break;
      case "addx":
        cyclesNeeded = 2;
        break;
      default:
        console.error("Invalid command", command);
        break;
    }

    for (let e = 0; e < cyclesNeeded; e++) {
      cycles++;

      // Cycle: 20th, 60th, 100th, 140th, 180th and 220th 
      if (cycles % 40 == 20) {
        const signalStrength = x * cycles;

        console.log(`${cycles}th cycle`, signalStrength);
        sum += signalStrength;
      }
    }

    // Complete instruction
    if (value) {
      x += value
    }
  }

  console.log("Sum:", sum)
}

//firstPart();

async function secondPart() {
  const data = await fs.readFile("./input.txt", { encoding: "utf8" });

  const lines: string[] = data.split("\r\n");

  let linePrint = "";
  let cycles = 0;
  let x = 1;

  for (let i = 0; i < lines.length - 1; i++) {
    const line = lines[i].split(" ");

    const command = line[0];
    const value = line[1] ? parseInt(line[1]) : false;
    let cyclesNeeded = 0;

    switch (command) {
      case "noop":
        cyclesNeeded = 1;
        break;
      case "addx":
        cyclesNeeded = 2;
        break;
      default:
        console.error("Invalid command", command);
        break;
    }

    for (let e = 0; e < cyclesNeeded; e++) {
      cycles++;
      const ctr = (cycles - 1) - (Math.floor(cycles / 40) * 40);

      if (x - 1 == ctr || x == ctr || x + 1 == ctr) {
        linePrint += "#";
      } else {
        linePrint += " "; // I prefer using a space rather than a point
      }

      // Cycle: 0th, 60th, 100th, 140th, 180th and 220th 
      if (cycles % 40 == 0) {
        console.log(linePrint);
        linePrint = "";
      }
    }

    // Complete instruction
    if (value) {
      x += value
    }
  }
}

secondPart();
