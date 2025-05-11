import { useEffect, useRef, useState } from 'react';
import styles from './counter.module.css';
import { COUNTER_TRANSITION_TIME, DECIMAL_BASE } from '../../constants/counter';

type CounterProps = {
	classNames: string;
	value: number;
};

export default function Counter({ classNames, value }: CounterProps) {
	const [displayValue, setDisplayValue] = useState(value);
	const [isAnimating, setIsAnimating] = useState(false);
	const queueRef = useRef<number[]>([]);

	const tens = Math.floor(displayValue / DECIMAL_BASE);
	const ones = displayValue % DECIMAL_BASE;

	useEffect(() => {
		if (value !== displayValue) {
			if (isAnimating) {
				// Queue the value
				queueRef.current.push(value);
			} else {
				setDisplayValue(value);
			}
		}
	}, [value, displayValue, isAnimating]);

	return (
		<div
			role="status"
			aria-label={`Score: ${displayValue}`}
			className={`${styles.counter} ${styles[classNames] ?? ''}`}>
			<CounterUnit
				classNames={tens === 0 ? 'invisible' : ''}
				value={tens}
				onAnimationStart={() => setIsAnimating(true)}
				onAnimationEnd={() => {
					setIsAnimating(false);

					if (queueRef.current.length > 0) {
						const next = queueRef.current.shift();
						setDisplayValue(next!);
					}
				}}
			/>
			<CounterUnit
				classNames=""
				value={ones}
				onAnimationStart={() => {}}
				onAnimationEnd={() => {}}
			/>
		</div>
	);
}

function CounterUnit({
	classNames,
	value,
	onAnimationStart,
	onAnimationEnd,
}: {
	classNames: string;
	value: number;
	onAnimationStart: () => void;
	onAnimationEnd: () => void;
}) {
	const unitRef = useRef<HTMLDivElement>(null);
	const currentRef = useRef<HTMLDivElement>(null);
	const nextRef = useRef<HTMLDivElement>(null);
	const timeRef = useRef<number | null>(null);

	const [prevValue, setPrevValue] = useState(value);

	useEffect(() => {
		if (value === prevValue) return;

		if (nextRef.current) {
			// update the value of next element
			nextRef.current.innerText = String(value);
		}

		if (unitRef.current) {
			// enable the animation by adding the specific class name
			unitRef.current.classList.add(styles['is-changing']);
		}

		onAnimationStart();

		// after a specific time of animation, stop it
		timeRef.current = setTimeout(() => {
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

			onAnimationEnd();
		}, COUNTER_TRANSITION_TIME);

		// clear time out
		return () => {
			if (timeRef.current) clearTimeout(timeRef.current);
		};
	}, [value, prevValue, onAnimationStart, onAnimationEnd]);

	return (
		<div
			className={`${styles['counter-unit']} ${styles[classNames] ?? ''}`}
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
