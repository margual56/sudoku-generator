import { Component } from "react";

import '../styles/toggle.scss';
import '../styles/toggle-text.scss';

class Toggle extends Component {
	constructor(props){
		super(props);

		this.state = {
			active: props.active || false,
			toggleCallback: props.onToggle || null
		};
	}

	toggleActive = () => {
		this.setState({active: !this.state.active}, () => {this.state.toggleCallback(this.state.active);});
	}

	render(){
		return (
			<div className="toggle">
				<p>Real-time correction: {this.state.active?"Enabled":"Disabled"}</p>

				<label className="switch">
					<input type="checkbox" onChange={this.toggleActive} checked={this.state.active}></input>
					<span className="slider round"></span>
				</label>
			</div>
		);
	}
}

export default Toggle;