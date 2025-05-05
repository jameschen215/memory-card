import styles from './footer.module.css';

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<p>
				2025 &copy; Odin Project Assignment by{' '}
				<a href="https://github.com/JamesChan" target="_blank">
					James Chen
					<span className="sr-only">Open in new tab</span>
				</a>
				. All rights reserved.
			</p>
		</footer>
	);
}
