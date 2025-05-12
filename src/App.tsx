import './assets/styles/App.css';
import Cards from './components/cards/cards';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import ScorePanel from './components/score-panel/score-panel';
import Message from './components/message/message';
import GameProvider from './context/data-provider/game-provider';
import { useEffect, useRef } from 'react';
import { DELAY_ANIMATION_TIME } from './constants/delay-animation-time';
import useVisibleHeightUnit from './context/hooks/visible-height-unit-hook';

export default function App() {
	const appRef = useRef<HTMLDivElement | null>(null);
	const timeRef = useRef<number | null>(null);

	// Set screen height unit
	useVisibleHeightUnit();

	useEffect(() => {
		// Prevent animation and transition on loading
		timeRef.current = setTimeout(() => {
			if (appRef.current) {
				appRef.current.classList.remove('preload');
			}
		}, DELAY_ANIMATION_TIME);

		return () => {
			if (timeRef.current) clearTimeout(timeRef.current);
		};
	});

	return (
		<div className="app preload" ref={appRef}>
			<GameProvider>
				<Header />
				<ScorePanel />
				<Message />
				<Cards />
				<Footer />
			</GameProvider>
		</div>
	);
}
