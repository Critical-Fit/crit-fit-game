import './progressbar.css';

const ProgressBar = ({
	fillColor,
	backgroundColor,
	borderColor,
	completed,
}) => {
	const bar = {
		height: 20,
		width: `100%`,
		backgroundColor: backgroundColor,
		borderRadius: 5,
		border: `1px solid ${borderColor}`,
		boxShadow: `0 0 10px ${borderColor}`,
		margin: `5px 0px`,
	};

	const fill = {
		height: `100%`,
		width: `${completed}%`,
		borderRadius: `inherit`,
		backgroundColor: fillColor,
		transition: `width 0.5s ease-in-out`,
	};

	return (
		<div style={bar}>
			<div style={fill}></div>
		</div>
	);
};

export default ProgressBar;
