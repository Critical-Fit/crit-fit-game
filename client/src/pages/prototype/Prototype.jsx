import { useState, useEffect } from 'react';

import ProgressBar from '../../components/progress/ProgressBar';

import './prototype.css';
import Broken from '../../assets/img/ohYeah/broken.jpg';
import Anger from '../../assets/img/enemy/angybear.png';
import Enemy from '../../assets/img/enemy/bear.png';

// States
const Normal = ({
	running,
	time,
	breakCount,
	onHit,
	onAnger,
	startEncounter,
}) => {
	return (
		<div className="prototype">
			<div>
				<img
					src={Enemy}
					alt=""
					width={300}
					height={300}
					onClick={running ? onHit : null}
				/>
				<div className="square">{breakCount}</div>
			</div>

			<span>{time}</span>
			{running ? (
				<button className="btn" onClick={onAnger}>
					Poke the bear
				</button>
			) : (
				<button className="btn" onClick={startEncounter}>
					Begin Encounter
				</button>
			)}
			<span>These are your workouts!</span>
		</div>
	);
};

const State = ({ reset, image }) => {
	const STATE_TIME = 20;
	const [time, setTime] = useState(STATE_TIME);

	useEffect(() => {
		let stateInterval;
		if (time > -1) {
			stateInterval = setInterval(() => {
				setTime(time - 1);
				console.log(`state_tick: ${time}`);
			}, 1000);
		} else {
			reset(false);
		}

		return () => {
			clearInterval(stateInterval);
		};
	}, [time]);

	return (
		<div className="prototype">
			<img src={image} alt="" />
			<ProgressBar
				// completed={100 - (time / STATE_TIME) * 100}
				completed={50}
				fillColor={`hsl(37, 100%, 100%)`}
				backgroundColor={`hsl(37, 100%, 12%)`}
				borderColor={`hsl(37, 100%, 45%)`}
			/>
			<button className="btn" onClick={() => reset(true)}>
				HIT THE BUTTON!
			</button>
		</div>
	);
};

const Prototype = () => {
	const ATTACK_TIME = 3;
	const WORKOUT_TIME = 10;
	const DEFAULT_SHIELD = 3;

	const [attacking, setAttacking] = useState(false);
	const [broken, setBroken] = useState(false);
	const [running, setRunning] = useState(false);
	const [breakCount, setBreakCount] = useState(DEFAULT_SHIELD);
	// const [breakIncrement, setBreakIncrement] = useState(0);

	const [seconds, setSeconds] = useState({
		attack: ATTACK_TIME,
		workout: WORKOUT_TIME,
	});

	useEffect(() => {
		let workoutInterval;
		let attackInterval;
		if (broken || attacking) {
			clearInterval(attackInterval);
			clearInterval(workoutInterval);
		} else if (running && seconds.workout > 0) {
			workoutInterval = setInterval(() => {
				console.log(
					`global_tick: ${seconds.workout}\nattack_tick: ${seconds.attack}`
				);

				setSeconds({
					attack: seconds.attack - 1,
					workout: seconds.workout - 1,
				});

				if (seconds.attack <= 0) return onAnger();
			}, 1000);
		}

		return () => {
			clearInterval(workoutInterval);
			clearInterval(attackInterval);
		};
	}, [running, seconds.workout, broken, attacking]);

	const onHit = () => {
		console.log('Argh! I got hit!');
		console.log(`${running} ${seconds.workout}`);
		const newBreak = breakCount - 1;

		if (newBreak <= 0) onBreak();

		setBreakCount(Math.max(newBreak, 0));
	};
	const onAnger = () => {
		console.log(`You done fucked up now A-A-RON`);
		setSeconds({
			...seconds,
			attack: ATTACK_TIME,
		});
		setAttacking(true);
	};
	const onBreak = () => {
		setSeconds({
			...seconds,
			attack: ATTACK_TIME,
		});
		setBroken(true);
	};
	const startEncounter = () => {
		setRunning(true);
	};
	const resetShield = () => {
		setBreakCount(DEFAULT_SHIELD);
	};
	const resetBroken = (success) => {
		resetShield();
		setBroken(false);
		let msg = success
			? `Argh! The double damage stings!`
			: `Missed me! Ha Ha!`;
		console.log(msg);
	};
	const resetAttack = (success) => {
		resetShield();
		setAttacking(false);
		let msg = success
			? `How dare you block my attack!`
			: `Ha Ha! What a weakling!`;
		console.log(msg);
	};

	const toMMSS = (seconds) => {
		const mm = (~~(seconds / 60)).toString().padStart(2, '0');
		const ss = (seconds % 60).toString().padStart(2, '0');
		return `${mm}:${ss}`;
	};

	return (
		<>
			{broken ? (
				<State image={Broken} reset={resetBroken} />
			) : attacking ? (
				<State image={Anger} reset={resetAttack} />
			) : (
				<Normal
					time={toMMSS(seconds.workout)}
					running={running}
					breakCount={breakCount}
					onHit={onHit}
					onAnger={onAnger}
					startEncounter={startEncounter}
				/>
			)}
		</>
	);
};

export default Prototype;
