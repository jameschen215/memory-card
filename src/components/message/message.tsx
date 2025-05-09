import { useEffect, useRef, useState } from 'react';

import styles from './message.module.css';
import { getRandomItem } from '../../utils/utils';
import { MESSAGES } from '../../constants/game-messages';

type MessageProps = {
	msg: {
		id: number;
		text: string | null;
	};
};

export default function Message({ msg }: MessageProps) {
	const [visibleMessage, setVisibleMessage] = useState<string | null>(null);
	const timeOutRef = useRef<number | null>(null);

	let style: string;
	let message: string | null;

	switch (msg.text) {
		case 'win': {
			style = 'win';
			message = getRandomItem(MESSAGES.win);
			break;
		}
		case 'lose': {
			style = 'lose';
			message = getRandomItem(MESSAGES.lose);
			break;
		}
		case 'record': {
			style = 'record';
			message = getRandomItem(MESSAGES.record);
			break;
		}
		default: {
			style = 'empty';
			message = null;
			break;
		}
	}

	useEffect(() => {
		if (!message) return;

		setVisibleMessage(message);

		if (timeOutRef.current) {
			clearTimeout(timeOutRef.current);
		}

		timeOutRef.current = window.setTimeout(() => {
			setVisibleMessage(null);
			timeOutRef.current = null;
		}, 1000);
	}, [msg.id]);

	return (
		<div className={`${styles.message} ${styles[style]}`}>
			{visibleMessage ? visibleMessage : ''}
		</div>
	);
}
