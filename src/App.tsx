import './assets/styles/App.css';
import Cards from './components/cards/cards';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import ScorePanel from './components/score-panel/score-panel';
import Message from './components/message/message';
import GameProvider from './context/data-provider/game-provider';

export default function App() {
	return (
		<GameProvider>
			<Header />
			<ScorePanel />
			<Message />
			<Cards />
			<Footer />
		</GameProvider>
	);
}
