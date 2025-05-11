import { createContext } from 'react';
import { EmojiItem } from '../../utils/fetch-data';

type EmojiContextType = {
	gameEmojis: EmojiItem[] | null;
	clickedEmojis: number[];
	getRandomEmojis: () => void;
	setClickedEmojis: React.Dispatch<React.SetStateAction<number[]>>;
};

export const EmojiContext = createContext<EmojiContextType>({
	gameEmojis: null,
	clickedEmojis: [],
	getRandomEmojis: () => {},
	setClickedEmojis: () => {},
});
