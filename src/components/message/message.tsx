import { useEffect, useRef, useState } from 'react';

import styles from './message.module.css';
import type { MessageType } from '../../types/message-type';
import { MESSAGE_TRANSITION_TIME } from '../../constants/game-messages';
import { getRandomMessageAndStyle } from '../../helpers/get-random-message';
import useMessage from '../../context/hooks/message-hook';

export default function Message() {
	const { message } = useMessage();
	const [displayMsg, setDisplayMsg] = useState<MessageType | null>(null);
	const [isAnimating, setIsAnimating] = useState(false);
	const queueRef = useRef<MessageType[]>([]);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const { text, style } = getRandomMessageAndStyle(displayMsg?.message ?? '');

	useEffect(() => {
		if (!message) return;
		if (displayMsg && displayMsg.id === message.id) return;

		if (isAnimating) {
			// Add to queue
			queueRef.current.push(message);
		} else {
			triggerMessage(message);
		}

		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, [message?.id]);

	function triggerMessage(msg: MessageType) {
		setDisplayMsg(msg);
		setIsAnimating(true);

		timeoutRef.current = setTimeout(() => {
			setIsAnimating(false);
			setDisplayMsg(null);

			// Process the next message in queue if any
			if (queueRef.current.length > 0) {
				const next = queueRef.current.shift()!;
				triggerMessage(next);
			}
		}, MESSAGE_TRANSITION_TIME);
	}

	return (
		<div
			className={`${styles.message} ${style ? styles[style] : ''} ${
				isAnimating ? styles['is-changing'] : ''
			}`}
			aria-live="polite">
			{text ?? ''}
		</div>
	);
}
