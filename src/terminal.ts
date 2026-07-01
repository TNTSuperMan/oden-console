import { drawRectangle, drawString, openWindow, redrawWindow } from "oden";
import { stringHeight, stringWidth, windHeight, windWidth } from "./consts";

export const layer_id = openWindow(
    windWidth,
    windHeight,
    0, 0, "OdenTerm");

let stdout: string[] = [""];
let scroll = 0;

export function draw(){
    //drawRectangle(layer_id, 4, 24, windWidth-8, windHeight-28, 0x000000);
    stdout.slice(scroll, stringHeight + scroll).reverse().forEach((e,i)=>{
        drawString(layer_id, 8, i * 16 + 28, 0xFFFFFF, e);
    })
    redrawWindow(layer_id);
}

export function clear(){
    stdout = [""];
    scroll = 0;
}

export function back(count = 1){
    const t = stdout[0]!;
    stdout[0] = t.substring(0, t.length-count);
    if(stdout[0]!.length == 0 && stdout.length > 1)
        stdout.shift();
    draw();
}

function wrap(){    
    let len = 0;
    const t = stdout[0]!;
    for(let i = 0;i < t.length;i++){
        len += (t[i]!.charCodeAt(0)>0x7f) ? 2 : 1;
        if(len > stringWidth){
            stdout.unshift(t.substring(i));
            stdout[1]! = t.substring(0, i);
            return;
        }
    }
}

export function printString(str: string){
    for(let i = 0;i < str.length;i++){
        if(str[i]! !== "\n"){
            stdout[0] += str[i]!;
        }else{
            wrap();
            stdout.unshift("");
        }
    }
    wrap();
}

export function print(...args: unknown[]){
    args.forEach(e=>{
        if(e === null) printString("null\n");
        switch(typeof e){
            case "object": printString(Object.prototype.toString.call(e)+"\n"); break;
            case "undefined": printString("undefined\n"); break;
            case "boolean": printString(e ? "true\n" : "false\n"); break;
            case "number": case "function": case "string": case "symbol":
                printString(e.toString() + "\n"); break;
        }
    })
}
