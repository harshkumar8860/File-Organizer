#!/usr/bin/env node

let helpObj = require("./command/help");
let treeObj = require("./command/tree");
let organizeObj = require("./command/organize");

let inputArr = process.argv.slice(2);
let command = inputArr[0];

switch (command) {
    case "help":
        // console.log("Help implemented");
        helpObj.helpfxn();
        break;
    case "tree":
        // console.log("Tree implemented",inputArr[1]);
        treeObj.treefxn(inputArr[1]);
        break;
    case "organize":
        // console.log("Organize implemented",inputArr[1])
        organizeObj.organizefxn(inputArr[1]);
        break;
    default:
        console.log("🙏 kindly enter help to see the correct cmd")
        break;
}


// main input
// input -> node main.js tree "path"
// Print ->tree command executed with path ""
// input -> node main.js organize "path"
// Print ->organize command exucuted with path ""
// input -> node main.js help
    // Print -> list of all the commands
        // 1. node main.js tree "path"
        // 2. node main.js organize "path"
        // 3. node main.js help  

