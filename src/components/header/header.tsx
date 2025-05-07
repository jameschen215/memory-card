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
				<IconButton onClick={onSoundClick} title="Toggle sound effect">
					{soundOn ? (
						<Volume2 strokeWidth={1.5} />
					) : (
						<VolumeOff strokeWidth={1.5} />
					)}
				</IconButton>

				<IconButton onClick={onResetClick} title="Reset game">
					<Repeat strokeWidth={1.5} />
				</IconButton>
			</div>
		</header>
	);
}
