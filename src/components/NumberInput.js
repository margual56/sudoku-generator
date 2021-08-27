import { Component } from "react";

class NumberInput extends Component {
	constructor(props){
		super(props);

		console.log(props.className);

		this.state = {
			correction: props.correction || null,
			classList: (props.className || "").split(' ')
		}
	}

	checkInput = (e) => {
		if(this.state.correction === null)
			return;

		let isCorrect = this.state.correction(e);
		
		let hasCorrect = this.state.classList.indexOf("correct");
		let hasWrong = this.state.classList.indexOf("wrong");
 
		if(isCorrect){
			if(hasCorrect === -1)
				this.state.classList.push("correct");

			if(hasWrong !== -1)
				this.state.classList.splice(hasWrong, 1);
		}else{
			if(hasWrong === -1)
				this.state.classList.push("wrong");

			if(hasCorrect !== -1)
				this.state.classList.splice(hasCorrect, 1);
		}

		this.forceUpdate();
	}

	render() {
		return (
			<textarea 
				className={this.state.classList.join(" ")}
				onBlur={(e) => this.checkInput(e)} 
				maxLength={1} 
				cols={1} 
				rows={1}
			>
			</textarea>
		);
	}
}

export default NumberInput;