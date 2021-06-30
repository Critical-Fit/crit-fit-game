import Field from '../../components/field/Field';

const Login = () => {
	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<form onSubmit={handleSubmit}>
			<Field id="username">Username</Field>
			<Field id="password" type="password">
				Password
			</Field>
			<a href="#">Forgot password</a>
			<span>
				Need an account? <a href="#">Register</a>
			</span>
			<button type="submit">Log In</button>
			{/* Other login methods: Google, Twitch, Facebook */}
		</form>
	);
};

export default Login;
