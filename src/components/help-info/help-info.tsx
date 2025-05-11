import styles from './help-info.module.css';

export default function HelpInfo({ show }: { show: boolean }) {
	return (
		<div className={`${styles['help-info']} ${show ? styles.show : ''}`}>
			<p>Don't click the same card twice!</p>
		</div>
	);
}
