import Field from '../../components/field/Field';

const Register = () => {
	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<form onSubmit={handleSubmit}>
			<Field id="email">Email</Field>
			<Field id="username">Username</Field>
			<Field id="password" type="password">
				Password
			</Field>
			<Field id="dob" type="date">
				Birthday
			</Field>
			<Field id="tos" type="checkbox">
				I have read and agree to the <a href="#">Terms of Service</a>
			</Field>
			<Field id="pp" type="checkbox">
				I have read and agree to the <a href="#">Privacy Policy</a>
			</Field>
			<Field id="promo" type="checkbox">
				I would like to receive promotional emails.
			</Field>
			{/* TODO: reCAPTCHA goes here */}
			<span>
				Already have an account? <a href="#">Login</a>
			</span>
			<button type="submit">Register</button>
		</form>
		// TODO: Add alternative login methods
		//    Google
		//    Twitch
		//    Facebook
	);
};

export default Register;
