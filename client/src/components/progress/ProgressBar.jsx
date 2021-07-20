import './progressbar.css';

const ProgressBar = ({ color, backgroundColor, completed }) => {
	const container = {
		height: 20,
		width: `100%`,
		backgroundColor: backgroundColor,
	};

	const fill = {
		height: `100%`,
		width: `${completed}%`,
		backgroundColor: color,
		transition: `width 0.5s ease-in-out`,
	};

	return (
		<div style={container}>
			<div style={fill}></div>
		</div>
	);
};

export default ProgressBar;
