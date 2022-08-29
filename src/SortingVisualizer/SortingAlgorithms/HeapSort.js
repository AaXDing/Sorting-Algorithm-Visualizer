import { swap } from "../Helpers/Swap.js";

export function heapSort(array, animation){
    var size = array.length;
    for(let i = Math.floor(size / 2) - 1; i >= 0; i--){
        heapify(array, size, i, animation);
    }
    for(let i = size - 1; i > 0; i--){
        animation.push([1, i, 0]);
        swap(array, i, 0);
        heapify(array, i, 0, animation);
    }
}

function heapify(array, size, i, animation){
    var largest = i;
    var left = 2 * i + 1;
    var right = 2 * i + 2;

    if(left < size && array[left] > array[largest]){
        largest = left;
    }
    if(right < size && array[right] > array[largest]){
        largest = right;
    }

    animation.push([0, i, largest]);
    if(largest !== i){
        animation[animation.length - 1][0] = 1;
        swap(array, i, largest);
        heapify(array, size, largest, animation);
    }
}