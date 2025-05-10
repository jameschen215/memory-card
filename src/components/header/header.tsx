import styles from './header.module.css';

import { Repeat, Volume2, VolumeOff } from 'lucide-react';
import IconButton from './icon-button/icon-button';

type HeaderProps = {
	soundOn: boolean;
	onResetClick: () => void;
	onSoundClick: () => void;
};

export default function Header({
	soundOn,
	onResetClick,
	onSoundClick,
}: HeaderProps) {
	return (
		<header className={styles.header}>
			<a href="/" className={styles.brand}>
				<span className={styles.brand__text}>Memory Card</span>
			</a>

			<div className={styles['button-group']}>
				<IconButton
					onClick={onSoundClick}
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

				<IconButton onClick={onResetClick} title="Reset game">
					<span aria-hidden="true">
						<Repeat strokeWidth={1.5} />
					</span>
					<span className="sr-only">Reset game</span>
				</IconButton>
			</div>
		</header>
	);
}
