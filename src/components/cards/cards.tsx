import { useEffect, useState } from 'react';
import styles from './cards.module.css';

import { shuffleArray } from '../../utils/utils';
import { fetchEmojis } from '../../utils/fetch-data';
import { SetStateAction } from 'react';
import { Card } from './card';
import type { EmojiItem } from '../../utils/fetch-data';

type CardsProps = {
	soundOn: boolean;
	score: number;
	bestScore: number;
	setScore: React.Dispatch<SetStateAction<number>>;
	setBestScore: React.Dispatch<SetStateAction<number>>;
};

export default function Cards({
	soundOn,
	score,
	bestScore,
	setScore,
	setBestScore,
}: CardsProps) {
	const [allEmojis, setAllEmojis] = useState<EmojiItem[] | null>(null);
	const [gameEmojis, setGameEmojis] = useState<EmojiItem[] | null>(null);
	const [clickedEmojis, setClickedEmojis] = useState<number[]>([]);
	const [flipped, setFlipped] = useState(false);

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

	function handleClick(id: number) {
		// Play click sound
		if (soundOn) {
			// const clickSound = new Audio('/audio/flip-card.mp3');
			const clickSound = new Audio('/audio/card-flip.wav');
			clickSound.volume = 0.5;
			clickSound.play();
		}

		// Animation
		setFlipped(true);

		setTimeout(() => {
			setFlipped(false);
		}, 400);

		if (clickedEmojis.includes(id)) {
			// Emoji already clicked: reset game
			setScore(0);
			setClickedEmojis([]);
		} else {
			// New emoji clicked, update the scores immediately
			const newScore = score + 1;
			setScore(newScore);
			setBestScore(Math.max(newScore, bestScore));

			// Update cards content when cards flip front face is down
			setTimeout(() => {
				setClickedEmojis([...clickedEmojis, id]);
				// Show a new set of random images
				setGameEmojis(shuffleArray(allEmojis!).slice(0, 6));
			}, 200);
		}
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
						/>
					))}
			</div>
		</div>
	);
}
