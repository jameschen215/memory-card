import { useEffect, useState } from 'react';
import styles from './cards.module.css';

import { shuffleArray } from '../../utils/utils';
import { fetchEmojis } from '../../utils/fetch-data';
import type { EmojiItem } from '../../utils/fetch-data';
import { SetStateAction } from 'react';

type CardsProps = {
	score: number;
	bestScore: number;
	setScore: React.Dispatch<SetStateAction<number>>;
	setBestScore: React.Dispatch<SetStateAction<number>>;
};

export default function Cards({
	score,
	bestScore,
	setScore,
	setBestScore,
}: CardsProps) {
	const [allEmojis, setAllEmojis] = useState<EmojiItem[] | null>(null);
	const [gameEmojis, setGameEmojis] = useState<EmojiItem[] | null>(null);
	const [clickedEmojis, setClickedEmojis] = useState<number[]>([]);

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
		console.log({ id });
		if (clickedEmojis.includes(id)) {
			// Emoji already clicked: reset game
			setScore(0);
			setClickedEmojis([]);
		} else {
			// New emoji clicked
			const newScore = score + 1;
			setScore(newScore);
			setBestScore(Math.max(newScore, bestScore));
			setClickedEmojis([...clickedEmojis, id]);

			// Show a new set of random images
			setGameEmojis(shuffleArray(allEmojis!).slice(0, 6));

			console.log({ score, bestScore });
		}
	}

	return (
		<div className={styles.cards}>
			{!gameEmojis && <div>Loading...</div>}
			{gameEmojis &&
				gameEmojis.map((item) => (
					<Card
						key={item.id}
						item={item}
						onClick={() => handleClick(item.id)}
					/>
				))}
		</div>
	);
}

type CardProps = {
	item: EmojiItem;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

function Card({ item, onClick }: CardProps) {
	const { emoji, name } = item;
	return (
		<button className={styles.card} onClick={onClick}>
			<span className={styles.emoji}>{emoji}</span>
			<span className={styles.name}>{name}</span>
		</button>
	);
}
