import styles from './score-panel.module.css';
import Counter from '../counter/counter';
import { useScores } from '../../context/hooks/score-hook';

// type ScorePanelProps = {
// 	score: number;
// 	bestScore: number;
// };

export default function ScorePanel() {
	const { score, bestScore } = useScores();

	return (
		<div className={styles['score-panel']}>
			<div className={styles['score-panel__score']}>
				<span className={styles['score-panel__score__label']}>Score:</span>
				<Counter classNames="green" value={score} />
			</div>
			<div className={styles['score-panel__score']}>
				<span className={styles['score-panel__score__label']}>Best:</span>
				<Counter classNames="yellow" value={bestScore} />
			</div>
		</div>
	);
}
