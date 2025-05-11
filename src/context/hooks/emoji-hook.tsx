import { useContext } from 'react';
import { EmojiContext } from '../context/emoji-context';

export default function useEmojis() {
	const data = useContext(EmojiContext);

	if (!data) {
		throw new Error('Please put your component into the emojis provider.');
	}

	return data;
}
