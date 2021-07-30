import React from 'react';
import './SortingVisualizer.css';
import { getMergeSortAnimations } from '../SortingAlgorithms/MergeSort.js';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 2;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            array: [],
        };
    }

    componentDidMount(){
        this.resetArray();
    }

    // create an array
    resetArray(){
        const array = [];
        for(let i = 0; i < 280; i++){
            array.push(randomIntFromInterval(5, 500));
        }
        // reset the state to have the new array
        this.setState({array});
    }

    // sorting algorithms
    // merge sort
    mergeSort(){
        const animations = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
                // SetTimeout: https://www.youtube.com/watch?v=nGfTjA8qNDA
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    
    quickSort(){

    }

    heapSort(){

    }

    render(){
        const {array} = this.state;
        return(
            <div className="array-container">
                {array.map((value, idx) => (
                    <div className="array-bar" 
                     key={idx}
                     style={{height: `${value}px`}}></div>
                ))}
            <button onClick={() => this.resetArray()}>Generate New Array</button>
            <button onClick={() => this.mergeSort()}>Merge Sort</button>
    
            </div>
        );
    }
}

function randomIntFromInterval (min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

