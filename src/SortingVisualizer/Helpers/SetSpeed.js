export function setSpeed(size, speed){
    console.log(size);
    if(size === 30){
        return (speed * 20);
    }else if (size === 100){
        return speed;
    }else{
        return speed / 2;
    }
}