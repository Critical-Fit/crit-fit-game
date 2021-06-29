import './field.css';

const Input = ({ id, type }) => {
	return (
		<>
			{type === 'textarea' ? (
				<textarea name="" id={id} cols="30" rows="10"></textarea>
			) : (
				<input type={type} id={id} />
			)}
		</>
	);
};

const Label = ({ id, children }) => {
	return (
		<>
			<label htmlFor={id}>{children}</label>
		</>
	);
};

const Field = ({ id, children, type = 'text' }) => {
	return (
		<>
			{['checkbox', 'radio'].includes(type) ? (
				<div>
					<Input id={id} type={type} />
					<Label id={id}>{children}</Label>
				</div>
			) : (
				<div className="field">
					<Label id={id}>{children}</Label>
					<Input id={id} type={type} />
				</div>
			)}
		</>
	);
};

export default Field;
