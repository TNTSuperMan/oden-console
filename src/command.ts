import { readFile } from "oden";
import { clear, printString } from "./terminal";

const commands: {
    [key: string]: void | ((args: string[]) => void)
} = {
    "clear": () => clear(),
    "help": () => printString(`
clear - Clear screen
help - Get command help
exit - Exit terminal
`),
    "cat": () => {
        
    }
}

export var executeCommand = (cmd: string) => {
    const cmds = cmd.split(" ");
    if(!cmds.length) return;
    const name = cmds[0]!;
    if(commands[name]){
        cmds.splice(1);
        commands[name]!(cmds);
    }else{
        try {
            const f = readFile(name);
        } catch {
            printString(`Not found file or command: ${cmds[0]}\n`);
        }
    }
}
