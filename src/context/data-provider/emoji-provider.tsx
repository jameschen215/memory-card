import { ReactNode, useEffect, useState } from 'react';
import { EmojiItem, fetchEmojis } from '../../utils/fetch-data';
import { shuffleArray } from '../../utils/utils';
import { EmojiContext } from '../context/emoji-context';
import { DEFAULT_CARDS_NUMBER } from '../../constants/cards';

export default function EmojiProvider({ children }: { children: ReactNode }) {
	const [allEmojis, setAllEmojis] = useState<EmojiItem[] | null>(null);
	const [gameEmojis, setGameEmojis] = useState<EmojiItem[] | null>(null);
	const [clickedEmojis, setClickedEmojis] = useState<number[]>([]);

	useEffect(() => {
		async function loadEmojis() {
			const data = await fetchEmojis();

			if (data) {
				setAllEmojis(data);
				setGameEmojis(shuffleArray(data).slice(0, DEFAULT_CARDS_NUMBER));
			} else {
				console.error('Failed to load valid image data.');
			}
		}
		loadEmojis();
	}, []);

	function getRandomEmojis() {
		if (!allEmojis) {
			setGameEmojis([]);
		} else {
			setGameEmojis(shuffleArray(allEmojis).slice(0, DEFAULT_CARDS_NUMBER));
		}
	}

	return (
		<EmojiContext.Provider
			value={{
				gameEmojis,
				clickedEmojis,
				getRandomEmojis,
				setClickedEmojis,
			}}>
			{children}
		</EmojiContext.Provider>
	);
}
