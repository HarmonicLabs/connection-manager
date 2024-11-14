import { execSync } from "child_process";
import { Command } from "commander";

const program = new Command();

program
    .name("server")
    .description("Mutexo Web Socket Server CLI")
    .version("0.0.1");

program
    .command("start")
    .description("starts the Connection Manager")
    .action(() => {
        execSync(`node ./dist/src/index.js`, { stdio: "inherit" })
    });

program.parse();