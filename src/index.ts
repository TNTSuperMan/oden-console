import { closeWindow, readEvent } from "oden";
import { executeCommand } from "./command";
import { back, draw, layer_id, printString } from "./terminal";

let input = "";

printString("> ")

while(true){
    draw();
    const ev = readEvent();
    if(ev.type === "keypush" && ev.press){
        if(ev.ascii === "\b"){
            back(1);
            input = input.substring(0, input.length-1);
        }else{
            printString(ev.ascii);
            if(ev.ascii !== "\n") input += ev.ascii;
            else if(input == "exit") break;
            else {
                executeCommand(input);
                input = "";
                printString("> ");
            }
        }
    }else if(ev.type === "quit"){
        break;
    }
}

closeWindow(layer_id);
