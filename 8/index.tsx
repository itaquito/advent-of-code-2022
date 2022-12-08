const fs = require("fs/promises");

async function firstPart() {
  const data = await fs.readFile("./input.txt", { encoding: "utf8" });

  const lines: string[] = data.split("\r\n");

  // Calculate the always visible edge trees.
  const edgeTrees = ((lines[0].length - 2) * 2) + ((lines.length - 1) * 2);
  console.log("Edge trees:", edgeTrees);

  // Parse input to an array
  const trees: number[][] = [];

  for (let i = 0; i < lines.length - 1; i++) {
    const line = lines[i];
    if (!trees[i]) trees.push([]);
    for (let e = 0; e < line.length; e++) {
      const tree = parseInt(line[e]);
      trees[i][e] = tree;
    }
  }

  let sum = edgeTrees;

  for (let i = 1; i < trees.length - 1; i++) {
    for (let e = 1; e < trees[i].length - 1; e++) {
      const tree = trees[i][e];

      const visibilityUp = checkVisibleUp(trees, tree, e, i);
      const visibilityDown = checkVisibleDown(trees, tree, e, i);
      const visibilityLeft = checkVisibleLeft(trees, tree, e, i);
      const visibilityRight = checkVisibleRight(trees, tree, e, i);

      console.log(`(${e},${i}) > Up:`, visibilityUp, "Down:", visibilityDown, "Left:", visibilityLeft, "Right:", visibilityRight);

      if (visibilityUp || visibilityDown || visibilityLeft || visibilityRight) sum++;
    }
  }

  console.log("Sum:", sum);
}

//firstPart();

function checkVisibleUp(trees: number[][], tree: number, x: number, y: number): boolean {
  for (let i = 0; i < y; i++) {
    const lineOfTrees = trees[i];

    if (lineOfTrees[x] >= tree) return false;
  }

  return true;
}

function checkVisibleDown(trees: number[][], tree: number, x: number, y: number): boolean {
  for (let i = y + 1; i < trees.length; i++) {
    const lineOfTrees = trees[i];

    if (lineOfTrees[x] >= tree) return false;
  }

  return true;
}

function checkVisibleLeft(trees: number[][], tree: number, x: number, y: number): boolean {
  const lineOfTrees = trees[y];

  for (let i = 0; i < x; i++) {
    if (lineOfTrees[i] >= tree) return false;
  }

  return true;
}

function checkVisibleRight(trees: number[][], tree: number, x: number, y: number): boolean {
  const lineOfTrees = trees[y];

  for (let i = x + 1; i < lineOfTrees.length; i++) {
    if (lineOfTrees[i] >= tree) return false;
  }

  return true;
}

async function secondPart() {
  const data = await fs.readFile("./input.txt", { encoding: "utf8" });

  const lines: string[] = data.split("\r\n");

  // Parse input to an array
  const trees: number[][] = [];
  const treeViews: number[] = [];

  for (let i = 0; i < lines.length - 1; i++) {
    const line = lines[i];
    if (!trees[i]) trees.push([]);
    for (let e = 0; e < line.length; e++) {
      const tree = parseInt(line[e]);
      trees[i][e] = tree;
    }
  }

  for (let i = 0; i < trees.length; i++) {
    for (let e = 0; e < trees[i].length; e++) {
      const tree = trees[i][e];

      const viewUp = checkViewUp(trees, tree, e, i);
      const viewDown = checkViewDown(trees, tree, e, i);
      const viewLeft = checkViewLeft(trees, tree, e, i);
      const viewRight = checkViewRight(trees, tree, e, i);

      console.log(`(${e},${i}) ${tree} > Up:`, viewUp, "Down:", viewDown, "Left:", viewLeft, "Right:", viewRight);

      treeViews.push(viewUp * viewDown * viewLeft * viewRight);
    }
  }

  const highestView = treeViews.sort((a, b) => b - a)[0];

  console.log("Highest view:", highestView);
}

function checkViewUp(trees: number[][], tree: number, x: number, y: number): number {
  let result = 0;
  for (let i = y - 1; i >= 0; i--) {
    const lineOfTrees = trees[i];

    if (lineOfTrees[x] < tree) result++;
    else if (lineOfTrees[x] >= tree) {
      result++;
      return result;
    }
  }

  return result;
}

function checkViewDown(trees: number[][], tree: number, x: number, y: number): number {
  let result = 0;
  for (let i = y + 1; i < trees.length; i++) {
    const lineOfTrees = trees[i];

    if (lineOfTrees[x] < tree) result++;
    else if (lineOfTrees[x] >= tree) {
      result++;
      return result;
    }
  }

  return result;
}

function checkViewLeft(trees: number[][], tree: number, x: number, y: number): number {
  let result = 0;
  const lineOfTrees = trees[y];

  for (let i = x - 1; i >= 0; i--) {
    if (lineOfTrees[i] < tree) result++;
    else if (lineOfTrees[i] >= tree) {
      result++;
      return result;
    }
  }

  return result;
}

function checkViewRight(trees: number[][], tree: number, x: number, y: number): number {
  let result = 0;
  const lineOfTrees = trees[y];

  for (let i = x + 1; i < lineOfTrees.length; i++) {
    if (lineOfTrees[i] < tree) result++;
    else if (lineOfTrees[i] >= tree) {
      result++;
      return result;
    }
  }

  return result;
}


secondPart();
