#! /usr/bin/env node 
import inquirer from "inquirer";
import { differenceInSeconds } from "date-fns";
const response = await inquirer.prompt([
    {
        type: "number",
        name: "userinput",
        message: "please enter the amount of seconds(0-60)",
        validate: (input) => {
            if (isNaN(input)) {
                return "please enter valid number";
            }
            else if (input > 60) {
                return "second must be in 60";
            }
            else {
                return true;
            }
        }
    },
]);
let input = response.userinput;
function startTime(value) {
    const intTime = new Date().setSeconds(new Date().getSeconds() + value);
    const intervalTime = new Date(intTime);
    setInterval(() => {
        const currentTime = new Date();
        const timeDiff = differenceInSeconds(intervalTime, currentTime);
        if (timeDiff <= 0) {
            console.log("Timer has expired");
            process.exit();
        }
        const minute = Math.floor((timeDiff % (3600 * 24)) / 3600);
        const second = Math.floor(timeDiff % 60);
        console.log(`${minute.toString().padStart(2, "0")}: ${second.toString().padStart(2, "0")}`);
    }, 1000);
}
startTime(input);
