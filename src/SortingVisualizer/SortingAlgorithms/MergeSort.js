export function mergeSort(array, left, right, animation){
    if(left >= right)
        return;
    let mid = left + parseInt((right - left) / 2);
    mergeSort(array, left, mid, animation);
    mergeSort(array, mid + 1, right, animation);
    merge(array, left, right, mid, animation);
}

function merge(array, left, right, mid, animation){
    var size1 = mid - left + 1;
    var size2 = right - mid;
    var arr1 = new Array(size1);
    var arr2 = new Array(size2);

    for(let i = 0; i < size1; i++){
        arr1[i] = array[left + i];
    }
    animation.push([0, left, mid]);
    for(let j = 0; j < size2; j++){
        arr2[j] = array[mid + 1 + j];
    }
    animation.push([0, mid + 1, right]);

    var i = 0, j = 0, k = left;
    while(i < size1 && j < size2){
        array[k++] = (arr1[i] <= arr2[j]) ? arr1[i++] : arr2[j++];
    }

    while(i < size1){
        array[k++] = arr1[i++];
    }
    while(j < size2){
        array[k++] = arr2[j++];
    }
    
    var tempAnimationArr = [1, left];
    for(let i = left; i <= right; i++){
        tempAnimationArr.push(array[i]);
    }
    animation.push(tempAnimationArr);
}