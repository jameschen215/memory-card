import styles from './score-panel.module.css';

type ScorePanelProps = {
	score: number;
	bestScore: number;
};

export default function ScorePanel({ score, bestScore }: ScorePanelProps) {
	return (
		<div className={styles['score-panel']}>
			<span className={styles['score-panel__current-score']}>
				Current: {score}
			</span>
			<span className={styles['score-panel__best-score']}>
				Best: {bestScore}
			</span>
		</div>
	);
}
