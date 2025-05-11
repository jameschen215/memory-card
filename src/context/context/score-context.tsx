import { createContext } from 'react';

type ScoreContextType = {
	score: number;
	bestScore: number;
	// setScore: React.Dispatch<SetStateAction<number>>;
	setScore: (score: number) => void;
	// setBestScore: React.Dispatch<SetStateAction<number>>;
	// why can't I do this when the parameter is an array?
	setBestScore: (score: number) => void;
};

export const ScoreContext = createContext<ScoreContextType>({
	score: 0,
	bestScore: 0,
	setScore: () => {},
	setBestScore: () => {},
});
