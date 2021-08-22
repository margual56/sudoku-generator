import { Component } from 'react';

import './styles/sudoku.scss';

class Sudoku extends Component {
	mat = null;
	N = 9; // number of columns/rows.
	K = 10; // No. Of missing digits
	SRN = -1; // square root of N

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

        this.fillValues();
    }
 
    // Sudoku Generator
    fillValues() {
        // Fill the diagonal of SRN x SRN matrices
        console.log(this.fill(0, 0, [1, 2, 3, 4, 5, 6, 7, 8, 9]));
 
        // Fill remaining blocks
        //this.fillRemaining(0, 3);
 
        // Remove Randomly K digits to make game
        //this.removeKDigits();
    }
 
	fill(i, j, numbers){
		let num;
		let count = 0;

		if(i >= 9 && j >= 9){
			console.log("finished");
			return true;
		}

		let newI = i+1;
		let newJ = j;

		if(newI >= 9){
			newI = 0;
			newJ++;
		}

		let tmp = numbers;

		do{
			//console.log("Iteration: " + count);
			if (count >= numbers.length) return false;

			num = numbers[count];
			count++
		}while(!this.checkIfSafe(i, j, num));

		console.log("Chosen number: " + num);
		//console.log(tmp);

		delete tmp[count];
		
		if(this.fill(newI, newJ, tmp)){
			this.mat[i][j] = num;
			return true;
		}else{

			this.mat[i][j] = 0;

			let prevI = i-1;
			let prevJ = j;

			if(prevI < 0){
				prevI = 8;
				prevJ = j-1;
			}

			return this.fill(prevI, prevJ, tmp);
		}
	}


    // Returns false if given 3 x 3 block contains num.
    unUsedInBox(rowStart, colStart, num) {
        for (let i = 0; i<this.SRN; i++)
            for (let j = 0; j<this.SRN; j++)
                if (this.mat[rowStart+i][colStart+j]===num)
                    return false;
 
        return true;
    }
 
    // Check if safe to put in cell
    checkIfSafe(i, j, num) {
        return (this.unUsedInRow(i, num) &&
				this.unUsedInCol(j, num) &&
				this.unUsedInBox(i-i%this.SRN, j-j%this.SRN, num));
    }
 
    // check in the row for existence
    unUsedInRow(i, num) {
        for (let j = 0; j<this.N; j++)
           if (this.mat[i][j] === num)
                return false;
        return true;
    }
 
    // check in the row for existence
    unUsedInCol(j, num) {
        for (let i = 0; i<this.N; i++)
            if (this.mat[i][j] === num)
                return false;
        return true;
    }
 
    // Remove the K no. of digits to
    // complete game
    removeKDigits() {
        let count = this.K;
        while (count !== 0) {

            let cellId = this.randomGenerator(this.N*this.N)-1;
 
            // System.out.prletln(cellId);
            // extract coordinates i  and j
            let i = (cellId/this.N);
            let j = cellId%9;
            if (j !== 0)
                j = j - 1;
 
            // System.out.prletln(i+" "+j);
            if (this.mat[i][j] !== 0) {

                count--;
                this.mat[i][j] = 0;
            }
        }
    }

	render(){
		let rows = this.mat.map((item, i) => {
            let entry = item.map((element, j) => {
                return ( 
                    <td key={j}>{element}</td>
                );
            });
            return (
                <tr key={i}>{entry}</tr>
             );
        });

		return (
			<table className="sudoku">
				<tbody>
				{rows}
				</tbody>
			</table>
		);
	}
}
export default Sudoku;