import { setSpeed } from "./SetSpeed.js"

export function changeSpeed(prevSize, newSize, speed){
    if(prevSize === 100){
        return setSpeed(newSize, speed);
    }else if(prevSize === 200){
        return setSpeed(newSize, speed * 2);
    }else{
        return setSpeed(newSize, speed / 10);
    }
}