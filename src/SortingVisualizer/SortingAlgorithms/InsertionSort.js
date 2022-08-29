import {swap} from '../Helpers/Swap.js';

export function insertionSort(array, animation){
    for(let i = 1; i < array.length; i++){
        let j = i - 1;
        while(j >= 0 && array[j] > array[j + 1]){
            animation.push([1, j, j + 1]);
            swap(array, j, j + 1);
            j--;
        }
    }
}