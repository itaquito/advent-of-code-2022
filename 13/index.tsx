const fs = require("fs/promises");

interface compareOutput {
  decision: boolean;
  reason: string;
}

async function firstPart() {
  const data = await fs.readFile("./input.txt", { encoding: "utf8" });

  const lines: string[] = data.split("\r\n");

  // Parse input
  const inputs = [];

  for (let i = 0; i < lines.length; i = i + 3) {
    const firstInput = JSON.parse(lines[i]);
    const secondInput = JSON.parse(lines[i + 1]);

    inputs.push({
      firstInput,
      secondInput
    });
  }

  // Start the actual process
  let sum = 0;
  for (let i = 0; i < inputs.length; i++) {
    console.log(`\n\n== Pair ${i + 1} ==`);
    const { firstInput, secondInput } = inputs[i];
    const result = compare(firstInput, secondInput);
    console.log(i, result);
    if (result?.decision) {
      sum += i + 1;
    }
  }

  console.log("Sum:", sum);
}

//firstPart();

async function secondPart() {
  const data = await fs.readFile("./input.txt", { encoding: "utf8" });

  const lines: string[] = data.split("\r\n");

  // Parse input
  const inputs = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;
    const input = JSON.parse(line);

    inputs.push(input);
  }

  // Divider packets
  inputs.push([[2]], [[6]]);

  // Start the actual process
  inputs.sort((a, b) => {
    if (compare(a, b)?.decision) return -1;

    return 1;
  });

  console.log(inputs);

  const firstDividerIndex = inputs.findIndex(e => JSON.stringify(e) == "[[2]]");
  const secondDividerIndex = inputs.findIndex(e => JSON.stringify(e) == "[[6]]");

  const result = (firstDividerIndex + 1) * (secondDividerIndex + 1)
  console.log("Result:", result);
}

secondPart();

function compare(firstInput: any[], secondInput: any[]): compareOutput | undefined {
  console.log(`- Compare ${JSON.stringify(firstInput)} vs ${JSON.stringify(secondInput)}`);
  for (let i = 0; i < firstInput.length; i++) {
    const left = firstInput[i];
    const right = secondInput[i];

    // Right ran out of items
    if (right == undefined) {
      console.log("- Right side ran out of items, so inputs are not in the right order", i, secondInput)
      return { decision: false, reason: "Right ran out of items" }
    };

    // Mixed types
    if (typeof left == "object" && typeof right == "number") {
      console.log(`- Mixed types; convert right to [${right}] and retry comparison`)
      const result = compare(left, [right]);
      if (result) return result;
      continue;
    } else if (typeof left == "number" && typeof right == "object") {
      console.log(`- Mixed types; convert left to [${left}] and retry comparison`);
      const result = compare([left], right);
      if (result) return result;
      continue;
    } else if (typeof left == "object" && typeof right == "object") {
      const result = compare(left, right);
      if (result) return result;
      continue;
    }

    // Both are numbers
    console.log(`- Compare ${left} vs ${right}`)
    if (left < right) {
      console.log("- Left side is smaller, so inputs are in the right order")
      return { decision: true, reason: `left (${left}) < right (${right})` };
    } else if (left > right) {
      console.log("- Right side is smaller, so inputs are not in the right order")
      return { decision: false, reason: `left (${left}) > right (${right})` };
    }
  }

  if (firstInput.length < secondInput.length) {
    console.log("- Left side ran out of items, so inputs are in the right order");
    return { decision: true, reason: "Left ran out of items" }; // Left ran out of items
  }

  //console.log("achu")
  //console.log("- Left side ran out of items, so inputs are in the right order");
  //return { decision: true, reason: "Left ran out of items" }; // Left ran out of items
}
