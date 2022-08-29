import React from "react";
import './SortingVisualizer.css';
import { randomInt } from "./Helpers/RandomInt.js";
import { setSpeed } from "./Helpers/SetSpeed.js";
import { changeSpeed } from "./Helpers/ChangeSpeed.js";
import { bubbleSort } from './SortingAlgorithms/BubbleSort.js'
import { insertionSort } from "./SortingAlgorithms/InsertionSort.js";
import { selectionSort } from "./SortingAlgorithms/SelectionSort.js";
import { mergeSort } from "./SortingAlgorithms/MergeSort.js";
import { quickSort } from "./SortingAlgorithms/quickSort.js";
import { heapSort } from "./SortingAlgorithms/HeapSort.js";

export default class SortingVisualizer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            array: [],
            isRunning: false,
            size: 100,
            speed: 10,
        };
    }


    componentDidMount(){
        this.arrayReset();
    }

    arrayReset(size){
        const array = [];
        console.log(size)
        if(size === undefined){
            size = 100;
        }
        var width = (window.innerWidth / size) - 4.05;
        for(let i = 0; i < size; i++){
            array.push(randomInt(5, 1000));
        }
        array[randomInt(0, size - 1)] = 1000;
        this.setState({array});
        let bars = document.getElementsByClassName('value-bar');
        setTimeout(() => {
            for(let i = 0; i < size; i++){
                bars[i].style.backgroundColor = 'rgb(45, 138, 254)';
                bars[i].style.width = `${width}px`;
            }
        }, 30)
    }

    twoSort(sort, x){
        console.log(x);
        let array = this.state.array;
        let animation = [];
        // this.setState(bubbleSort(array));
        setTimeout(() => {
            sort(array, animation);
            this.updateTwoGraph(animation, x);},
            50);
    }

    mergeSort(x){
        let array = this.state.array;
        let animation = [];
        setTimeout(() => {
            mergeSort(array, 0, array.length - 1, animation);
            this.updateRange(animation, x);
        }, 50);
    }

    quickSort(x){
        let array = this.state.array;
        let animation = [];
        setTimeout(() => {
            quickSort(array, 0, array.length - 1, animation);
            this.updateTwoGraph(animation, x);
        }, 50)
    }

    updateRange(animation, x){
        var bars = document.getElementsByClassName('value-bar');
        var timeVal = 0;
        var height = window.innerHeight - 140;
        for(let i = 0; i < animation.length; i++){
            if(animation[i][0] === 0){
                let left = animation[i][1];
                let right = animation[i][2] + 1;
                for(let j = left; j < right; j++){
                    setTimeout(() => {
                        bars[j].style.backgroundColor = 'pink';
                    }, (timeVal++) * x);
                }
            }else{
                let left = animation[i][1];
                for(let j = 2; j < animation[i].length; j++){
                    setTimeout(() => {
                        bars[left + j - 2].style.backgroundColor = 'green';
                        bars[left + j - 2].style.height = `${animation[i][j] / 1000 * height}px`;
                    }, (timeVal++) * x);
                }
            }
        }
        for(let i = 0; i < bars.length; i++){
            setTimeout(() => bars[i].style.backgroundColor = 'red', (timeVal++) * x);
        }
        setTimeout(() => this.setState({isRunning: false}), timeVal * x);
    }

    updateTwoGraph(animation, x){
        console.log(x);
        var bars = document.getElementsByClassName('value-bar');
        for(let i = 0; i < bars.length; i++){
            bars[i].style.backgroundColor = 'rgb(45, 138, 254)';
        }
        for(let i = 0; i < animation.length; i++){
            let idx1 = animation[i][1];
            let idx2 = animation[i][2];
            setTimeout(() => {
                bars[idx1].style.backgroundColor = 'pink';
                bars[idx2].style.backgroundColor = 'pink';
            }, i * x)
            setTimeout(() => {
                bars[idx1].style.backgroundColor = 'rgb(45, 138, 254)';
                bars[idx2].style.backgroundColor = 'rgb(45, 138, 254)';
            }, (i + 1) * x)
            if(animation[i][0] === 1){
                setTimeout(() => {
                    let temp = bars[idx1].style.height
                    bars[idx1].style.height = bars[idx2].style.height;
                    bars[idx2].style.height = temp;
                }, (i + 1) * x)
            }
        }
        for(let i = 0; i < bars.length; i++){
            setTimeout(() => bars[i].style.backgroundColor = 'red', (animation.length + i) * x);
        }
        setTimeout(() => this.setState({isRunning: false}), animation.length * x);
    }

    setSpeed(speed){
        this.setState({
            speed: setSpeed(this.state.size, speed),
        });
    }

    setSize(size){
        const prevSize = this.state.size;
        const prevSpeed = this.state.speed;
        this.setState({
            size: size,
            speed: changeSpeed(prevSize, size, prevSpeed),
        });
        this.arrayReset(size);
    }

    render(){
        const array = this.state.array;
        const height = window.innerHeight - 140;

        return(
            <>
                <div className = "app-main">
                    <div className= 'header'>
                        <div className="header-left">
                            <div className = "title">
                                <h3>Sorting Algorithm Visualizer</h3>
                            </div>
                            <div className = "tool-bar">
                                <button className = "tool-bar-button" onClick={ !this.state.isRunning ? () => this.arrayReset(this.state.size) : null}>Generate New Array</button>
                                <button className = "tool-bar-button" onClick={ !this.state.isRunning ? () => {this.setState({isRunning: true}); this.twoSort(bubbleSort, this.state.speed)} : null}>Bubble Sort</button>
                                <button className = "tool-bar-button" onClick={ !this.state.isRunning ? () => {this.setState({isRunning: true}); this.twoSort(insertionSort, this.state.speed)} : null}>Insertion Sort</button>
                                <button className = "tool-bar-button" onClick={ !this.state.isRunning ? () => {this.setState({isRunning: true}); this.twoSort(selectionSort, this.state.speed)} : null}>Selection Sort</button>
                                <button className = "tool-bar-button" onClick={ !this.state.isRunning ? () => {this.setState({isRunning: true}); this.mergeSort(this.state.speed)} : null}>Merge Sort</button>
                                <button className = "tool-bar-button" onClick={ !this.state.isRunning ? () => {this.setState({isRunning: true}); this.quickSort(this.state.speed)} : null}>Quick Sort</button>
                                <button className = "tool-bar-button" onClick={ !this.state.isRunning ? () => {this.setState({isRunning: true}); this.twoSort(heapSort, this.state.speed)} : null}>Heap Sort</button>
                            </div>
                        </div>
                        <div className="header-right">
                            <div className="info">
                                <div></div>
                                <div>
                                    <a href="https://github.com/AaXDing/Sorting-Algorithm-Visualizer" target="_blank" rel="noreferrer">
                                        <svg width="40px" height="40px" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" transform="scale(64)" fill="#1B1F23"/>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            <div className= "sort-settings">
                                    <div className="sort-left">
                                        <div>Speed</div>
                                        <div className= "speed">
                                            <button className="tool-bar-button" onClick={ !this.state.isRunning ? () => this.setSpeed(20) : null}>Slow</button>
                                            <button className="tool-bar-button" onClick={ !this.state.isRunning ? () => this.setSpeed(10) : null}>Mid</button>
                                            <button className="tool-bar-button" onClick={ !this.state.isRunning ? () => this.setSpeed(5) : null}>Fast</button>
                                        </div>
                                    </div>
                                    <div className="sort-right">
                                        <div>Size</div>
                                        <div className= "size">
                                            <button className="tool-bar-button" onClick={ !this.state.isRunning ? () => {this.setSize(30)} : null}>Small</button>
                                            <button className="tool-bar-button" onClick={ !this.state.isRunning ? () => {this.setSize(100)} : null}>Mid</button>
                                            <button className="tool-bar-button" onClick={ !this.state.isRunning ? () => {this.setSize(200)} : null}>Large</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                    <div className = "bar-container">
                        {array.map((value, idx) => (
                            <div className="value-bar" key={idx} style={{height: `${value / 1000 * height}px`}}>
                            </div>
                        ))}
                    </div>
                </div>
            </>
        );
    }
}