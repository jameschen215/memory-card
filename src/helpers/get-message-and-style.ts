import { MESSAGES } from '../constants/game-messages';
import { getRandomItem } from '../utils/utils';

export function getMessageAndStyle(state: string) {
	switch (state) {
		case 'win':
			return {
				style: 'win',
				message: getRandomItem(MESSAGES.win),
			};

		case 'lose':
			return {
				style: 'lose',
				message: getRandomItem(MESSAGES.lose),
			};
		case 'record':
			return {
				style: 'record',
				message: getRandomItem(MESSAGES.record),
			};
		default:
			return {
				style: 'empty',
				message: null,
			};
	}
}
