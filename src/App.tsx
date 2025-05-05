import { useState } from 'react';
import './assets/styles/App.css';
import Cards from './components/cards/cards';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import ScorePanel from './components/score-panel/score-panel';

export default function App() {
	const [score, setScore] = useState(0);
	const [bestScore, setBestScore] = useState(0);

	return (
		<>
			<Header />
			<ScorePanel score={score} bestScore={bestScore} />
			<Cards
				score={score}
				bestScore={bestScore}
				setScore={setScore}
				setBestScore={setBestScore}
			/>
			<Footer />
		</>
	);
}
