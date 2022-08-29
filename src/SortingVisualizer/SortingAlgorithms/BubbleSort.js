import { swap } from '../Helpers/Swap.js';

export function bubbleSort(array, animation){
    let size = array.length;
    for(let i = 0; i < size - 1; i++){
        for(let j = 0; j < size - i - 1; j++){
            animation.push([0, j, j + 1]);
            if(array[j] > array[j + 1]){
                animation[animation.length - 1][0] = 1;
                swap(array, j, j + 1);
            }
        }
    }
}