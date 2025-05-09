import styles from './score-panel.module.css';
import Counter from '../counter/counter';

type ScorePanelProps = {
	score: number;
	bestScore: number;
};

export default function ScorePanel({ score, bestScore }: ScorePanelProps) {
	return (
		<div className={styles['score-panel']}>
			<div className={styles['score-panel__score']}>
				<span className={styles['score-panel__score__label']}>Score:</span>
				<Counter classNames='green' value={score} />
			</div>
			<div className={styles['score-panel__score']}>
				<span className={styles['score-panel__score__label']}>Score:</span>
				<Counter classNames='yellow' value={bestScore} />
			</div>
		</div>
	);
}
