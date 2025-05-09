import { useEffect, useRef, useState } from 'react';

import styles from './message.module.css';
import { getMessageAndStyle } from '../../helpers/get-message-and-style';
import { MESSAGE_TRANSITION_TIME } from '../../constants/game-messages';

type MessageProps = {
	state: {
		id: number;
		text: string | null;
	};
};

export default function Message({ state }: MessageProps) {
	const [visibleMessage, setVisibleMessage] = useState<string | null>(null);
	const msgRef = useRef<HTMLDivElement>(null);
	// const timeOutRef = useRef<number | null>(null);

	useEffect(() => {
		if (!state.text) return;

		const { style, message } = getMessageAndStyle(state.text);

		setVisibleMessage(message);
		msgRef.current?.classList.add(styles[style]);
		msgRef.current?.classList.add(styles['is-changing']);

		const timeoutId = setTimeout(() => {
			setVisibleMessage(null);
			msgRef.current?.classList.remove(styles[style]);
			msgRef.current?.classList.remove(styles['is-changing']);
		}, MESSAGE_TRANSITION_TIME);

		return () => clearTimeout(timeoutId);
	}, [state.id, state.text]);

	return (
		<div className={styles.message} ref={msgRef}>
			{visibleMessage ? visibleMessage : ''}
		</div>
	);
}
