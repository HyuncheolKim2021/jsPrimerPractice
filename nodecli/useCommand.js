const program = require("commander");
const path = require("path");

program.parse(process.argv);
const cliCommand = program.args[0];
let extension = path.extname(cliCommand);

if (extension === '.md')
    console.log(`file extension confirmed!`)
else 
    console.log(`failed to read Markdown file...`)