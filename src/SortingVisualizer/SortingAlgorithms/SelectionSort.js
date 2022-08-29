import {swap} from "../Helpers/Swap.js"

export function selectionSort(array, animation){
    let size = array.length;
    for(let i = 0; i < size - 1; i++){
        let min_idx = i;
        for(let j = i + 1; j < size; j++){
            animation.push([0, min_idx, j]);
            if(array[j] < array[min_idx]){
                min_idx = j;
            }
        }
        animation.push([1, min_idx, i]);
        swap(array, min_idx, i);
    }
}