import { useState, useEffect } from 'react';

import './prototype.css';
import Busted from '../../assets/img/ohYeah/broken.jpg';
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

const Broken = ({ reset }) => {
	return (
		<div className="prototype">
			<img src={Busted} alt="" />
			<button className="btn" onClick={reset}>
				HIT THE BUTTON!
			</button>
		</div>
	);
};

const Attack = ({ reset }) => {
	return (
		<div className="prototype">
			<img src={Anger} alt="" />
			<button className="btn" onClick={reset}>
				HIT THE BUTTON!
			</button>
		</div>
	);
};

const Prototype = () => {
	const DEFAULT_SHIELD = 3;

	const [attacking, setAttacking] = useState(false);
	const [broken, setBroken] = useState(false);
	const [running, setRunning] = useState(false);
	const [breakCount, setBreakCount] = useState(DEFAULT_SHIELD);
	// const [breakIncrement, setBreakIncrement] = useState(0);

	const DEFAULT_TIME = 10;
	const [seconds, setSeconds] = useState(DEFAULT_TIME);

	useEffect(() => {
		let interval;
		if (broken || attacking) {
			clearInterval(interval);
		} else if (running && seconds > 0) {
			interval = setInterval(() => {
				console.log(`tick: ${seconds}`);
				setSeconds(seconds - 1);
			}, 1000);
		}

		return () => clearInterval(interval);
	}, [running, seconds, broken, attacking]);

	const onHit = () => {
		console.log('Argh! I got hit!');
		console.log(`${running} ${seconds}`);
		const newBreak = breakCount - 1;

		if (newBreak <= 0) setBroken(true);

		setBreakCount(Math.max(newBreak, 0));
	};
	const onAnger = () => {
		console.log(`You done fucked up now A-A-RON`);
		setAttacking(true);
	};
	const startEncounter = () => {
		setRunning(true);
	};
	const reset = () => {
		setBreakCount(DEFAULT_SHIELD);
		setBroken(false);
		setAttacking(false);
	};

	const toMMSS = (seconds) => {
		const mm = (~~(seconds / 60)).toString().padStart(2, '0');
		const ss = (seconds % 60).toString().padStart(2, '0');
		return `${mm}:${ss}`;
	};

	return (
		<>
			{broken ? (
				<Broken reset={reset} />
			) : attacking ? (
				<Attack reset={reset} />
			) : (
				<Normal
					time={toMMSS(seconds)}
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
