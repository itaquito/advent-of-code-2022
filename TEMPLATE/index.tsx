const fs = require("fs/promises");

async function main() {
  const data = await fs.readFile("./input.txt", { encoding: "utf8" });

  const lines: string[] = data.split("\r\n");
}

main();
