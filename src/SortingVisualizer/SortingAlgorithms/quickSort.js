import { swap } from "../Helpers/Swap.js";

export function quickSort(array, low, high, animation){
    if(low < high){
        let pivot = partition(array, low, high, animation);
        quickSort(array, low, pivot - 1 , animation);
        quickSort(array, pivot + 1, high, animation);
    }
}

function partition(array, low, high, animation){
    var pivot = array[high];
    var i = low;
    for(let j = low; j < high; j++){
        animation.push([0, i, j])
        if(array[j] < pivot){
            animation[animation.length - 1][0] = 1;
            swap(array, i++, j);
        }
    }
    animation.push([1, i, high]);
    swap(array, i, high);
    return i;
}