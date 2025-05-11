import { useContext } from 'react';
import { ScoreContext } from '../context/score-context';

export function useScores() {
	const data = useContext(ScoreContext);

	if (!data) {
		throw new Error('Please put your component into the score provider.');
	}

	return data;
}
