import styles from './card.module.css';

import type { EmojiItem } from '../../utils/fetch-data';

type CardProps = {
	content: EmojiItem;
	flipped: boolean;
	disabled: boolean;
	onClick: () => void;
};

export function Card({ content, flipped, disabled, onClick }: CardProps) {
	return (
		<div
			tabIndex={0}
			role="button"
			className={`${styles.card} ${flipped ? styles.flipped : ''} ${
				disabled ? styles.disabled : ''
			}`}
			onClick={onClick}
			aria-disabled={disabled}
			onKeyDown={(ev) => {
				if (ev.key === 'Enter' || ev.key === ' ') onClick();
			}}>
			<div className={styles['flip-container']}>
				<div
					className={`${styles.face} ${styles.front}`}
					aria-label={`Front face of the card showing ${content.emoji}`}>
					<span className={styles.emoji}>{content.emoji}</span>
				</div>
				<div
					className={`${styles.face} ${styles.back}`}
					aria-label="Back face of the card">
					<span className={styles.text}>Memory</span>
				</div>
			</div>
		</div>
	);
}
