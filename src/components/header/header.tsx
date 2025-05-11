import styles from './header.module.css';

import { Repeat, Volume2, VolumeOff, CircleHelp, X } from 'lucide-react';
import IconButton from './icon-button/icon-button';
import useSound from '../../context/hooks/sound-hook';
import { useScores } from '../../context/hooks/score-hook';
import useMessage from '../../context/hooks/message-hook';
import useEmojis from '../../context/hooks/emoji-hook';
import { useState } from 'react';
import HelpInfo from '../help-info/help-info';

export default function Header() {
	const { soundOn, toggleSound } = useSound();
	const { setScore, setBestScore } = useScores();
	const { setMessage } = useMessage();
	const { getRandomEmojis } = useEmojis();

	const [showHelpInfo, setShowHelpInfo] = useState(false);

	function playClickSound() {
		const clickSound = new Audio('/audio/click.wav');
		clickSound.volume = 0.5;
		clickSound.play();
	}

	function handleToggleSound() {
		if (!soundOn) playClickSound();
		toggleSound();
	}

	function handleReset() {
		if (soundOn) playClickSound();

		setScore(0);
		setBestScore(0);
		getRandomEmojis();
		setMessage(null);
	}

	function handleShowInfo() {
		if (soundOn) playClickSound();
		setShowHelpInfo((prev) => !prev);
	}

	return (
		<header className={styles.header}>
			<a href="/" className={styles.brand}>
				<span className={styles.brand__text}>Memory Card</span>
			</a>

			<div className={styles['button-group']}>
				<IconButton
					onClick={handleToggleSound}
					title="Toggle sound effect"
					ariaPressed={soundOn}>
					<span aria-hidden="true">
						{soundOn ? (
							<Volume2 strokeWidth={1.5} />
						) : (
							<VolumeOff strokeWidth={1.5} />
						)}
					</span>
					<span className="sr-only">Toggle sound</span>
				</IconButton>

				<IconButton onClick={handleReset} title="Reset game">
					<span aria-hidden="true">
						<Repeat strokeWidth={1.5} />
					</span>
					<span className="sr-only">Reset game</span>
				</IconButton>
				<IconButton onClick={handleShowInfo} title="Game information">
					<span aria-hidden="true">
						{showHelpInfo ? (
							<X strokeWidth={1.5} />
						) : (
							<CircleHelp strokeWidth={1.5} />
						)}
					</span>
					<span className="sr-only">Game information</span>
				</IconButton>
			</div>
			<HelpInfo show={showHelpInfo} />
		</header>
	);
}
