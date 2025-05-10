import { useEffect, useState } from 'react';
import styles from './cards.module.css';

import { shuffleArray } from '../../utils/utils';
import { fetchEmojis } from '../../utils/fetch-data';
import { SetStateAction } from 'react';
import { Card } from './card';
import type { EmojiItem } from '../../utils/fetch-data';
import type { MessageType } from '../../types/message-type';

import { CARD_FLIP_TRANSITION_TIME } from '../../constants/cards';
import { MESSAGE_TRANSITION_TIME } from '../../constants/game-messages';

type CardsProps = {
	soundOn: boolean;
	score: number;
	bestScore: number;
	setScore: React.Dispatch<SetStateAction<number>>;
	setBestScore: React.Dispatch<SetStateAction<number>>;
	setMessage: React.Dispatch<SetStateAction<MessageType | null>>;
};

export default function Cards({
	soundOn,
	score,
	bestScore,
	setScore,
	setBestScore,
	setMessage,
}: CardsProps) {
	const [allEmojis, setAllEmojis] = useState<EmojiItem[] | null>(null);
	const [gameEmojis, setGameEmojis] = useState<EmojiItem[] | null>(null);
	const [clickedEmojis, setClickedEmojis] = useState<number[]>([]);
	const [flipped, setFlipped] = useState(false);
	// const preventClicking = useRef(false);
	const [preventClicking, setPreventClicking] = useState(false);

	useEffect(() => {
		async function loadEmojis() {
			const data = await fetchEmojis();

			if (data) {
				setAllEmojis(data);
				setGameEmojis(shuffleArray(data).slice(0, 6));
			} else {
				console.error('Failed to load valid image data.');
			}
		}

		loadEmojis();
	}, []);

	function playSound() {
		if (soundOn) {
			const clickSound = new Audio('/audio/card-flip.wav');
			clickSound.volume = 0.5;
			clickSound.play();
		}
	}

	function handleClick(id: number) {
		if (preventClicking) return;

		if (flipped) return; // Prevent multiple clicks during animation

		// Address sound and card flipping animation
		playSound();
		setFlipped(true);
		// preventClicking. = true;
		setPreventClicking(true);
		setTimeout(() => setFlipped(false), CARD_FLIP_TRANSITION_TIME);

		if (clickedEmojis.includes(id)) {
			// Lose case
			setScore(0);
			setMessage({ id: Date.now(), message: 'lose' });
			setClickedEmojis([]);
			// setTimeout(() => setMessage(null), MESSAGE_TRANSITION_TIME);
		} else {
			// Win case
			const newScore = score + 1;
			const isRecord = newScore > bestScore;

			setScore(newScore);
			setBestScore(Math.max(newScore, bestScore));
			setMessage({
				id: Date.now(),
				message: isRecord ? 'record' : 'win',
			});
			setClickedEmojis((prev) => [...prev, id]);

			// setTimeout(() => setMessage(null), MESSAGE_TRANSITION_TIME);

			// Shuffle new cards mid-flip
			setTimeout(() => {
				if (allEmojis) {
					setGameEmojis(shuffleArray(allEmojis).slice(0, 6));
				}
			}, CARD_FLIP_TRANSITION_TIME / 2);
		}

		setTimeout(() => {
			// preventClicking.current = false;
			setPreventClicking(false);
			console.log('animation complete!');
		}, MESSAGE_TRANSITION_TIME);
	}

	return (
		<div className={styles['cards-wrapper']}>
			<div className={styles.cards}>
				{!gameEmojis && <div>Loading...</div>}

				{gameEmojis &&
					gameEmojis.map((item, index) => (
						<Card
							key={index}
							content={item}
							flipped={flipped}
							onClick={() => handleClick(item.id)}
							disabled={preventClicking}
						/>
					))}
			</div>
		</div>
	);
}
