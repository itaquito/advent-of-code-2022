const fs = require("fs/promises");

async function firstPart() {
  const data = await fs.readFile("./input.txt", { encoding: "utf8" });

  const lines: string[] = data.split("\r\n");

  let route: string[] = [];
  const dirSizes: object = {};

  for (let i = 0; i < lines.length - 1; i++) {
    const line = lines[i];

    // Handle change directory
    if (line.startsWith("$ cd")) {
      const dir = line.split(" ")[2];
      if (dir == "/") {
        console.log(">> Returning to /");
        route = [];
        continue;
      }

      if (dir == "..") {
        console.log(">> Returning one directory");
        route.pop();
        continue;
      }

      console.log(">> Entering", dir);
      route.push(dir);
      continue;
    }

    // Handle listing directory
    if (line.startsWith("$ ls")) {
      // Read until a command is found
      do {
        i++;
        if (lines[i].startsWith("dir")) continue;

        const size = parseInt(lines[i].split(" ")[0]);

        // Since there might be directories with duplicated names, we save the whole directory as the name of the directory
        for (let e = route.length; e >= 0; e--) {

          const fullDirName = route.slice(0, e).join(".");

          if (!(dirSizes as any)[fullDirName]) {
            (dirSizes as any)[fullDirName] = size;
          } else {
            (dirSizes as any)[fullDirName] += size;
          }
        }

        console.log(route, lines[i]);
      } while (lines[i + 1] && !lines[i + 1].startsWith("$"))
    }
  }

  console.log(dirSizes);

  // Time to calculate the result
  const keys = Object.keys(dirSizes);

  let result = 0;
  for (let i = 0; i < keys.length; i++) {
    const dir = keys[i];

    if ((dirSizes as any)[dir] <= 100000) {
      result += (dirSizes as any)[dir];
    }
  }

  console.log("Result:", result);
}

//firstPart();

async function secondPart() {
  const data = await fs.readFile("./input.txt", { encoding: "utf8" });

  const lines: string[] = data.split("\r\n");

  let route: string[] = [];
  const dirSizes: object = {};

  for (let i = 0; i < lines.length - 1; i++) {
    const line = lines[i];

    // Handle change directory
    if (line.startsWith("$ cd")) {
      const dir = line.split(" ")[2];
      if (dir == "/") {
        console.log(">> Returning to /");
        route = [];
        continue;
      }

      if (dir == "..") {
        console.log(">> Returning one directory");
        route.pop();
        continue;
      }

      console.log(">> Entering", dir);
      route.push(dir);
      continue;
    }

    // Handle listing directory
    if (line.startsWith("$ ls")) {
      // Read until a command is found
      do {
        i++;
        if (lines[i].startsWith("dir")) continue;

        const size = parseInt(lines[i].split(" ")[0]);

        // Since there might be directories with duplicated names, we save the whole directory as the name of the directory
        for (let e = route.length; e >= 0; e--) {

          const fullDirName = route.slice(0, e).join(".");

          if (!(dirSizes as any)[fullDirName]) {
            (dirSizes as any)[fullDirName] = size;
          } else {
            (dirSizes as any)[fullDirName] += size;
          }
        }

        console.log(route, lines[i]);
      } while (lines[i + 1] && !lines[i + 1].startsWith("$"))
    }
  }

  const freeSpace = 70000000 - (dirSizes as any)[""];
  const spaceNeeded = 30000000 - freeSpace;

  const possibleDirs = [];
  const keys = Object.keys(dirSizes);
  for (let e = 0; e < keys.length; e++) {
    const dir = (dirSizes as any)[keys[e]];

    // Save only the space of the possible dirs that could be deleted.
    if (dir >= spaceNeeded) possibleDirs.push(dir);
  }

  // Sort to find the smalles dir
  const result = possibleDirs.sort((a, b) => a - b)[0];

  console.log("Result:", result);
}

secondPart();
