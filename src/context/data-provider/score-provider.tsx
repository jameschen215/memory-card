import { ReactNode, useState } from 'react';
import { ScoreContext } from '../context/score-context';

export function ScoreProvider({ children }: { children: ReactNode }) {
	const [score, setScore] = useState(0);
	const [bestScore, setBestScore] = useState(0);

	return (
		<ScoreContext.Provider
			value={{
				score,
				bestScore,
				setScore,
				setBestScore,
			}}>
			{children}
		</ScoreContext.Provider>
	);
}
