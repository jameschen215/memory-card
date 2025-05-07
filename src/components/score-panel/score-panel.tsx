import styles from './score-panel.module.css';

type ScorePanelProps = {
	score: number;
	bestScore: number;
};

export default function ScorePanel({ score, bestScore }: ScorePanelProps) {
	return (
		<div className={styles['score-panel']}>
			<div className={styles['score__text']}>
				Score: <span className={styles['score__text__score']}>{score}</span>
			</div>
			<div className={styles['score__text']}>
				Best:{' '}
				<span className={styles['score__text__best-score']}>{bestScore}</span>
			</div>
		</div>
	);
}
