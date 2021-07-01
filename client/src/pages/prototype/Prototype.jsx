import { useState } from 'react';

import './prototype.css';
import Busted from '../../assets/img/ohYeah/broken.jpg';
import Anger from '../../assets/img/enemy/angybear.png';
import Enemy from '../../assets/img/enemy/bb.png';

// States
const Normal = ({ running, breakCount, onHit, onAnger, startEncounter }) => {
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

			<span>10:00</span>
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
	console.log(`RAWR! I'm ATTACKING`);
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

	const onHit = () => {
		console.log('Argh! I got hit!');
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

	return (
		<>
			{broken ? (
				<Broken reset={reset} />
			) : attacking ? (
				<Attack reset={reset} />
			) : (
				<Normal
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
