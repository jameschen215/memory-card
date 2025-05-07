import styles from './card.module.css';

import type { EmojiItem } from '../../utils/fetch-data';

type CardProps = {
	content: EmojiItem;
	flipped: boolean;
	onClick: () => void;
};

export function Card({ content, flipped, onClick }: CardProps) {
	return (
		<div
			className={`${styles.card} ${flipped ? styles.flipped : ''}`}
			onClick={onClick}>
			<div className={styles['flip-container']}>
				<div className={`${styles.face} ${styles.front}`}>
					<span className={styles.emoji}>{content.emoji}</span>
				</div>
				<div className={`${styles.face} ${styles.back}`}>
					<span className={styles.text}>Memory</span>
				</div>
			</div>
		</div>
	);
}
