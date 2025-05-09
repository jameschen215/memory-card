import { useEffect, useRef, useState } from 'react';

import styles from './counter.module.css';
import { TRANSITION_TIME, DECIMAL_BASE } from '../../constants/counter';


type CounterProps = {
	classNames: string;
	value: number;
};

export default function Counter({classNames, value }: CounterProps) {
	const tens = Math.floor(value / DECIMAL_BASE);
	const ones = value % DECIMAL_BASE;

	return (
		<div className={`${styles.counter} ${styles[classNames]}`}>
			<CounterUnit classNames={tens === 0 ? 'invisible' : ''} value={tens} />
			<CounterUnit classNames="" value={ones} />
		</div>
	);
}

function CounterUnit({
	classNames,
	value,
}: {
	classNames: string;
	value: number;
}) {
	const unitRef = useRef<HTMLDivElement>(null);
	const currentRef = useRef<HTMLDivElement>(null);
	const nextRef = useRef<HTMLDivElement>(null);

	const [prevValue, setPrevValue] = useState(value);

	useEffect(() => {
		if (value === prevValue) return;

		if (nextRef.current) {
			// update the value of next element
			nextRef.current.innerText = String(value);
			console.log('next');
		}

		if (unitRef.current) {
			// enable the animation by adding the specific class name
			unitRef.current.classList.add(styles['is-changing']);
		}

		// after a specific time of animation, stop it
		const timeout = setTimeout(() => {
			if (currentRef.current && nextRef.current) {
				// make the content of the current element and the content of
				// the next element the same after the animation
				currentRef.current.innerText = nextRef.current.innerText;
			}

			if (unitRef.current) {
				// stop the animation
				unitRef.current.classList.remove(styles['is-changing']);
			}

			// save the current value as the previous value for the next increment
			setPrevValue(value);
		}, TRANSITION_TIME);

		// clear
		return () => clearTimeout(timeout);
	}, [value, prevValue]);

	return (
		<div
			className={`${styles['counter-unit']} ${styles[classNames]}`}
			ref={unitRef}>
			<div className={styles['counter-number']} ref={currentRef}>
				{prevValue}
			</div>
			<div className={styles['counter-number']} ref={nextRef}>
				{prevValue}
			</div>
		</div>
	);
}
