import { Component } from 'react';

import './styles/sudoku.scss';

class Sudoku extends Component {
	mat = null;
	matIncomplete = null;
	N = 9; // number of columns/rows.
	K = 60; // No. Of missing digits
	SRN = -1; // square root of N
	showComplete = false;

    // Constructor
    constructor(props) {
		super(props);

		let tmp = Array(this.N);
		for(let i = 0; i<this.N; i++){
			tmp[i] = Array(this.N);

			for(let j = 0; j<this.N; j++){
				tmp[i][j] = 0;
			}
		}

        // Compute square root of N
        this.SRN = Math.sqrt(this.N);
		this.mat = tmp;

		//window.requestIdleCallback(() => this.map = this.solve(this.mat));
		for(let i = 0; i<3; i++)
			this.mat[Math.floor(Math.random()*9)][Math.floor(Math.random()*9)] = 1+Math.floor(Math.random()*9);
		
		this.mat = this.solve(this.mat);
		this.matIncomplete = clone(this.mat);

		this.matIncomplete = this.unSolveK(this.matIncomplete, this.K);
    }

	reload = () => {
		let tmp = Array(this.N);
		for(let i = 0; i<this.N; i++){
			tmp[i] = Array(this.N);

			for(let j = 0; j<this.N; j++){
				tmp[i][j] = 0;
			}
		}

        // Compute square root of N
        this.SRN = Math.sqrt(this.N);
		this.mat = tmp;

		//window.requestIdleCallback(() => this.map = this.solve(this.mat));
		for(let i = 0; i<3; i++)
			this.mat[Math.floor(Math.random()*9)][Math.floor(Math.random()*9)] = 1+Math.floor(Math.random()*9);
		
		this.mat = this.solve(this.mat);

		this.matIncomplete = clone(this.mat);
		this.matIncomplete = this.unSolveK(this.matIncomplete, this.K);
	}
 
	shuffle = (array) => {
		var currentIndex = array.length,  randomIndex;
	  
		// While there remain elements to shuffle...
		while (currentIndex !== 0) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;
		
			// And swap it with the current element.
			[array[currentIndex], array[randomIndex]] = [
			array[randomIndex], array[currentIndex]];
		}
	  
		return array;
	}

	nextEmptySpot = (mat) => {
		for (let i = 0; i < 9; i++) {
			for (let j = 0; j < 9; j++) {
				if (mat[i][j] === 0) 
					return [i, j];
			}
		}

		return [-1, -1];
	}

    checkRow = (mat, row, value) => {
		for(let i = 0; i < mat[row].length; i++) {
			if(mat[row][i] === value) {
				return false;
			}
		}
	   
		return true;
	}

	checkColumn = (mat, column, value) => {
		for(let i = 0; i < mat.length; i++) {
			if(mat[i][column] === value) {
				return false;
			}
		}
	
		return true;
	}

	checkSquare = (mat, row, column, value) => {
		let boxRow = Math.floor(row / 3) * 3;
		let boxCol = Math.floor(column / 3) * 3;
		
		for (var r = 0; r < 3; r++){
			for (var c = 0; c < 3; c++){
				if (mat[boxRow + r][boxCol + c] === value)
					return false;
			}
		}

		return true;
	}

	checkValue = (mat, row, column, value) => {
		if(this.checkRow(mat, row, value) &&
			this.checkColumn(mat, column, value) &&
			this.checkSquare(mat, row, column, value)) {
			return true;
		}
		
		return false; 
	}

	randNum = () => {
		return Math.floor(Math.random()*this.N)+1;
	}

	solve = (mat) => {
		let emptySpot = this.nextEmptySpot(mat);
		let row = emptySpot[0];
		let col = emptySpot[1];
		
		// there is no more empty spots
		if (row === -1){
			return mat;
		}

		let nums = this.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
		nums.forEach(num => {
			if(this.checkValue(mat, row, col, num)){
				mat[row][col] = num;
				this.solve(mat);
			}
		});

		if (this.nextEmptySpot(mat)[0] !== -1)
			mat[row][col] = 0;
	
		return mat;
	}

	unSolveK = (matrix, K) => {
		let m = [...matrix];
		for(let i = 0; i<K; i++){
			let randX, randY;

			do{
				randX = Math.floor(Math.random()*this.N);
				randY = Math.floor(Math.random()*this.N);
			}while(m[randX][randY] === -1);

			m[randX][randY] = -1;
		}

		return m;
	}

	toggleComplete = () => {
		this.showComplete = !this.showComplete;
	}

	render(){
		let rows;
		
		if(this.showComplete){
			rows = this.mat.map((item, i) => {
				let entry = item.map((element, j) => {
					return ( 
						<td key={j}>{element}</td>
					);
				});
				return (
					<tr key={i}>{entry}</tr>
				);
			});
		}else{
			rows = this.matIncomplete.map((item, i) => {
				let entry = item.map((element, j) => {
					if(element !== -1){
						return ( 
							<td key={j}>{element}</td>
						);
					}else{
						return (
							<td className="empty" key={j}><textarea></textarea></td>
						);
					}
				});
				return (
					<tr key={i}>{entry}</tr>
				);
			});
		}

		let btnText = this.showComplete?"Hide solution":"Show solution";

		return (
			<div className="sudoku-container">
				<table className="sudoku">
					<tbody>
					{rows}
					</tbody>
				</table>

				<div className="buttons">
					<button onClick={()=>{
							this.reload(); 
							this.forceUpdate(); 
							console.log("reloading");
						}}>Refresh</button>

					<button onClick={()=>{
							this.toggleComplete(); 
							this.forceUpdate();
							console.log(this.showComplete?"Showing solution":"Hiding solution");
						}}>{btnText}</button>
				</div>

			</div>
		);
	}
}

const clone = (items) => items.map(item => Array.isArray(item) ? clone(item) : item);

export default Sudoku;