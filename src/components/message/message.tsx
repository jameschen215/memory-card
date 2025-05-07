import { useEffect, useRef, useState } from 'react';

import styles from './message.module.css';

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
	if (visibleMessage?.toLowerCase().includes('win')) {
		style = 'win';
	} else if (visibleMessage?.toLowerCase().includes('lose')) {
		style = 'lose';
	} else if (visibleMessage?.toLowerCase().includes('record')) {
		style = 'record';
	} else {
		style = 'empty';
	}

	useEffect(() => {
		if (!msg.text) return;

		setVisibleMessage(msg.text);

		if (timeOutRef.current) {
			clearTimeout(timeOutRef.current);
		}

		timeOutRef.current = window.setTimeout(() => {
			setVisibleMessage(null);
			timeOutRef.current = null;
		}, 1000);
	}, [msg.id, msg.text]);

	return (
		<div className={`${styles.message} ${styles[style]}`}>
			{visibleMessage ? visibleMessage : ''}
		</div>
	);
}
