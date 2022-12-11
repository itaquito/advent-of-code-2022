const fs = require("fs/promises");

interface monkey {
  items: number[];
  operationFormat: string[];
  test: number;
  ifTrue: number;
  ifFalse: number;
  itemsInspected: number;
}

interface monkeyBig {
  items: bigint[];
  operationFormat: string[];
  test: bigint;
  ifTrue: number;
  ifFalse: number;
  itemsInspected: number;
}

async function firstPart() {
  const data = await fs.readFile("./input.txt", { encoding: "utf8" });

  const lines: string[] = data.split("\r\n");

  // Parse input
  const monkeys: monkey[] = [];
  for (let i = 0; i < lines.length - 1; i += 7) {
    const currentMonkey: monkey = {
      items: lines[i + 1].trim().split(" ").slice(2).map(e => parseInt(e)),
      operationFormat: lines[i + 2].trim().split(" ").slice(3),
      test: parseInt(lines[i + 3].trim().split(" ")[3]),
      ifTrue: parseInt(lines[i + 4].trim().split(" ")[5]),
      ifFalse: parseInt(lines[i + 5].trim().split(" ")[5]),
      itemsInspected: 0
    }

    monkeys.push(currentMonkey);
  }

  // Execute the actions
  for (let m = 0; m < 20; m++) {
    console.log(`>> Round ${m + 1}:`);
    for (let i = 0; i < monkeys.length; i++) {
      console.log(`Monkey ${i}:`);
      const { items, operationFormat, test, ifTrue, ifFalse } = monkeys[i];
      for (let e = 0; e < items.length; e++) {
        monkeys[i].itemsInspected++;
        const item = items[e];
        console.log(`  Monkey inspects an item with a worry level of ${item}.`);

        const newWorryLevel = calculateWorryLevel(operationFormat, item);
        console.log(`    Worry level is ${operationFormat.join(" ")} to ${newWorryLevel}.`);

        const boredWorryLevel = Math.floor(newWorryLevel / 3);
        console.log(`    Monkey gets bored with item. Worry level is divided by 3 to ${boredWorryLevel}.`);

        if (boredWorryLevel % test == 0) {
          console.log(`    Current worry level is divisible by ${test}.`);
          monkeys[ifTrue].items.push(boredWorryLevel);
          console.log(`    Item with worry level ${boredWorryLevel} is thrown to monkey ${ifTrue}.`);
        } else {
          console.log(`    Current worry level is not divisible by ${test}.`);
          monkeys[ifFalse].items.push(boredWorryLevel);
          console.log(`    Item with worry level ${boredWorryLevel} is thrown to monkey ${ifFalse}.`);
        }
      }

      items.length = 0;
    }
    console.log(`>> End of round ${m + 1}:`);
    console.log(monkeys);
  }

  // Calculate result
  monkeys.sort((a, b) => b.itemsInspected - a.itemsInspected);

  const result = monkeys[0].itemsInspected * monkeys[1].itemsInspected;

  console.log("Result:", result);
}

//firstPart();

async function secondPart() {
  const data = await fs.readFile("./input.test.txt", { encoding: "utf8" });

  const lines: string[] = data.split("\r\n");

  // Parse input
  const monkeys: monkeyBig[] = [];
  for (let i = 0; i < lines.length - 1; i += 7) {
    const currentMonkey: monkeyBig = {
      items: lines[i + 1].trim().split(" ").slice(2).map(e => BigInt(parseInt(e))),
      operationFormat: lines[i + 2].trim().split(" ").slice(3),
      test: BigInt(parseInt(lines[i + 3].trim().split(" ")[3])),
      ifTrue: parseInt(lines[i + 4].trim().split(" ")[5]),
      ifFalse: parseInt(lines[i + 5].trim().split(" ")[5]),
      itemsInspected: 0
    }

    monkeys.push(currentMonkey);
  }

  // Execute the actions
  for (let m = 0; m < 10000; m++) {
    console.log(`>> Round ${m + 1}:`);
    for (let i = 0; i < monkeys.length; i++) {
      //console.log(`Monkey ${i}:`);
      const { items, operationFormat, test, ifTrue, ifFalse } = monkeys[i];
      for (let e = 0; e < items.length; e++) {
        monkeys[i].itemsInspected++;
        const item = items[e];
        //console.log(`  Monkey inspects an item with a worry level of ${item}.`);

        const newWorryLevel = calculateWorryLevelBigInt(operationFormat, item);
        //console.log(`    Worry level is ${operationFormat.join(" ")} to ${newWorryLevel}.`);

        //const boredWorryLevel = Math.floor(newWorryLevel / 3);
        //console.log(`    Monkey gets bored with item. Worry level is divided by 3 to ${boredWorryLevel}.`);

        if (!(newWorryLevel % test)) {
          //console.log(`    Current worry level is divisible by ${test}.`);
          monkeys[ifTrue].items.push(newWorryLevel);
          //console.log(`    Item with worry level ${newWorryLevel} is thrown to monkey ${ifTrue}.`);
        } else {
          //console.log(`    Current worry level is not divisible by ${test}.`);
          monkeys[ifFalse].items.push(newWorryLevel);
          //console.log(`    Item with worry level ${newWorryLevel} is thrown to monkey ${ifFalse}.`);
        }
      }

      items.length = 0;
    }
    console.log(`>> End of round ${m + 1}:`);
    //console.log(monkeys);
  }

  // Calculate result
  monkeys.sort((a, b) => b.itemsInspected - a.itemsInspected);

  const result = monkeys[0].itemsInspected * monkeys[1].itemsInspected;

  console.log("Result:", result);
}

secondPart();

function calculateWorryLevel(operationFormat: string[], old: number): number {
  const firstNumber = operationFormat[0] == "old" ? old : parseInt(operationFormat[0]);
  const symbol = operationFormat[1];
  const secondNumber = operationFormat[2] == "old" ? old : parseInt(operationFormat[2]);

  switch (symbol) {
    case "+":
      return firstNumber + secondNumber;
    case "-":
      return firstNumber - secondNumber;
    case "*":
      return firstNumber * secondNumber;
    case "/": // Not sure if this appears on the input...
      return firstNumber / secondNumber;
    default:
      console.error("Invalid operation symbol", symbol);
      return -1
  }
}

function calculateWorryLevelBigInt(operationFormat: string[], old: bigint): bigint {
  const firstNumber = operationFormat[0] == "old" ? old : BigInt(parseInt(operationFormat[0]));
  const symbol = operationFormat[1];
  const secondNumber = operationFormat[2] == "old" ? old : BigInt(parseInt(operationFormat[2]));

  switch (symbol) {
    case "+":
      return firstNumber + secondNumber;
    case "-":
      return firstNumber - secondNumber;
    case "*":
      return firstNumber * secondNumber;
    default:
      console.error("Invalid operation symbol", symbol);
      return BigInt(0);
  }
}
