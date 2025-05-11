import { useState } from 'react';

import styles from './cards.module.css';
import { CARD_FLIP_TRANSITION_TIME } from '../../constants/cards';
import { MESSAGE_TRANSITION_TIME } from '../../constants/game-messages';
import { useScores } from '../../context/hooks/score-hook';
import useMessage from '../../context/hooks/message-hook';
import useEmojis from '../../context/hooks/emoji-hook';
import useSound from '../../context/hooks/sound-hook';
import { Card } from './card';

export default function Cards() {
	const { gameEmojis, getRandomEmojis, clickedEmojis, setClickedEmojis } =
		useEmojis();
	const { score, bestScore, setScore, setBestScore } = useScores();
	const { setMessage } = useMessage();
	const { soundOn } = useSound();

	const [flipped, setFlipped] = useState(false);
	const [preventClicking, setPreventClicking] = useState(false);

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
		setPreventClicking(true);
		setTimeout(() => setFlipped(false), CARD_FLIP_TRANSITION_TIME);

		if (clickedEmojis.includes(id)) {
			// Lose case
			setScore(0);
			setMessage({ id: Date.now(), message: 'lose' });
			setClickedEmojis([]);
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
			setClickedEmojis((prev: number[]) => [...prev, id]);

			// Shuffle new cards mid-flip
			setTimeout(() => {
				getRandomEmojis();
			}, CARD_FLIP_TRANSITION_TIME / 2);
		}

		setTimeout(() => {
			setPreventClicking(false);
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
