const chalk = require('chalk');

// console.log(chalk.red('coba chalk'));
const topBorder = chalk.red('######################################################################');
// const caption = [
//     "                                                                    ",
//     "*       *  ******   **        **      *****   **  ******  ***    ***",
//     " *     *   **       **      **  **  ***       **    **      **  **  ",
//     "  *   *    ******   **      **  **  ***       **    **        **    ",
//     "   ***     **       **      **  **  ***       **    **        **    ",
//     "    *      ******   ******    **      *****   **    **        **    "
// ];

// const caption = [
//     "\n",  
//     "\n",  
//     "\n", 
//  ".----------------.  .----------------.  .----------------.  .----------------. ",
//  "| .--------------. || .--------------. || .--------------. || .--------------. |",
//  "| | ____   ____  | || |  _________   | || |   _____      | || |     ____     | |",
//  "| ||_  _| |_  _| | || | |_   ___  |  | || |  |_   _|     | || |   .'    `.   | |",
//  "| |  \ \   / /   | || |   | |_  \_|  | || |    | |       | || |  /  .--.  \  | |",
//  "| |   \ \ / /    | || |   |  _|  _   | || |    | |   _   | || |  | |    | |  | |",
//  "| |    \ ' /     | || |  _| |___/ |  | || |   _| |__/ |  | || |  \  `--'  /  | |",
//  "| |     \_/      | || | |_________|  | || |  |________|  | || |   `.____.'   | |",
//  "| |              | || |              | || |              | || |              | |",
//  "| '--------------' || '--------------' || '--------------' || '--------------' |",
//  " '----------------'  '----------------'  '----------------'  '----------------' "
// ];

const caption = [
    "\n",  
    "\n",
    "           dP     dP  88888888b dP         .88888. ",
    "           88     88  88        88        d8'   `8b",
    "           88    .8P a88aaaa    88        88     88",
    "           88    d8'  88        88        88     88",
    "           88  .d8P   88        88        Y8.   .8P",
    "           888888'    88888888P 88888888P  `8888P' "
];



const logo = [
    "                                                       ",
    "           ///////////////////////////////////////////",
    "           //////  ////           ////            ////",
    "           //////  ////  ////////////////    /////////",
    "           //////  ////           ///////    /////////",
    "           //////  /////////////  ///////    /////////",
    "           //////  ////           ///////    /////////",
    "           ///////////////////////////////////////////",
    "                                                       "
]
const bottomBorder = chalk.red('######################################################################');
const insideBanner = caption.join('\n');
const logoIst = logo.join('\n');

console.log(topBorder);
console.log(chalk.rgb(3, 252, 240)(insideBanner));
console.log(chalk.rgb(252, 128, 3)(logoIst));
console.log(bottomBorder)