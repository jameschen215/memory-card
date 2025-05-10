import { MESSAGES } from '../constants/game-messages';
import { getRandomItem } from '../utils/utils';

export function getRandomMessageAndStyle(message: string) {
	switch (message) {
		case 'win':
			return {
				text: getRandomItem(MESSAGES.win),
				style: 'win',
			};
		case 'lose':
			return {
				text: getRandomItem(MESSAGES.lose),
				style: 'lose',
			};
		case 'record':
			return {
				text: getRandomItem(MESSAGES.record),
				style: 'record',
			};
		default:
			return {
				text: null,
				style: null,
			};
	}
}
