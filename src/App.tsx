import { useState } from 'react';
import './assets/styles/App.css';
import Cards from './components/cards/cards';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import ScorePanel from './components/score-panel/score-panel';
import Message from './components/message/message';

export default function App() {
	const [score, setScore] = useState(0);
	const [bestScore, setBestScore] = useState(0);
	const [soundOn, setSoundOn] = useState(true);
	const [message, setMessage] = useState<string | null>(null);

	function playClickSound() {
		const clickSound = new Audio('/audio/click.mp3');
		clickSound.volume = 0.5;
		clickSound.play();
	}

	function handleReset() {
		if (soundOn) playClickSound();

		setScore(0);
		setBestScore(0);
		setMessage(null);
	}

	function handleToggleSound() {
		if (!soundOn) playClickSound();

		setSoundOn((prev) => !prev);
	}

	return (
		<>
			<Header
				soundOn={soundOn}
				onResetClick={() => handleReset()}
				onSoundClick={() => handleToggleSound()}
			/>
			<ScorePanel score={score} bestScore={bestScore} />
			<Message msg={{ id: Date.now(), text: message }} />
			<Cards
				soundOn={soundOn}
				score={score}
				bestScore={bestScore}
				setScore={setScore}
				setBestScore={setBestScore}
				setMessage={setMessage}
			/>
			<Footer />
		</>
	);
}
